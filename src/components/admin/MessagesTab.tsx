import { useState, useEffect } from "react";
import { adminDb } from "@/lib/firebase-admin";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Mail, Phone, User, MessageSquare, Briefcase, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name?: string;
  full_name: string;
  email: string;
  phone: string;
  subject?: string;
  service: string;
  message: string;
  createdAt?: any;
}

const MessagesTab = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const q = query(collection(adminDb, "messages"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)));
    } catch {
      const snap = await getDocs(collection(adminDb, "messages"));
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message)));
    }
    setLoading(false);
  };

  useEffect(() => { fetchMessages(); }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(adminDb, "messages", id));
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Message deleted" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  if (loading) return <p className="text-center py-8 text-muted-foreground">Loading messages...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Contact Messages ({messages.length})</h2>
        <Button variant="outline" size="sm" onClick={fetchMessages}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{msg.name || msg.full_name || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${msg.email}`} className="hover:text-primary">{msg.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-3.5 h-3.5" />
                    <a href={`tel:${msg.phone}`} className="hover:text-primary">{msg.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(msg.service || msg.subject) && (
                    <Badge variant="secondary">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {msg.service || msg.subject}
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(msg.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-foreground whitespace-pre-wrap">{msg.message}</p>
              </div>
              {msg.createdAt && (
                <p className="text-xs text-muted-foreground">
                  {msg.createdAt?.toDate?.()?.toLocaleString?.() || ""}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
