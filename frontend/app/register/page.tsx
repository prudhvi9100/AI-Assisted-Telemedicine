"use client"
import { useState } from "react"
import Link from "next/link"
import { Activity, User, BriefcaseMedical } from "lucide-react"
import api from "@/lib/api"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Patient State
  const [pFirstName, setPFirstName] = useState("")
  const [pLastName, setPLastName] = useState("")
  const [pEmail, setPEmail] = useState("")
  const [pPhone, setPPhone] = useState("")
  const [pPassword, setPPassword] = useState("")

  // Doctor State
  const [dFirstName, setDFirstName] = useState("")
  const [dLastName, setDLastName] = useState("")
  const [dEmail, setDEmail] = useState("")
  const [dSpecialization, setDSpecialization] = useState("")
  const [dExperience, setDExperience] = useState("")
  const [dLicense, setDLicense] = useState("")
  const [dPassword, setDPassword] = useState("")

  const handleRegister = async (role: "patient" | "doctor") => {
    setError("")
    setLoading(true)

    // Basic Validation
    if (role === 'patient' && (!pFirstName || !pLastName || !pEmail || !pPassword)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }
    if (role === 'doctor' && (!dFirstName || !dLastName || !dEmail || !dPassword)) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    const payload = {
      name: role === 'patient' ? `${pFirstName} ${pLastName}` : `${dFirstName} ${dLastName}`,
      email: role === 'patient' ? pEmail : dEmail,
      password: role === 'patient' ? pPassword : dPassword,
      role: role
    }

    try {
      const { data } = await api.post("/auth/register", payload)
      if (data.success) {
        login(data.accessToken, data.user)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <Activity className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
        <span className="text-2xl font-bold text-foreground">HealthConnect</span>
      </Link>

      <Card className="w-full max-w-lg border-border">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Choose your role and fill in your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md text-center font-medium">{error}</div>}

          <Tabs defaultValue="patient" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient
              </TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">
                <BriefcaseMedical className="h-4 w-4" />
                Doctor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patient" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="p-first-name">First Name <span className="text-destructive">*</span></Label>
                  <Input id="p-first-name" placeholder="John" value={pFirstName} onChange={(e) => setPFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-last-name">Last Name <span className="text-destructive">*</span></Label>
                  <Input id="p-last-name" placeholder="Doe" value={pLastName} onChange={(e) => setPLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-email">Email Address <span className="text-destructive">*</span></Label>
                <Input id="p-email" type="email" placeholder="john@example.com" value={pEmail} onChange={(e) => setPEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-phone">Phone Number</Label>
                <Input id="p-phone" type="tel" placeholder="+1 (555) 000-0000" value={pPhone} onChange={(e) => setPPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-password">Password <span className="text-destructive">*</span></Label>
                <Input id="p-password" type="password" value={pPassword} onChange={(e) => setPPassword(e.target.value)} />
              </div>
              <Button className="w-full" size="lg" onClick={() => handleRegister("patient")} disabled={loading}>
                {loading ? "Creating Account..." : "Create Patient Account"}
              </Button>
            </TabsContent>

            <TabsContent value="doctor" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="d-first-name">First Name <span className="text-destructive">*</span></Label>
                  <Input id="d-first-name" placeholder="Dr. Jane" value={dFirstName} onChange={(e) => setDFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="d-last-name">Last Name <span className="text-destructive">*</span></Label>
                  <Input id="d-last-name" placeholder="Smith" value={dLastName} onChange={(e) => setDLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="d-email">Email Address <span className="text-destructive">*</span></Label>
                <Input id="d-email" type="email" placeholder="doctor@example.com" value={dEmail} onChange={(e) => setDEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select onValueChange={setDSpecialization}>
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Physician</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="ent">ENT Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input id="experience" type="number" placeholder="5" value={dExperience} onChange={(e) => setDExperience(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input id="license" placeholder="MED-123456" value={dLicense} onChange={(e) => setDLicense(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="d-password">Password <span className="text-destructive">*</span></Label>
                <Input id="d-password" type="password" value={dPassword} onChange={(e) => setDPassword(e.target.value)} />
              </div>
              <Button className="w-full" size="lg" onClick={() => handleRegister("doctor")} disabled={loading}>
                {loading ? "Submitting Application..." : "Submit Application"}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
