import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CircleHelp, Send } from "lucide-react";
import { adminDb } from "@/lib/firebase-admin";
import { CONTACT_EMAILS } from "@/lib/contactEmails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EMPTY_FORM = { name: "", email: "", phone: "", message: "" };

const HelpButton = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");

    try {
      await addDoc(collection(adminDb, "messages"), {
        name: form.name.trim(),
        full_name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        subject: "Help request",
        service: "Customer Help",
        message: form.message.trim(),
        status: "new",
        source: "talk-to-us",
        channel: "LUMEX Help",
        departmentEmail: CONTACT_EMAILS.help,
        pageUrl: window.location.href,
        userAgent: window.navigator.userAgent,
        createdAt: serverTimestamp(),
      });
      setForm(EMPTY_FORM);
      setSent(true);
    } catch {
      setError(`We could not send this request. Please email ${CONTACT_EMAILS.help}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) setSent(false); }}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-lumex-lg"
          aria-label="Get help"
          title="Get help"
        >
          <CircleHelp className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg">
        <DialogHeader>
          <DialogTitle>How can Lumex help?</DialogTitle>
          <DialogDescription>Your request goes directly to LUMEX Messages in our admin panel.</DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="py-8 text-center">
            <CircleHelp className="mx-auto mb-3 h-10 w-10 text-primary" />
            <p className="font-semibold text-foreground">Your help request was sent.</p>
            <p className="mt-1 text-sm text-muted-foreground">Our team will contact you using the details provided.</p>
            <Button className="mt-5" onClick={() => setOpen(false)}>Done</Button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="help-name">Name</Label>
              <Input id="help-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required minLength={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help-email">Email</Label>
              <Input id="help-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help-phone">Phone / WhatsApp</Label>
              <Input id="help-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required minLength={7} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="help-message">What do you need help with?</Label>
              <Textarea id="help-message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required minLength={2} maxLength={4999} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={sending}>
              <Send className="h-4 w-4" /> {sending ? "Sending..." : "Send help request"}
            </Button>
            <a className="block text-center text-sm text-primary hover:underline" href={`mailto:${CONTACT_EMAILS.help}`}>
              {CONTACT_EMAILS.help}
            </a>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default HelpButton;
