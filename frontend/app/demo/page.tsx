import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DemoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Demo Coming Soon</h1>
            <p className="text-muted-foreground mb-8 text-lg max-w-md">
                We are preparing an interactive demo of the AI-Assisted Telemedicine platform. Stay tuned!
            </p>
            <Link href="/">
                <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </Button>
            </Link>
        </div>
    )
}
