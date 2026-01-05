"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Search, Filter, Calendar, User, Eye, Plus, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import api from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function MedicalRecords() {
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  // Form State
  const [title, setTitle] = useState("")
  const [type, setType] = useState("report")
  const [description, setDescription] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/reports")
      if (data.success) {
        setRecords(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch records", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [])

  const handleUpload = async () => {
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      setSubmitting(true)
      const { data } = await api.post("/reports", {
        title,
        type,
        description
      })

      if (data.success) {
        toast({
          title: "Success",
          description: "Record uploaded successfully",
        })
        setIsOpen(false)
        setTitle("")
        setDescription("")
        fetchRecords() // Refresh list
      }
    } catch (error) {
      console.error("Upload failed", error)
      toast({
        title: "Error",
        description: "Failed to upload record",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Medical Records</h1>
            <p className="text-muted-foreground">Access your health history, prescriptions, and reports.</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Upload New Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload Medical Record</DialogTitle>
                <DialogDescription>
                  Add a new medical report or prescription to your history.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Blood Test Results"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="report">Lab Report</SelectItem>
                      <SelectItem value="prescription">Prescription</SelectItem>
                      <SelectItem value="notes">Doctor Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Description / Content</Label>
                  <Textarea
                    id="desc"
                    placeholder="Enter the details of the report..."
                    className="min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleUpload} disabled={submitting}>
                  {submitting ? "Saving..." : "Save Record"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-3 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search records by title..." className="pl-10 border-border" />
            </div>
            <Button variant="outline" className="gap-2 border-border bg-transparent">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              Total: {records.length} Files
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-2 text-muted-foreground">Loading records...</p>
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="text-muted-foreground">No medical records found.</p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="space-y-6">
                {records.map((record) => (
                  <div key={record._id} className="relative pl-8 md:pl-10 group">
                    {/* Timeline Connector */}
                    <div className="absolute left-[3px] top-0 bottom-0 w-px bg-border group-last:bottom-auto group-last:h-6 md:left-[19px]" />
                    <div className="absolute left-0 top-6 -translate-y-1/2 w-2 h-2 rounded-full bg-primary ring-4 ring-background md:left-4 md:w-3 md:h-3" />

                    <Card className="border-border hover:shadow-md transition-all hover:border-primary/50">
                      <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1 text-center sm:text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="font-bold text-lg">{record.title}</h3>
                            <Badge
                              variant="secondary"
                              className="w-fit mx-auto sm:mx-0 text-[10px] uppercase font-bold tracking-wider"
                            >
                              {record.type?.toUpperCase() || "REPORT"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{record.description}</p>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground mt-2">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" /> {new Date(record.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <User className="h-3.5 w-3.5" /> {record.doctor?.name || "Self Uploaded"}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" title="View" className="hover:bg-primary/10 hover:text-primary">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
