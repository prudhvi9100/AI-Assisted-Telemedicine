"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DoctorProfile() {
    const { user } = useAuth()

    return (
        <DashboardLayout role="doctor">
            <div className="max-w-4xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Doctor Profile</h1>
                    <p className="text-muted-foreground">Manage your professional details and settings.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="pt-6 text-center space-y-4">
                                <Avatar className="h-32 w-32 mx-auto">
                                    <AvatarImage src="/placeholder-doctor.jpg" />
                                    <AvatarFallback className="text-4xl">
                                        {user?.name?.charAt(0).toUpperCase() || "D"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-xl font-bold">{user?.name}</h2>
                                    <p className="text-muted-foreground capitalize">{user?.role}</p>
                                </div>
                                <div className="flex justify-center gap-2">
                                    <Badge variant="secondary">Cardiology</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Update your personal details here.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input defaultValue={user?.name} readOnly />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input defaultValue={user?.email} readOnly />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Professional Details</CardTitle>
                                <CardDescription>Manage your specialization and experience.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Specialization</Label>
                                    <Input defaultValue="Cardiology" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Experience (Years)</Label>
                                    <Input defaultValue="10" />
                                </div>
                                <div className="space-y-2">
                                    <Label>License Number</Label>
                                    <Input defaultValue="MED-554433" />
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
