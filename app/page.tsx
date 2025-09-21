"use client"

import React from "react"
import { AppProvider } from "@/contexts/app-context"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )
}
