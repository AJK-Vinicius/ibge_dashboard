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
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Dados IBGE</h1>
          <p className="text-muted-foreground">
            Dashboard com dados econômicos do Instituto Brasileiro de Geografia e Estatística
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="IPCA - Inflação"
            description="Índice de preços ao consumidor"
            value={ipcaCount > 0 ? `${ipcaCount} registros` : "Sem dados"}
            subtitle="Disponíveis"
            icon={<TrendingUp className="w-5 h-5 text-primary" />}
            onClick={goToIPCA}
          />

          <StatCard
            title="Indicadores Econômicos"
            description="Principais métricas econômicas"
            value={indicatorsCount}
            subtitle="Indicadores"
            icon={<BarChart3 className="w-5 h-5 text-primary" />}
            onClick={goToIndicators}
          />
        </div>
      </div>
    </div>
  )
}
