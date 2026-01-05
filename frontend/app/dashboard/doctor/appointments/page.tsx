"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Calendar as CalendarIcon, Loader2, FileText, Plus, ClipboardList } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import api from "@/lib/api"

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPatient, setSelectedPatient] = useState<{ id: string, name: string } | null>(null)
    const [isRecordsOpen, setIsRecordsOpen] = useState(false)
    const [patientRecords, setPatientRecords] = useState<any[]>([])
    const [recordsLoading, setRecordsLoading] = useState(false)

    // Prescription Form
    const [prescTitle, setPrescTitle] = useState("")
    const [prescDesc, setPrescDesc] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const fetchAppointments = async () => {
        try {
            const { data } = await api.get("/appointments")
            if (data.success) {
                setAppointments(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch appointments", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchPatientRecords = async (patientId: string) => {
        try {
            setRecordsLoading(true)
            const { data } = await api.get(`/reports?patientId=${patientId}`)
            if (data.success) {
                setPatientRecords(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch records", error)
        } finally {
            setRecordsLoading(false)
        }
    }

    const handleOpenRecords = (patient: { id: string, name: string }) => {
        setSelectedPatient(patient)
        setIsRecordsOpen(true)
        fetchPatientRecords(patient.id)
    }

    const handlePrescriptionSubmit = async () => {
        if (!selectedPatient || !prescTitle || !prescDesc) return

        try {
            setSubmitting(true)
            await api.post("/reports", {
                title: prescTitle,
                description: prescDesc,
                type: 'prescription',
                patientId: selectedPatient.id
            })
            // Reset and refresh
            setPrescTitle("")
            setPrescDesc("")
            fetchPatientRecords(selectedPatient.id)
            // Optional: switching tabs logic could go here
        } catch (error) {
            console.error("Failed to submit prescription", error)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    const handleStatusUpdate = async (id: string, status: 'confirmed' | 'cancelled') => {
        try {
            await api.put(`/appointments/${id}/status`, { status })
            fetchAppointments()
        } catch (error) {
            console.error("Failed to update status", error)
        }
    }

    return (
        <DashboardLayout role="doctor">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Appointments</h1>
                    <p className="text-muted-foreground">Manage your schedule and upcoming consultations.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                                <p className="mt-2 text-muted-foreground">Loading appointments...</p>
                            </div>
                        ) : appointments.length === 0 ? (
                            <div className="text-center py-12 border rounded-lg bg-muted/20">
                                <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p className="text-muted-foreground">No upcoming appointments scheduled.</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Patient Name</TableHead>
                                        <TableHead>Date & Time</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.map((apt) => (
                                        <TableRow key={apt._id}>
                                            <TableCell className="font-medium">{apt.patient?.name || "Unknown Patient"}</TableCell>
                                            <TableCell>
                                                {new Date(apt.date).toLocaleDateString()} at {apt.timeSlot}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {apt.type === 'video' && <Video className="h-4 w-4 text-primary" />}
                                                    <span className="capitalize">{apt.type}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    apt.status === "confirmed" ? "default" :
                                                        apt.status === "cancelled" ? "destructive" : "secondary"
                                                }>
                                                    {apt.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button size="sm" variant="outline" onClick={() => handleOpenRecords({ id: apt.patient?._id, name: apt.patient?.name })}>
                                                    <FileText className="h-4 w-4 mr-2" /> Records
                                                </Button>

                                                {apt.status === 'pending' && (
                                                    <>
                                                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate(apt._id, 'confirmed')}>
                                                            Accept
                                                        </Button>
                                                        <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(apt._id, 'cancelled')}>
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                                {apt.status === 'confirmed' && apt.type === 'video' && (
                                                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2" asChild>
                                                        <a href={`/video-room/${apt._id}`}>
                                                            <Video className="h-4 w-4" /> Join
                                                        </a>
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Records & Prescription Modal */}
                <Dialog open={isRecordsOpen} onOpenChange={setIsRecordsOpen}>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Medical Records: {selectedPatient?.name}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left: Records List */}
                                <div className="space-y-4 border-r pr-6">
                                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Patient History</h3>
                                    {recordsLoading ? (
                                        <div className="flex justify-center py-8"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
                                    ) : patientRecords.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                            No records found for this patient.
                                        </div>
                                    ) : (
                                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                                            {patientRecords.map(rec => (
                                                <div key={rec._id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors text-left">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className="font-medium text-sm">{rec.title}</span>
                                                        <Badge variant="outline" className="text-[10px]">{rec.type}</Badge>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{rec.description}</p>
                                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                                        <CalendarIcon className="h-3 w-3" />
                                                        {new Date(rec.date).toLocaleDateString()}
                                                        <span className="text-primary ml-auto flex items-center gap-1">
                                                            {rec.doctor ? "Dr. " + rec.doctor.name : "Patient Upload"}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Add Prescription */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                        <ClipboardList className="h-4 w-4" /> Write Prescription
                                    </h3>
                                    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border">
                                        <div className="space-y-2">
                                            <Label htmlFor="presc-title">Title / Diagnosis</Label>
                                            <Input
                                                id="presc-title"
                                                value={prescTitle}
                                                onChange={(e) => setPrescTitle(e.target.value)}
                                                placeholder="e.g. Viral Fever Prescription"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="presc-desc">Medication & Notes</Label>
                                            <Textarea
                                                id="presc-desc"
                                                value={prescDesc}
                                                onChange={(e) => setPrescDesc(e.target.value)}
                                                placeholder="Rx: Paracetamol 500mg..."
                                                className="min-h-[150px]"
                                            />
                                        </div>
                                        <Button className="w-full" onClick={handlePrescriptionSubmit} disabled={submitting}>
                                            {submitting ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                            Save Prescription
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}
