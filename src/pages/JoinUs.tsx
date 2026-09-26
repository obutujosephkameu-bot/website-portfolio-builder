import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, Gift, Send, Upload } from "lucide-react";
import Layout from "@/components/layout/Layout";

const TARGET_EMAIL = "lumexdigital9@gmail.com";

const JoinUs = () => {
  // Job Application state
  const [jobName, setJobName] = useState("");
  const [jobEmail, setJobEmail] = useState("");
  const [jobPhone, setJobPhone] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobMessage, setJobMessage] = useState("");

  // Referral state
  const [refName, setRefName] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Job Application - " + jobPosition);
    const body = encodeURIComponent(
      `Full Name: ${jobName}\nEmail: ${jobEmail}\nPhone: ${jobPhone}\nPosition: ${jobPosition}\n\nMessage:\n${jobMessage}\n\n(Please attach CV to this email)`
    );
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Client Referral from " + refName);
    const body = encodeURIComponent(
      `Referrer Name: ${refName}\nReferrer Phone: ${refPhone}\n\nClient Name: ${clientName}\nClient Phone: ${clientPhone}\nClient Business Type: ${clientBusiness}`
    );
    window.location.href = `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Layout>
      <section className="py-20 px-4 min-h-[80vh]">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Join Us</h1>
            <p className="text-muted-foreground">Be part of the Lumex Digital family</p>
          </div>

          <Tabs defaultValue="jobs">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="jobs" className="flex-1">
                <Briefcase className="w-4 h-4 mr-2" /> Job Application
              </TabsTrigger>
              <TabsTrigger value="referral" className="flex-1">
                <Users className="w-4 h-4 mr-2" /> Refer a Client
              </TabsTrigger>
            </TabsList>

            {/* JOB APPLICATION TAB */}
            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" /> Apply for a Position
                  </CardTitle>
                  <CardDescription>Fill in the form and your email app will open with the details pre-filled. Attach your CV before sending.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJobSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-name">Full Name</Label>
                      <Input id="job-name" placeholder="Your full name" value={jobName} onChange={(e) => setJobName(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="job-email">Email</Label>
                        <Input id="job-email" type="email" placeholder="you@email.com" value={jobEmail} onChange={(e) => setJobEmail(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="job-phone">Phone</Label>
                        <Input id="job-phone" type="tel" placeholder="+254 7XX XXX XXX" value={jobPhone} onChange={(e) => setJobPhone(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-position">Position Applying For</Label>
                      <Input id="job-position" placeholder="e.g. Web Developer, Graphic Designer" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-message">Message</Label>
                      <Textarea id="job-message" placeholder="Tell us about yourself..." rows={4} value={jobMessage} onChange={(e) => setJobMessage(e.target.value)} required />
                    </div>
                    <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-center gap-3">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Your email app will open — please attach your CV file before sending.</p>
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" /> Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* REFERRAL TAB */}
            <TabsContent value="referral">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-accent" /> Refer a Client Program
                  </CardTitle>
                  <CardDescription>
                    Earn <strong className="text-primary">KES 3,500 to KES 20,000</strong> for each successful referral! Refer a business that needs our digital services and get rewarded when they sign up.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Gift className="w-4 h-4 text-accent" /> How It Works
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Fill in your details and the client's info below</li>
                      <li>We reach out to the client and offer our services</li>
                      <li>When the client signs up, you earn your reward!</li>
                    </ol>
                  </div>

                  <form onSubmit={handleReferralSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ref-name">Your Name</Label>
                        <Input id="ref-name" placeholder="Your full name" value={refName} onChange={(e) => setRefName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ref-phone">Your Phone</Label>
                        <Input id="ref-phone" type="tel" placeholder="+254 7XX XXX XXX" value={refPhone} onChange={(e) => setRefPhone(e.target.value)} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client-name">Client Name</Label>
                        <Input id="client-name" placeholder="Client's name" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client-phone">Client Phone</Label>
                        <Input id="client-phone" type="tel" placeholder="+254 7XX XXX XXX" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-biz">Client Business Type</Label>
                      <Input id="client-biz" placeholder="e.g. Restaurant, Salon, E-commerce" value={clientBusiness} onChange={(e) => setClientBusiness(e.target.value)} required />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" /> Submit Referral
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default JoinUs;
