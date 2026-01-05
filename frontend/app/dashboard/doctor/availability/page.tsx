"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus, Save } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function AvailabilityManagement() {
  const [activeDays, setActiveDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])

  return (
    <DashboardLayout role="doctor">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Availability Management</h1>
            <p className="text-muted-foreground">Set your weekly schedule and consultation time slots.</p>
          </div>
          <Button className="gap-2">
            <Save className="h-4 w-4" /> Save Schedule
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-border">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Toggle days and set specific hours for your consultations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {days.map((day) => (
                <div
                  key={day}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/20"
                >
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={activeDays.includes(day)}
                      onCheckedChange={(checked) => {
                        if (checked) setActiveDays([...activeDays, day])
                        else setActiveDays(activeDays.filter((d) => d !== day))
                      }}
                    />
                    <Label className="font-bold text-lg">{day}</Label>
                  </div>

                  {activeDays.includes(day) ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-background">
                        09:00 AM - 05:00 PM
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground italic">Unavailable</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Slot Duration</Label>
                      <p className="text-xs text-muted-foreground">Standard consultation time</p>
                    </div>
                    <Badge variant="secondary">30 mins</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Buffer Time</Label>
                      <p className="text-xs text-muted-foreground">Break between slots</p>
                    </div>
                    <Badge variant="secondary">10 mins</Badge>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Status Overview
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Your profile shows as "Available" during active hours unless manually toggled.
                  </p>
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <Label className="text-xs font-medium">Automatic Online Status</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive text-lg">Holidays & Time Off</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Add specific dates when you'll be away from the platform.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  Add Time Off
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
