"use client"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { PhoneOff, Loader2 } from "lucide-react"

export default function VideoRoom() {
    const params = useParams()
    const router = useRouter()
    const { id } = params
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const jitsiRef = useRef<HTMLDivElement>(null)
    const apiRef = useRef<any>(null)

    useEffect(() => {
        if (apiRef.current) return; // Prevent double init

        // Load Jitsi Script
        const script = document.createElement("script")
        script.src = "https://meet.jit.si/external_api.js"
        script.async = true
        script.onload = () => {
            if (window.JitsiMeetExternalAPI) {
                const domain = "meet.jit.si"
                const options = {
                    roomName: `Telemedicine_App_${id}`,
                    width: '100%',
                    height: '100%',
                    parentNode: jitsiRef.current,
                    configOverwrite: {
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        prejoinPageEnabled: false,
                        prejoinConfig: {
                            enabled: false
                        }
                    },
                    interfaceConfigOverwrite: {
                        SHOW_JITSI_WATERMARK: false,
                        TOOLBAR_BUTTONS: [
                            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                            'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                            'security'
                        ]
                    },
                    userInfo: {
                        displayName: user?.name || "Guest User"
                    }
                }

                // @ts-ignore
                const api = new window.JitsiMeetExternalAPI(domain, options)
                apiRef.current = api

                api.addEventListeners({
                    videoConferenceLeft: () => router.back(),
                    readyToClose: () => router.back(),
                })

                setLoading(false)
            }
        }
        document.body.appendChild(script)

        return () => {
            // Cleanup on unmount
            if (apiRef.current) {
                apiRef.current.dispose()
                apiRef.current = null
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [id, router, user])

    const handleEndCall = () => {
        if (apiRef.current) {
            apiRef.current.executeCommand('hangup')
        }
        router.back()
    }

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header / Toolbar */}
            <div className="bg-background/90 backdrop-blur border-b p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-foreground">Live Consultation</span>
                </div>
                <Button variant="destructive" size="sm" onClick={handleEndCall} className="gap-2">
                    <PhoneOff className="h-4 w-4" /> End Call
                </Button>
            </div>

            {/* Video Area */}
            <div className="flex-1 relative bg-zinc-900 w-full h-full overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 bg-zinc-900">
                        <Loader2 className="h-12 w-12 animate-spin mb-4 text-primary" />
                        <p className="text-zinc-400">Loading secure room...</p>
                    </div>
                )}
                <div ref={jitsiRef} className="absolute inset-0 w-full h-full" />
            </div>
        </div>
    )
}

declare global {
    interface Window {
        JitsiMeetExternalAPI: any
    }
}
