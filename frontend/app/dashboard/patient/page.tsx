"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Stethoscope, FileText, Plus, ArrowRight, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"

export default function PatientDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<any[]>([])
  const [stats, setStats] = useState({
    upcoming: 0,
    consultations: 0,
    records: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/appointments")
        if (data.success) {
          setAppointments(data.data)

          // Helper to check if date is today or future
          const isUpcoming = (dateStr: string) => {
            const d = new Date(dateStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return d >= today;
          };

          // Calculate stats
          const upcoming = data.data.filter((a: any) => isUpcoming(a.date)).length
          const completed = data.data.filter((a: any) => !isUpcoming(a.date) || a.status === 'completed').length

          setStats({
            upcoming,
            consultations: completed,
            records: data.data.length // For now assuming 1 appt = 1 record
          })
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Get the very next upcoming appointment
  // Sort by date then status (confirmed first)
  const nextAppointment = appointments
    .filter((a: any) => {
      const d = new Date(a.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d >= today && a.status !== 'completed' && a.status !== 'cancelled';
    })
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0] || "Patient"}!</h1>
          <p className="text-muted-foreground">Here's an overview of your health status.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats.upcoming}</div>
              <p className="text-xs text-muted-foreground">{stats.upcoming} upcoming appointments</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Consultations</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats.consultations}</div>
              <p className="text-xs text-muted-foreground">Total consultations</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : stats.records}</div>
              <p className="text-xs text-muted-foreground">Files securely stored</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Checks</CardTitle>
              <Stethoscope className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Recent symptom analyses</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary" asChild>
                  <Link href="/dashboard/patient/book">
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p>Loading appointments...</p>
                  </div>
                ) : nextAppointment ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {nextAppointment.doctor?.name?.charAt(0) || "D"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">{nextAppointment.doctor?.name || "Dr. Unnamed"}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${nextAppointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            nextAppointment.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                            {nextAppointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(nextAppointment.date).toLocaleDateString()} at {nextAppointment.timeSlot}
                        </p>
                      </div>
                    </div>
                    {nextAppointment.status === 'confirmed' && nextAppointment.type === 'video' ? (
                      <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700" asChild>
                        <a href={`/video-room/${nextAppointment._id}`}>
                          <Stethoscope className="h-4 w-4" /> Join Call
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        {nextAppointment.status === 'pending' ? 'Waiting for Approval' : 'Join Call'}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>You have no upcoming appointments.</p>
                    <Button variant="link" asChild className="mt-2">
                      <Link href="/dashboard/patient/book">Schedule a consultation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Consultations</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/patient/records">See history</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading history...</div>
                ) : appointments.length > 0 ? (
                  <ul className="space-y-4">
                    {appointments.slice(0, 3).map((apt: any) => (
                      <li key={apt._id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="font-medium">{apt.doctor?.name}</p>
                          <p className="text-xs text-muted-foreground">{new Date(apt.date).toLocaleDateString()}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/dashboard/patient/records">View</Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No consultation history found.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Quick AI Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm opacity-90">
                  Not feeling well? Use our AI symptom checker to get an instant analysis of your condition.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/dashboard/patient/symptom-checker">Start Symptom Check</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" className="justify-start gap-2 bg-transparent" asChild>
                  <Link href="/dashboard/patient/book">
                    <Plus className="h-4 w-4" /> Book Appointment
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start gap-2 bg-transparent" asChild>
                  <Link href="/dashboard/patient/records">
                    <FileText className="h-4 w-4" /> Upload Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
