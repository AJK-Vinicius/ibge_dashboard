"use client"

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface FilterSelectProps {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
  className?: string
}

export function FilterSelect({ 
  label, 
  value, 
  options, 
  onChange, 
  className 
}: FilterSelectProps) {
  return (
    <div className={className}>
      <label className="text-sm font-medium mb-2 block">{label}:</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-background"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface FilterBadgesProps {
  filters: Array<{ key: string; value: string; label: string }>
  onRemove?: (key: string) => void
  className?: string
}

export function FilterBadges({ filters, onRemove, className }: FilterBadgesProps) {
  if (filters.length === 0) return null

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {filters.map((filter) => (
        <Badge 
          key={filter.key} 
          variant="secondary" 
          className="flex items-center gap-1"
        >
          {filter.label}
          {onRemove && (
            <button
              onClick={() => onRemove(filter.key)}
              className="ml-1 hover:text-destructive"
            >
              ×
            </button>
          )}
        </Badge>
      ))}
    </div>
  )
}

interface IPCAFiltersProps {
  selectedMonth: string
  selectedGroup: string
  onMonthChange: (month: string) => void
  onGroupChange: (group: string) => void
  className?: string
}

const MONTHS = [
  { value: 'janeiro', label: 'Janeiro' },
  { value: 'fevereiro', label: 'Fevereiro' },
  { value: 'março', label: 'Março' },
  { value: 'abril', label: 'Abril' },
  { value: 'maio', label: 'Maio' },
  { value: 'junho', label: 'Junho' },
  { value: 'julho', label: 'Julho' },
  { value: 'agosto', label: 'Agosto' },
  { value: 'setembro', label: 'Setembro' },
  { value: 'outubro', label: 'Outubro' },
  { value: 'novembro', label: 'Novembro' },
  { value: 'dezembro', label: 'Dezembro' }
]

const GROUPS = [
  { value: 'all', label: 'Todos os grupos' },
  { value: 'Índice geral', label: 'Índice Geral' },
  { value: 'Alimentação', label: 'Alimentação e Bebidas' },
  { value: 'Habitação', label: 'Habitação' },
  { value: 'Artigos', label: 'Artigos de Residência' },
  { value: 'Vestuário', label: 'Vestuário' },
  { value: 'Transportes', label: 'Transportes' },
  { value: 'Saúde', label: 'Saúde e Cuidados Pessoais' },
  { value: 'Despesas', label: 'Despesas Pessoais' },
  { value: 'Educação', label: 'Educação' },
  { value: 'Comunicação', label: 'Comunicação' }
]

export function IPCAFilters({ 
  selectedMonth, 
  selectedGroup, 
  onMonthChange, 
  onGroupChange,
  className 
}: IPCAFiltersProps) {
  const activeFilters = [
    { key: 'month', value: selectedMonth, label: selectedMonth },
    ...(selectedGroup !== 'all' ? [{ key: 'group', value: selectedGroup, label: selectedGroup }] : [])
  ]

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FilterSelect
          label="Filtrar por Mês"
          value={selectedMonth}
          options={MONTHS}
          onChange={onMonthChange}
        />
        
        <FilterSelect
          label="Filtrar por Grupo"
          value={selectedGroup}
          options={GROUPS}
          onChange={onGroupChange}
        />
      </div>
      
      <FilterBadges filters={activeFilters} />
    </div>
  )
}
