"use client"

import { useState, useEffect } from "react"
import { SecurityDashboard } from "@/components/security-dashboard"
import AuthPage from "@/components/auth-page"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is remembered on page load
    if (typeof window !== "undefined") {
      const rememberedUser = localStorage.getItem("rememberedUser")
      if (rememberedUser) {
        setIsAuthenticated(true)
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rememberedUser")
    }
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthPage onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return <SecurityDashboard onLogout={handleLogout} />
}
