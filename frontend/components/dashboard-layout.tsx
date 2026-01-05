"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import {
  Activity,
  LayoutDashboard,
  Calendar,
  FileText,
  Stethoscope,
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  Clock,
  Users,
  ShieldCheck,
  BarChart3,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarItem {
  title: string
  href: string
  icon: React.ElementType
}

const patientSidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
  { title: "AI Symptom Checker", href: "/dashboard/patient/symptom-checker", icon: Stethoscope },
  { title: "Book Appointment", href: "/dashboard/patient/book", icon: Calendar },
  { title: "Medical Records", href: "/dashboard/patient/records", icon: FileText },
  { title: "Profile", href: "/dashboard/patient/profile", icon: User },
]

const doctorSidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/dashboard/doctor", icon: LayoutDashboard },
  { title: "Appointments", href: "/dashboard/doctor/appointments", icon: Calendar },
  { title: "Availability", href: "/dashboard/doctor/availability", icon: Clock },
  { title: "Patient Records", href: "/dashboard/doctor/patients", icon: Users },
  { title: "Profile", href: "/dashboard/doctor/profile", icon: User },
]

const adminSidebarItems: SidebarItem[] = [
  { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Doctor Approvals", href: "/dashboard/admin/approvals", icon: ShieldCheck },
  { title: "User Management", href: "/dashboard/admin/users", icon: Users },
  { title: "Reports & Analytics", href: "/dashboard/admin/reports", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
]

export function DashboardLayout({
  children,
  role = "patient",
}: {
  children: React.ReactNode
  role?: "patient" | "doctor" | "admin"
}) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Use user role if available, otherwise fallback to prop (for layout consistency)
  const activeRole = user ? user.role : role

  const items = activeRole === "admin" ? adminSidebarItems : activeRole === "doctor" ? doctorSidebarItems : patientSidebarItems

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-6 flex items-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">HealthConnect</span>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive" onClick={logout}>
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6 flex items-center gap-2">
                  <Activity className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">HealthConnect</span>
                </div>
                <nav className="px-4 space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search records, doctors..." className="pl-9 bg-muted/50 border-none" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full animate-pulse" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2">
                  <div className="flex gap-3 items-start p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Appointment Confirmed</p>
                      <p className="text-xs text-muted-foreground">Dr. Smith • Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Lab Report</p>
                      <p className="text-xs text-muted-foreground">Blood work results are available.</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center cursor-pointer text-xs text-muted-foreground justify-center p-2">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 hover:bg-transparent flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user ? user.name?.charAt(0).toUpperCase() : role[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left mr-2">
                    <p className="text-sm font-medium leading-none capitalize">
                      {user ? user.name : (role === "doctor" ? "Dr. Smith" : role === "admin" ? "Admin User" : "John Doe")}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{user ? user.role : role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={
                      role === "admin"
                        ? "/dashboard/admin/settings"
                        : role === "doctor"
                          ? "/dashboard/doctor/profile"
                          : "/dashboard/patient/profile"
                    }
                  >
                    <User className="mr-2 h-4 w-4" /> Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
