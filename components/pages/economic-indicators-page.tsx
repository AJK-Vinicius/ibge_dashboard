"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, TrendingUp, Factory, ShoppingCart, Building, Wrench } from 'lucide-react'
import { useEconomicIndicators } from '@/hooks/use-ibge-data'
import { LoadingPage } from '@/components/ui/loading'
import { ErrorPage } from '@/components/ui/error'
import { IndicatorCard } from '@/components/ui/cards'

const getIndicatorIcon = (id: string) => {
  switch (id) {
    case 'IR': return <Factory className="w-5 h-5" />
    case 'PC': return <TrendingUp className="w-5 h-5" />
    case 'IA': return <TrendingUp className="w-5 h-5" />
    case 'IQ': return <TrendingUp className="w-5 h-5" />
    case 'LA': return <BarChart3 className="w-5 h-5" />
    case 'PZ': return <Factory className="w-5 h-5" />
    case 'MC': return <ShoppingCart className="w-5 h-5" />
    case 'SC': return <Building className="w-5 h-5" />
    case 'SI': return <Wrench className="w-5 h-5" />
    default: return <BarChart3 className="w-5 h-5" />
  }
}

const getIndicatorColor = (id: string) => {
  switch (id) {
    case 'IR': return 'text-blue-600'
    case 'PC': return 'text-green-600'
    case 'IA': return 'text-green-600'
    case 'IQ': return 'text-green-600'
    case 'LA': return 'text-orange-600'
    case 'PZ': return 'text-blue-600'
    case 'MC': return 'text-purple-600'
    case 'SC': return 'text-indigo-600'
    case 'SI': return 'text-gray-600'
    default: return 'text-gray-600'
  }
}

export function EconomicIndicatorsPage() {
  const { data: indicators, loading, error } = useEconomicIndicators()

  if (loading) {
    return <LoadingPage text="Carregando indicadores econômicos..." />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Indicadores Econômicos</h1>
          <p className="text-muted-foreground">Principais métricas econômicas do Brasil</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">Dados IBGE</Badge>
            <Badge variant="outline">{indicators.length} indicadores disponíveis</Badge>
          </div>
        </div>

        {/* Seção informativa */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Sobre os Indicadores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Estes são os principais indicadores econômicos do Brasil disponíveis.
                Cada indicador contém múltiplas séries de dados específicas que podem ser consultadas individualmente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Tipos de Indicadores:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>IR:</strong> Índice de Preços ao Produtor</li>
                    <li>• <strong>PC:</strong> INPC - Índice Nacional de Preços ao Consumidor</li>
                    <li>• <strong>IA:</strong> IPCA - Índice Nacional de Preços ao Consumidor Amplo</li>
                    <li>• <strong>IQ:</strong> IPCA15 - Índice Nacional de Preços ao Consumidor Amplo 15</li>
                    <li>• <strong>LA:</strong> Levantamento Sistemático da Produção Agrícola</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Pesquisas Mensais:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>PZ:</strong> Produção Física Industrial</li>
                    <li>• <strong>MC:</strong> Comércio</li>
                    <li>• <strong>SC:</strong> Serviços</li>
                    <li>• <strong>SI:</strong> Sistema Nacional de Pesquisa de Custos e Índices da Construção Civil</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {indicators.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {indicators.map((indicator) => (
              <IndicatorCard
                key={indicator.id}
                id={indicator.id}
                name={indicator.nome}
                agregadosCount={indicator.agregados.length}
                agregados={indicator.agregados}
                icon={getIndicatorIcon(indicator.id)}
                color={getIndicatorColor(indicator.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
