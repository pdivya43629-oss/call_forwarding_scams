"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Phone,
  AlertTriangle,
  CheckCircle,
  Activity,
  Settings,
  Bell,
  Smartphone,
  Zap,
  Eye,
  BarChart3,
  Pause,
  Play,
  LogOut,
  User,
} from "lucide-react"

interface SecurityDashboardProps {
  onLogout?: () => void
}

export function SecurityDashboard({ onLogout }: SecurityDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const getCurrentUser = () => {
    if (typeof window !== "undefined") {
      const rememberedUser = localStorage.getItem("rememberedUser")
      if (rememberedUser) {
        return JSON.parse(rememberedUser)
      }
    }
    return null
  }

  const currentUser = getCurrentUser()

  return (
    <div className="min-h-screen bg-background">
      {showAlert && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-5">
          <Card className="bg-destructive/10 border-destructive/20 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-semibold text-destructive">Security Alert</p>
                  <p className="text-sm text-foreground">{alertMessage}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAlert(false)} className="ml-auto">
                  ×
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">CallSecure Alert</h1>
                <p className="text-sm text-muted-foreground">USSD Protection Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Welcome, {currentUser.username}</span>
                </div>
              )}
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Protected
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Devices
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Protected Devices</CardTitle>
                  <Smartphone className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">12</div>
                  <p className="text-xs text-success">+2 from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Blocked Attempts</CardTitle>
                  <Shield className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">847</div>
                  <p className="text-xs text-success">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Activity className="h-4 w-4 text-success" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">98.5%</div>
                  <p className="text-xs text-muted-foreground">Uptime this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Zap className="w-5 h-5 text-primary" />
                    Real-time Threat Detection
                  </CardTitle>
                  <CardDescription>USSD code monitoring and call forwarding protection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">USSD Monitoring</span>
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Call Forward Detection</span>
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">SIM Swap Protection</span>
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Bell className="w-5 h-5 text-warning" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">Suspicious USSD Code</p>
                        <p className="text-xs text-muted-foreground">*21*+1234567890# blocked</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <Phone className="w-4 h-4 text-warning mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">Call Forward Attempt</p>
                        <p className="text-xs text-muted-foreground">Device: iPhone 14 Pro</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">Threat Neutralized</p>
                        <p className="text-xs text-muted-foreground">Malicious code blocked</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Eye className="w-5 h-5 text-primary" />
                        USSD Monitoring Status
                      </CardTitle>
                      <CardDescription>Real-time protection system overview</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMonitoring(!isMonitoring)}
                      className={isMonitoring ? "text-success" : "text-muted-foreground"}
                    >
                      {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isMonitoring ? "Active" : "Paused"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Monitoring Service</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsMonitoring(!isMonitoring)}
                      className={isMonitoring ? "text-success" : "text-muted-foreground"}
                    >
                      {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isMonitoring ? "Active" : "Paused"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-foreground">USSD Detection</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Online</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-foreground">Call Forward Protection</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-foreground">Threat Analysis</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Running</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Shield className="w-5 h-5 text-primary" />
                    Known Threats
                  </CardTitle>
                  <CardDescription>USSD code threat database</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <span className="font-mono text-sm">*21*</span>
                      <div className="text-right">
                        <Badge variant="destructive" className="text-xs">
                          Critical
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Call Forward</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                      <span className="font-mono text-sm">*67*</span>
                      <div className="text-right">
                        <Badge variant="destructive" className="text-xs">
                          Critical
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Conditional Forward</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-warning/5 border border-warning/20 rounded-lg">
                      <span className="font-mono text-sm">*#21#</span>
                      <div className="text-right">
                        <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">Medium</Badge>
                        <p className="text-xs text-muted-foreground mt-1">Check Status</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-success/5 border border-success/20 rounded-lg">
                      <span className="font-mono text-sm">*#06#</span>
                      <div className="text-right">
                        <Badge className="bg-success/10 text-success border-success/20 text-xs">Safe</Badge>
                        <p className="text-xs text-muted-foreground mt-1">IMEI Check</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-foreground">Database Status</p>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-xs text-success">Updated 2 hours ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">1,247 known threat patterns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Protected Devices</CardTitle>
                <CardDescription>Manage devices under CallSecure protection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "iPhone 14 Pro", status: "Protected", lastSeen: "2 minutes ago" },
                    { name: "Samsung Galaxy S23", status: "Protected", lastSeen: "5 minutes ago" },
                    { name: "Google Pixel 7", status: "Warning", lastSeen: "1 hour ago" },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{device.name}</p>
                          <p className="text-sm text-muted-foreground">Last seen: {device.lastSeen}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          device.status === "Protected"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {device.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Security Alerts</CardTitle>
                <CardDescription>Complete history of security events and responses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Critical",
                      message: "Unauthorized call forwarding attempt blocked",
                      time: "2 minutes ago",
                      icon: AlertTriangle,
                      color: "destructive",
                    },
                    {
                      type: "Warning",
                      message: "Suspicious USSD code detected and neutralized",
                      time: "15 minutes ago",
                      icon: Shield,
                      color: "warning",
                    },
                    {
                      type: "Info",
                      message: "Device security scan completed successfully",
                      time: "1 hour ago",
                      icon: CheckCircle,
                      color: "success",
                    },
                  ].map((alert, index) => {
                    const IconComponent = alert.icon
                    return (
                      <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        <IconComponent
                          className={`w-5 h-5 mt-0.5 ${
                            alert.color === "destructive"
                              ? "text-destructive"
                              : alert.color === "warning"
                                ? "text-warning"
                                : "text-success"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant={alert.color === "destructive" ? "destructive" : "outline"}
                              className={
                                alert.color === "warning"
                                  ? "bg-warning/10 text-warning border-warning/20"
                                  : alert.color === "success"
                                    ? "bg-success/10 text-success border-success/20"
                                    : ""
                              }
                            >
                              {alert.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-sm text-foreground">{alert.message}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
