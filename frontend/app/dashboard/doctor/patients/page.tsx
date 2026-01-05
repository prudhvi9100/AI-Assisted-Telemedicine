"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, Loader2, Users } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import api from "@/lib/api"

export default function DoctorPatients() {
    const [patients, setPatients] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await api.get("/appointments")
                if (data.success) {
                    const uniquePatients = new Map();
                    data.data.forEach((apt: any) => {
                        if (apt.patient && !uniquePatients.has(apt.patient._id)) {
                            uniquePatients.set(apt.patient._id, {
                                ...apt.patient,
                                lastVisit: apt.date
                            });
                        }
                    });
                    setPatients(Array.from(uniquePatients.values()));
                }
            } catch (error) {
                console.error("Failed to fetch patients", error)
            } finally {
                setLoading(false)
            }
        }
        fetchPatients()
    }, [])

    return (
        <DashboardLayout role="doctor">
            <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">My Patients</h1>
                        <p className="text-muted-foreground">View and manage your patient records.</p>
                    </div>
                    <Button>Add New Patient</Button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search patients..." className="pl-9" />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                        <p className="mt-2 text-muted-foreground">Loading patients...</p>
                    </div>
                ) : patients.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-muted/20">
                        <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <p className="text-muted-foreground">No patients found associated with your appointments.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {patients.map((patient) => (
                            <Card key={patient._id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src="/placeholder-avatar.jpg" />
                                                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold">{patient.name}</h3>
                                                <p className="text-sm text-muted-foreground">{patient.email}</p>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                <DropdownMenuItem>View History</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Last Visit</p>
                                            <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Status</p>
                                            <p className="font-medium text-green-600">Active</p>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <Button variant="outline" className="w-full">View Medical Records</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
