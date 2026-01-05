"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import api from "@/lib/api"
import { useRouter, usePathname } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
    role: "patient" | "doctor" | "admin"
}

interface AuthContextType {
    user: User | null
    loading: boolean
    login: (token: string, userData: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: () => { },
    logout: () => { },
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            let token = localStorage.getItem("accessToken")

            // If no token found, try to refresh first (maybe we have a cookie)
            if (!token) {
                try {
                    const { data } = await api.post("/auth/refresh-token")
                    if (data.success && data.accessToken) {
                        token = data.accessToken
                        localStorage.setItem("accessToken", token)
                    }
                } catch (e) {
                    // Both local token and cookie failed
                    setLoading(false)
                    return
                }
            }

            // If we have a token (either from local or just refreshed), fetch user
            if (token) {
                try {
                    const { data } = await api.get("/auth/me")
                    if (data.success) {
                        setUser(data.data)
                    }
                } catch (err) {
                    console.error("Auth check failed:", err)
                    localStorage.removeItem("accessToken")
                    setUser(null)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = (token: string, userData: User) => {
        localStorage.setItem("accessToken", token)
        setUser(userData)
        router.push(`/dashboard/${userData.role}`)
    }

    const logout = async () => {
        try {
            await api.get("/auth/logout"); // Clear cookie on backend
        } catch (err) {
            console.error("Logout error", err);
        }
        localStorage.removeItem("accessToken")
        setUser(null)
        router.push("/login")
    }

    return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}
