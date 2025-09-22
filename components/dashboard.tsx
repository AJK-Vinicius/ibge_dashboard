"use client"

import React from 'react'
import { useApp } from '@/contexts/app-context'
import { Sidebar } from '@/components/sidebar'
import { HomePage } from '@/components/pages/home-page'
import { IPCAPage } from '@/components/pages/ipca-page'
import { EconomicIndicatorsPage } from '@/components/pages/economic-indicators-page'

export function Dashboard() {
  const { state } = useApp()

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home':
        return <HomePage />
      case 'ipca':
        return <IPCAPage />
      case 'indicators':
        return <EconomicIndicatorsPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto" role="main">
        {renderPage()}
      </main>
    </div>
  )
}
