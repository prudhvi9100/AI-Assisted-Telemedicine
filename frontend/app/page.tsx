import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Activity, ShieldCheck, Stethoscope, Calendar, ArrowRight, Brain, Clock, FileText, Smartphone, CheckCircle, MessageSquare } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground scroll-smooth">
      {/* Navbar */}
      <header className="px-6 lg:px-10 h-20 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            HealthConnect
          </span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8 items-center">
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block" href="#how-it-works">
            Workflow
          </Link>
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block" href="#testimonials">
            Stories
          </Link>
          <Link className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden md:block" href="#faq">
            FAQ
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex hover:bg-primary/10">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-b from-background to-muted/20">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
          </div>

          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <Badge variant="outline" className="px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-full">
                <Brain className="w-3 h-3 mr-2" />
                Next-Gen AI Telemedicine
              </Badge>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance max-w-5xl leading-[1.1]">
                Smart Healthcare at Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Fingertips</span>.
              </h1>

              <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl leading-relaxed">
                Skip the waiting room. Get instant AI symptom analysis, connect with top doctors, and manage your health records securely—anytime, anywhere.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full justify-center">
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                    Check Symptoms Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-muted/50 transition-all hover:-translate-y-1">
                    See How it Works
                  </Button>
                </Link>
              </div>

              {/* Stats / Trust */}
              <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl opacity-90">
                <div className="flex flex-col items-center p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-muted shadow-sm">
                  <span className="text-3xl font-bold text-foreground">10k+</span>
                  <span className="text-sm text-muted-foreground">Active Patients</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-muted shadow-sm">
                  <span className="text-3xl font-bold text-foreground">500+</span>
                  <span className="text-sm text-muted-foreground">Specialists</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-muted shadow-sm">
                  <span className="text-3xl font-bold text-foreground">24/7</span>
                  <span className="text-sm text-muted-foreground">AI Support</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-background/50 backdrop-blur-sm rounded-2xl border border-muted shadow-sm">
                  <span className="text-3xl font-bold text-foreground">98%</span>
                  <span className="text-sm text-muted-foreground">Patient Satisfied</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities Section */}
        <section className="py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge variant="secondary" className="px-3 py-1">AI-Powered Tech</Badge>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight">Beyond Simple Telemedicine</h2>
                <p className="text-lg text-muted-foreground">
                  Our platform doesn't just connect you to doctors; it helps you understand your health better before the consultation even begins.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-1.5 rounded-full"><Brain className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Intelligent Symptom Checker</h3>
                      <p className="text-muted-foreground">Type "fever and headache," and our AI suggests possible causes and urgency levels.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-500/10 p-1.5 rounded-full"><Activity className="h-5 w-5 text-blue-600" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Smart Triage System</h3>
                      <p className="text-muted-foreground">Automatically prioritizes appointments based on symptom severity.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-500/10 p-1.5 rounded-full"><FileText className="h-5 w-5 text-emerald-600" /></div>
                    <div>
                      <h3 className="font-semibold text-lg">Automated Health Insights</h3>
                      <p className="text-muted-foreground">Analyzes your past records to detect patterns and suggest checkups.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-2xl opacity-20" />
                <Card className="relative border-muted shadow-2xl overflow-hidden">
                  <div className="bg-muted/50 p-4 border-b flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="h-6 w-3/4 bg-background rounded mx-auto opacity-50" />
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <div className="bg-primary/10 self-start rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 max-w-[80%]">
                        <p className="text-sm">I've been having a persistent headache for 3 days.</p>
                      </div>
                      <div className="bg-muted self-end rounded-tl-xl rounded-tr-xl rounded-bl-xl p-3 max-w-[80%] ml-auto">
                        <p className="text-sm font-medium flex items-center gap-2"><Brain className="w-4 h-4 text-primary" /> AI Analysis Running...</p>
                        <p className="text-xs text-muted-foreground mt-1">Found 3 possible matches related to dehydration or stress. Suggesting hydration and rest. If persists, consult a general physician.</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">Recommended Action:</p>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">Book Appointment Analysis</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive care designed around your needs and schedule.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Smartphone className="h-8 w-8 text-primary" />}
                title="Mobile First Experience"
                description="Consult from your phone, tablet, or laptop. Our responsive design ensures a seamless experience on any device."
              />
              <FeatureCard
                icon={<Clock className="h-8 w-8 text-blue-600" />}
                title="Instant Availability"
                description="Our smart scheduling matches you with available doctors instantly, reducing wait times by up to 80%."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-8 w-8 text-emerald-600" />}
                title="Bank-Grade Security"
                description="We use end-to-end encryption to ensure your medical data stays private and compliant with healthcare standards."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] pointer-events-none" />
          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Workflow</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">Your journey to better health in 4 simple steps.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10 border-t-2 border-dashed border-muted-foreground/30" />

              <StepCard
                number="1"
                title="Symptom Check"
                description="Tell our AI about your symptoms like 'fever' or 'headache' for initial guidance."
                icon={<Activity className="h-5 w-5" />}
              />
              <StepCard
                number="2"
                title="Book Appointment"
                description="Select a specialist. Our system suggests the best available slots for you."
                icon={<Calendar className="h-5 w-5" />}
              />
              <StepCard
                number="3"
                title="Consultation"
                description="Connect with your doctor via high-quality video or chat consultation."
                icon={<Stethoscope className="h-5 w-5" />}
              />
              <StepCard
                number="4"
                title="Receive Care"
                description="Get digital prescriptions and extensive records instantly in your dashboard."
                icon={<FileText className="h-5 w-5" />}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Patients</h2>
              <p className="text-muted-foreground">See what our users have to say about their experience.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                quote="The AI symptom checker was spot on! It helped me realize I needed to see a doctor immediately, and I got an appointment within 15 minutes."
                author="Priya Sharma"
                role="Software Engineer"
                avatar="P"
              />
              <TestimonialCard
                quote="Managing my parents' medical records used to be a nightmare with all the loose papers. Now everything is secure and accessible in one place."
                author="Rahul Verma"
                role="Business Analyst"
                avatar="R"
              />
              <TestimonialCard
                quote="The video consultation was smooth and high quality. The doctor was very professional and I got my prescription instantly."
                author="Anita Desai"
                role="Teacher"
                avatar="A"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Got questions? We've got answers.</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is the AI diagnosis final?</AccordionTrigger>
                <AccordionContent>
                  No, the AI symptom checker provides initial guidance and suggestions based on your inputs. It is not a replacement for professional medical advice. Always consult with a certified doctor for a final diagnosis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How secure is my medical data?</AccordionTrigger>
                <AccordionContent>
                  We take security very seriously. All your medical records, personal information, and consultations are encrypted using bank-grade security protocols. Only you and your authorized doctors can access your data.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I consulting a doctor on weekends?</AccordionTrigger>
                <AccordionContent>
                  Yes! We have doctors available 24/7. Our smart scheduling system will show you the available slots for doctors, including weekends and holidays.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Do you offer refunds if I miss an appointment?</AccordionTrigger>
                <AccordionContent>
                  We have a flexible cancellation policy. If you cancel at least 2 hours before your appointment, we provide a full refund. Please check our terms for more details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-primary px-6 py-16 md:px-16 md:py-24 text-center items-center flex flex-col shadow-2xl shadow-primary/30">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 relative z-10 max-w-2xl">
                Ready to prioritize your health?
              </h2>
              <p className="text-primary-foreground/90 text-lg md:text-xl max-w-xl mb-10 relative z-10">
                Join thousands of patients using HealthConnect for a smarter, safer healthcare experience today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full justify-center">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto font-semibold">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 bg-muted/20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-1.5 rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-lg">HealthConnect</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Empowering patients with AI-driven healthcare solutions for a better tomorrow.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Find Doctors</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Symptom Checker</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Book Appointment</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 HealthConnect AI. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-none shadow-lg bg-background/50 backdrop-blur-sm hover:shadow-xl hover:bg-background transition-all duration-300 group hover:-translate-y-1">
      <CardHeader>
        <div className="h-14 w-14 rounded-2xl bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center relative z-10 group">
      <div className="w-20 h-20 rounded-2xl bg-background border border-muted group-hover:border-primary/50 transition-all duration-300 flex items-center justify-center shadow-lg mb-6 relative group-hover:shadow-primary/20 rotate-3 group-hover:rotate-0">
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-background">
          {number}
        </div>
        <div className="text-muted-foreground group-hover:text-primary transition-colors transform scale-125">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-[200px]">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role, avatar }: { quote: string; author: string; role: string; avatar: string }) {
  return (
    <Card className="border-none shadow-md bg-card hover:shadow-lg transition-all duration-300">
      <CardContent className="pt-6">
        <div className="mb-4 text-primary">
          <MessageSquare className="h-8 w-8 opacity-20" />
        </div>
        <p className="text-muted-foreground mb-6 italic">"{quote}"</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`/placeholder-avatar-${avatar}.jpg`} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
