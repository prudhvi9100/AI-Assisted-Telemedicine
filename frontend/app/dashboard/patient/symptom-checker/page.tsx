"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Loader2, Stethoscope, ArrowRight, BrainCircuit } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import api from "@/lib/api"
import { useAuth } from "@/context/auth-context"

interface AnalysisResult {
  prediction: string;
  confidence: "Low" | "Medium" | "High";
  description: string;
  severity: "Low" | "Medium" | "High";
  recommendation: string;
}

export default function SymptomChecker() {
  const { user } = useAuth()
  const [symptoms, setSymptoms] = useState("")
  const [age, setAge] = useState("25")
  const [gender, setGender] = useState("male")

  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!symptoms) return;

    setAnalyzing(true)
    setResult(null)

    try {
      const { data } = await api.post("/ai/analyze", {
        symptoms,
        age,
        gender
      })

      if (data.success) {
        setResult(data.data)
      }
    } catch (error) {
      console.error("AI Analysis Failed", error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            AI Symptom Checker
          </h1>
          <p className="text-muted-foreground">Powered by Gemini AI. Describe your symptoms to get a preliminary analysis.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Describe your condition</CardTitle>
              <CardDescription>Be as specific as possible (pain intensity, duration, etc).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="symptoms">Describe your symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. I have a sharp pain in my left chest that started 2 hours ago. I also feel dizzy..."
                  className="min-h-[150px] border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleAnalyze} disabled={analyzing || !symptoms}>
                {analyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Consulting AI Model...
                  </>
                ) : (
                  "Analyze Symptoms"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {!result && !analyzing && (
              <Card className="border-border bg-muted/30">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Stethoscope className="h-12 w-12 text-muted-foreground opacity-20" />
                  <p className="text-sm text-muted-foreground">
                    Enter your symptoms and click analyze to see results here.
                  </p>
                </CardContent>
              </Card>
            )}

            {analyzing && (
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-semibold text-center">AI Analysis in Progress</h4>
                  <Progress value={65} className="h-2 animate-pulse" />
                  <p className="text-xs text-muted-foreground text-center">
                    Processing symptom data...
                  </p>
                </CardContent>
              </Card>
            )}

            {result && (
              <Card className="border-border border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    AI Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Predicted Condition</Label>
                    <p className="text-lg font-bold text-foreground mt-1">{result.prediction}</p>
                  </div>

                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Severity Level</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <Badge variant={result.severity === 'Low' ? 'outline' : 'secondary'} className={result.severity === 'High' ? 'bg-destructive text-destructive-foreground' : ''}>
                        {result.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Confidence: {result.confidence}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Analysis</Label>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Recommendation</Label>
                    <div className="p-3 bg-card border border-border rounded-lg text-sm font-medium">
                      {result.recommendation}
                    </div>
                  </div>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-400">
                      AI can make mistakes. Always verify with a specialist.
                    </p>
                  </div>

                  <Button className="w-full" asChild>
                    <Link href="/dashboard/patient/book">
                      Book Specialist <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
