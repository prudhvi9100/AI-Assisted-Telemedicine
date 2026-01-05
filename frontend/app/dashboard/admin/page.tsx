import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BriefcaseMedical, Calendar, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Overview</h1>
          <p className="text-muted-foreground">Platform performance and management summary.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,482</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>12% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Doctors</CardTitle>
              <BriefcaseMedical className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">452</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>4 new approvals today</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
              <Calendar className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">186</div>
              <div className="flex items-center text-xs text-rose-600 mt-1">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                <span>5% from yesterday</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Symptoms Checked</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,124</div>
              <div className="flex items-center text-xs text-emerald-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>18% usage increase</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Doctor Registrations</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/admin/approvals">View All Requests</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          DR
                        </div>
                        <div>
                          <h4 className="font-bold">Dr. Applicant #{i}</h4>
                          <p className="text-sm text-muted-foreground">Pediatrics • 8 Years Exp.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Server Uptime</span>
                    <span className="font-medium">99.98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99.98%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">API Response Time</span>
                    <span className="font-medium">240ms</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[80%]" />
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="text-sm font-bold text-primary mb-1">Weekly Growth Report</h4>
                  <p className="text-xs text-muted-foreground">
                    The platform is experiencing higher than usual traffic during weekends.
                  </p>
                  <Button variant="link" className="p-0 h-auto text-xs mt-2 text-primary">
                    View Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
