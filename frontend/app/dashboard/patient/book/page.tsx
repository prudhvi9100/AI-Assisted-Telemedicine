"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Video, ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import api from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]

export default function BookAppointment() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [doctors, setDoctors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/doctors")
        if (data.success) {
          setDoctors(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch doctors", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDoctors()
  }, [])

  const handleBookAppointment = async () => {
    setBookingLoading(true)
    try {
      await api.post("/appointments", {
        doctorId: selectedDoctor._id,
        date: date,
        timeSlot: selectedSlot,
        type: "video" // Default for now
      })
      setIsConfirming(true)
    } catch (error) {
      console.error("Booking failed", error)
      alert("Failed to book appointment. Please try again.")
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
            <p className="text-muted-foreground">Find the right specialist and schedule your consultation.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            {["Specialist", "Date & Time", "Confirm"].map((label, index) => {
              const stepNum = index + 1
              const isActive = stepNum === step
              const isCompleted = stepNum < step
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground"
                      }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-sm font-medium ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                  >
                    {label}
                  </span>
                  {index < 2 && <div className="w-8 h-px bg-border" />}
                </div>
              )
            })}
          </div>
        </div>

        {step === 1 && (
          <div className="grid lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-1 border-border h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-3 space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="mt-2 text-muted-foreground">Loading specialists...</p>
                </div>
              ) : doctors.length === 0 ? (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground">No doctors available at the moment.</p>
                </div>
              ) : (
                doctors.map((doctor) => (
                  <Card
                    key={doctor._id}
                    className={`border-border hover:border-primary/50 transition-colors cursor-pointer ${selectedDoctor?._id === doctor._id ? "ring-2 ring-primary border-transparent" : ""
                      }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={doctor.image || "/placeholder.svg"} />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold">{doctor.name}</h3>
                          <Badge variant="secondary" className="w-fit mx-auto sm:mx-0">
                            {doctor.specialty}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1 text-secondary font-medium">
                            <Star className="h-4 w-4 fill-current" /> {doctor.rating}
                          </span>
                          <span>{doctor.reviews} Reviews</span>
                          <span className="flex items-center gap-1">
                            <Check className="h-4 w-4 text-primary" /> Verified
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Video className="h-3 w-3" /> Video Call
                          </Badge>
                          <Badge variant="outline">Consultation Fee: $50</Badge>
                        </div>
                      </div>
                      <Button
                        variant={selectedDoctor?._id === doctor._id ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDoctor(doctor)
                          setStep(2)
                        }}
                      >
                        Choose Specialist
                      </Button>
                    </CardContent>
                  </Card>
                )))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred date for the consultation.</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-border w-full flex justify-center"
                />
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>Select Time Slot</CardTitle>
                <CardDescription>Available slots for {date?.toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedSlot === slot ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button variant="ghost" onClick={() => setStep(1)} className="flex-1 gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button disabled={!selectedSlot} onClick={() => setStep(3)} className="flex-[2] gap-2">
                  Confirm Details <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {step === 3 && (
          <Card className="max-w-2xl mx-auto border-border">
            <CardHeader className="text-center">
              <CardTitle>Review & Confirm</CardTitle>
              <CardDescription>Please check the appointment details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-muted/30 border border-border flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedDoctor?.image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedDoctor?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-lg">{selectedDoctor?.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedDoctor?.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Date</p>
                  <p className="font-semibold">
                    {date?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-card">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Time</p>
                  <p className="font-semibold">{selectedSlot}</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-border bg-card flex justify-between items-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Consultation Mode</p>
                  <p className="font-semibold flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" /> Video Call
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Fee</p>
                  <p className="font-bold text-xl text-primary">$50.00</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button variant="ghost" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleBookAppointment} disabled={bookingLoading} className="flex-[2]">
                {bookingLoading ? "Booking..." : "Book Appointment"}
              </Button>
            </CardFooter>
          </Card>
        )}

        <Dialog open={isConfirming} onOpenChange={(open) => {
          if (!open) {
            // Redirect if dialog is closed
            window.location.href = "/dashboard/patient"
          }
          setIsConfirming(open)
        }}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle>Appointment Confirmed!</DialogTitle>
              <DialogDescription>
                Your appointment with {selectedDoctor?.name} has been successfully scheduled.
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 rounded-lg bg-muted/30 text-center space-y-1">
              <p className="text-sm font-semibold">
                {date?.toLocaleDateString()} at {selectedSlot}
              </p>
              <p className="text-xs text-muted-foreground">A confirmation email has been sent to your inbox.</p>
            </div>
            <DialogFooter>
              <Button className="w-full" onClick={() => (window.location.href = "/dashboard/patient")}>
                Go to Dashboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
