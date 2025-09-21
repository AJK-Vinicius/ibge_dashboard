"use client"

import React from "react"
import { Home, BarChart3, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigation, useApp } from "@/contexts/app-context"

const menuItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: TrendingUp, label: "IPCA - Inflação", id: "ipca" },
  { icon: BarChart3, label: "Indicadores Econômicos", id: "indicators" },
]

export function Sidebar() {
  const { state } = useApp()
  const { navigateTo } = useNavigation()

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg">IBGE</h1>
            <p className="text-xs text-sidebar-foreground/70">Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = state.currentPage === item.id
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => navigateTo(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-sidebar-primary rounded-full" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}