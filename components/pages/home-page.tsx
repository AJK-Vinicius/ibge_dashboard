"use client"

import React from 'react'
import { TrendingUp, BarChart3 } from 'lucide-react'
import { useAppStats } from '@/hooks/use-ibge-data'
import { useNavigation } from '@/contexts/app-context'
import { StatCard } from '@/components/ui/cards'
import { LoadingPage } from '@/components/ui/loading'
import { ErrorPage } from '@/components/ui/error'

export function HomePage() {
  const { ipcaCount, indicatorsCount, loading, hasData } = useAppStats()
  const { goToIPCA, goToIndicators } = useNavigation()

  if (loading) {
    return <LoadingPage text="Carregando dados do IBGE..." />
  }

  if (!hasData) {
    return <ErrorPage error="Nenhum dado disponível" />
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2">Dados IBGE</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Dashboard com dados econômicos do Instituto Brasileiro de Geografia e Estatística
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8" aria-label="Estatísticas principais">
          <StatCard
            title="IPCA - Inflação"
            description="Índice de preços ao consumidor"
            value={ipcaCount > 0 ? `${ipcaCount} registros` : "Sem dados"}
            subtitle="Disponíveis"
            icon={<TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />}
            onClick={goToIPCA}
          />

          <StatCard
            title="Indicadores Econômicos"
            description="Principais métricas econômicas"
            value={indicatorsCount}
            subtitle="Indicadores"
            icon={<BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />}
            onClick={goToIndicators}
          />
        </section>
      </div>
    </div>
  )
}
