"use client"

import { useState, useEffect, useCallback } from 'react'
import { fetchIPCAData, fetchEconomicIndicators, type IPCAData, type EconomicIndicator } from '@/lib/ibge-api'

// Hook para dados do IPCA
export function useIPCAData() {
  const [data, setData] = useState<IPCAData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const ipcaData = await fetchIPCAData()
      setData(ipcaData)
    } catch (err) {
      console.error('Error loading IPCA data:', err)
      setError('Erro ao carregar dados do IPCA. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    data,
    loading,
    error,
    refetch: loadData
  }
}

// Hook para indicadores econômicos
export function useEconomicIndicators() {
  const [data, setData] = useState<EconomicIndicator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const indicators = await fetchEconomicIndicators()
      setData(indicators)
    } catch (err) {
      console.error('Error loading Economic Indicators:', err)
      setError('Erro ao carregar indicadores econômicos. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  return {
    data,
    loading,
    error,
    refetch: loadData
  }
}

// Hook para filtros do IPCA
export function useIPCAFilters() {
  const [selectedMonth, setSelectedMonth] = useState<string>('janeiro')
  const [selectedGroup, setSelectedGroup] = useState<string>('all')

  const resetFilters = useCallback(() => {
    setSelectedMonth('janeiro')
    setSelectedGroup('all')
  }, [])

  const setMonth = useCallback((month: string) => {
    setSelectedMonth(month)
  }, [])

  const setGroup = useCallback((group: string) => {
    setSelectedGroup(group)
  }, [])

  return {
    selectedMonth,
    selectedGroup,
    setMonth,
    setGroup,
    resetFilters
  }
}

// Hook para dados filtrados do IPCA
export function useFilteredIPCAData() {
  const { data: ipcaData, loading, error } = useIPCAData()
  const { selectedMonth, selectedGroup } = useIPCAFilters()

  const filteredData = useCallback(() => {
    if (!ipcaData.length) return []

    return ipcaData.filter(item => {
      // Filtro por grupo
      let groupMatch = true
      if (selectedGroup !== 'all') {
        if (selectedGroup === 'Índice geral') {
          groupMatch = item.D4N === 'Índice geral'
        } else {
          groupMatch = item.D4N.includes(selectedGroup)
        }
      }

      // Filtro por mês
      const monthMatch = item.D3N.toLowerCase().includes(selectedMonth.toLowerCase())

      return groupMatch && monthMatch
    })
  }, [ipcaData, selectedMonth, selectedGroup])

  const generalIPCAData = useCallback(() => {
    return ipcaData.filter(item => item.D4N === 'Índice geral')
  }, [ipcaData])

  const groupIPCAData = useCallback(() => {
    return ipcaData.filter(item => item.D4N !== 'Índice geral')
  }, [ipcaData])

  return {
    allData: ipcaData,
    filteredData: filteredData(),
    generalData: generalIPCAData(),
    groupData: groupIPCAData(),
    loading,
    error
  }
}

// Hook para estatísticas gerais
export function useAppStats() {
  const { data: ipcaData, loading: ipcaLoading } = useIPCAData()
  const { data: indicatorsData, loading: indicatorsLoading } = useEconomicIndicators()

  return {
    ipcaCount: ipcaData.length,
    indicatorsCount: indicatorsData.length,
    loading: ipcaLoading || indicatorsLoading,
    hasData: ipcaData.length > 0 || indicatorsData.length > 0
  }
}
