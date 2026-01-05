"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, ArrowRight, Video, FileText, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

// ... imports

export default function DoctorDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    // ... (rest of state)

    // ... inside return
    return(
    <DashboardLayout role = "doctor" >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src="/doctor-avatar-placeholder.png" />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || "D"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, Dr. {user?.name?.split(' ')[0] || "Doe"}
                </h1>
                <p className="text-muted-foreground">Manage your patients and upcoming consultations.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.todayAppointments}</div>
                <p className="text-xs text-muted-foreground">Scheduled for today</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                <Clock className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.totalAppointments}</div>
                <p className="text-xs text-muted-foreground">Lifetime bookings</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{loading ? "..." : stats.totalPatients}</div>
                <p className="text-xs text-muted-foreground">Unique patients</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-bold">{loading ? "..." : stats.rating}</span>
                  <span className="text-xs text-muted-foreground ml-1">/5.0</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="h-1.5 w-6 rounded-full bg-secondary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Based on reviews</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Quick Actions</CardTitle>
                    <p className="text-sm text-muted-foreground">Manage your practice</p>
                  </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
                    <Link href="/dashboard/doctor/appointments">
                      <Calendar className="h-6 w-6 text-primary" />
                      <span>View Appointments</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
                    <Link href="/dashboard/doctor/patients">
                      <Users className="h-6 w-6 text-secondary" />
                      <span>My Patients</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border bg-secondary/5">
                <CardHeader>
                  <CardTitle className="text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Database Connection: Active
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    API Status: Online
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </DashboardLayout >
  )
}
