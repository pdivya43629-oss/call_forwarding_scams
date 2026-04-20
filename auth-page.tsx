"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Phone, Lock, CheckCircle, AlertCircle } from "lucide-react"

interface User {
  username: string
  email: string
  phone: string
  password: string
}

interface ValidationErrors {
  username?: string
  email?: string
  phone?: string
  password?: string
  login?: string
}

interface AuthPageProps {
  onLoginSuccess?: () => void
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  // Form states
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const [loginData, setLoginData] = useState({
    identifier: "", // username, email, or phone
    password: "",
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d+$/
    return phoneRegex.test(phone)
  }

  const validatePassword = (password: string): boolean => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasMinLength = password.length >= 8
    return hasSpecialChar && hasNumber && hasMinLength
  }

  // Get stored users from localStorage
  const getStoredUsers = (): User[] => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("users")
      return stored ? JSON.parse(stored) : []
    }
    return []
  }

  // Store user in localStorage
  const storeUser = (user: User) => {
    if (typeof window !== "undefined") {
      const users = getStoredUsers()
      users.push(user)
      localStorage.setItem("users", JSON.stringify(users))
    }
  }

  // Handle signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: ValidationErrors = {}

    // Validate all fields
    if (!signupData.username.trim()) {
      newErrors.username = "Username is required"
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(signupData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!signupData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(signupData.phone)) {
      newErrors.phone = "Phone number should only contain digits"
    }

    if (!signupData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(signupData.password)) {
      newErrors.password = "Password must contain at least 8 characters, one number, and one special character"
    }

    // Check if user already exists
    const existingUsers = getStoredUsers()
    const userExists = existingUsers.some(
      (user) =>
        user.username === signupData.username || user.email === signupData.email || user.phone === signupData.phone,
    )

    if (userExists) {
      newErrors.username = "User with this username, email, or phone already exists"
    }

    setErrors(newErrors)

    // If no errors, create account
    if (Object.keys(newErrors).length === 0) {
      storeUser(signupData)
      setSignupData({ username: "", email: "", phone: "", password: "" })
      setIsLogin(true)
      setErrors({})
    }
  }

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: ValidationErrors = {}

    if (!loginData.identifier.trim()) {
      newErrors.login = "Username, email, or phone is required"
    }

    if (!loginData.password) {
      newErrors.login = "Password is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const users = getStoredUsers()
      const user = users.find(
        (u) =>
          (u.username === loginData.identifier ||
            u.email === loginData.identifier ||
            u.phone === loginData.identifier) &&
          u.password === loginData.password,
      )

      if (user) {
        setLoginSuccess(true)
        setErrors({})
        if (rememberMe && typeof window !== "undefined") {
          localStorage.setItem("rememberedUser", JSON.stringify(user))
        }
        setTimeout(() => {
          onLoginSuccess?.()
        }, 2000)
      } else {
        setErrors({ login: "Invalid credentials. Please check your username/email/phone and password." })
      }
    }
  }

  if (loginSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">Login Successful!</h2>
              <p className="text-muted-foreground">Welcome back! You have been successfully logged in.</p>
              <Button
                onClick={() => {
                  setLoginSuccess(false)
                  setLoginData({ identifier: "", password: "" })
                  setRememberMe(false)
                }}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome back" : "Create account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Enter your information to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Username, Email, or Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter username, email, or phone"
                    value={loginData.identifier}
                    onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              {errors.login && (
                <div className="flex items-center space-x-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.login}</span>
                </div>
              )}

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    className="pl-10"
                  />
                </div>
                {errors.username && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.username}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
                {errors.phone && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center space-x-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Password must contain at least 8 characters, one number, and one special character
                </p>
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setErrors({})
                setLoginSuccess(false)
              }}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
