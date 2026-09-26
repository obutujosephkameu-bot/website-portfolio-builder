import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MemberDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Layout>
      <section className="py-24 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
        <p className="text-muted-foreground mb-8">{user?.email ?? "Member"}</p>
        <div className="flex gap-3">
          <Button asChild><Link to="/contact">Contact support</Link></Button>
          <Button variant="outline" onClick={() => logout()}>Sign out</Button>
        </div>
      </section>
    </Layout>
  );
};

export default MemberDashboard;
