"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import { IPCAChart } from "@/components/ipca-chart"
import { DataTable } from "@/components/data-table"
import { useFilteredIPCAData, useIPCAFilters } from "@/hooks/use-ibge-data"
import { LoadingPage } from "@/components/ui/loading"
import { ErrorPage } from "@/components/ui/error"
import { IPCAFilters, FilterBadges } from "@/components/ui/filters"
import { IPCAItemCard } from "@/components/ui/cards"

export function IPCAPage() {
  const { filteredData, generalData, groupData, loading, error } = useFilteredIPCAData()
  const { selectedMonth, selectedGroup, setMonth, setGroup } = useIPCAFilters()

  if (loading) {
    return <LoadingPage text="Carregando dados do IPCA..." />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  const activeFilters = [
    { key: 'month', value: selectedMonth, label: selectedMonth },
    ...(selectedGroup !== 'all' ? [{ key: 'group', value: selectedGroup, label: selectedGroup }] : [])
  ]

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">IPCA - Índice de Preços ao Consumidor Amplo</h1>
          <p className="text-muted-foreground">Dados detalhados de inflação por grupo de produtos e serviços - Ano 2019</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">Dados SIDRA/IBGE</Badge>
            <Badge variant="outline">{filteredData.length} registros carregados</Badge>
          </div>
          
          <div className="mt-6">
            <IPCAFilters
              selectedMonth={selectedMonth}
              selectedGroup={selectedGroup}
              onMonthChange={setMonth}
              onGroupChange={setGroup}
            />
          </div>
        </div>

        {filteredData.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                IPCA por Grupos de Produtos
                <FilterBadges filters={activeFilters} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupData
                  .filter(item => {
                    if (selectedGroup !== 'all') {
                      if (selectedGroup === 'Índice geral') {
                        return item.D4N === 'Índice geral'
                      } else {
                        return item.D4N.includes(selectedGroup)
                      }
                    }
                    return item.D4N !== 'Índice geral'
                  })
                  .filter(item => item.D3N.toLowerCase().includes(selectedMonth.toLowerCase()))
                  .slice(0, 9)
                  .map((item, index) => (
                    <IPCAItemCard
                      key={index}
                      name={item.D4N}
                      value={item.V}
                      period={item.D3N}
                    />
                  ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dados Detalhados</CardTitle>
                <CardDescription>
                  Tabela com dados do IPCA por grupos de produtos
                  {selectedMonth}
                  {selectedGroup !== 'all' && ` - ${selectedGroup}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData} />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}