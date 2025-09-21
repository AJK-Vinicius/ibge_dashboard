"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  description: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  onClick?: () => void
  className?: string
}

export function StatCard({ 
  title, 
  description, 
  value, 
  subtitle, 
  icon, 
  onClick,
  className 
}: StatCardProps) {
  const CardComponent = onClick ? 'button' : 'div'
  
  return (
    <Card 
      as={CardComponent}
      className={cn(
        'transition-shadow',
        onClick && 'cursor-pointer hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {onClick && <ArrowRight className="w-5 h-5 text-muted-foreground" />}
        </div>
      </CardContent>
    </Card>
  )
}

interface IndicatorCardProps {
  id: string
  name: string
  agregadosCount: number
  agregados: Array<{ id: number; nome: string }>
  icon: React.ReactNode
  color: string
  onDetailsClick?: () => void
  className?: string
}

export function IndicatorCard({
  id,
  name,
  agregadosCount,
  agregados,
  icon,
  color,
  onDetailsClick,
  className
}: IndicatorCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <span className={color}>{icon}</span>
          {name}
        </CardTitle>
        <CardDescription className="text-sm">
          ID: {id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Agregados:</span>
            <Badge variant="secondary">{agregadosCount}</Badge>
          </div>
          
          {agregados.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Principais séries:</h4>
              <div className="space-y-1">
                {agregados.slice(0, 3).map((agregado, index) => (
                  <div key={index} className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    <div className="font-medium">{agregado.nome}</div>
                    <div className="text-xs opacity-75">ID: {agregado.id}</div>
                  </div>
                ))}
                {agregados.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{agregados.length - 3} séries adicionais
                  </div>
                )}
              </div>
            </div>
          )}

          {onDetailsClick && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={onDetailsClick}
              >
                Ver Detalhes
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface IPCAItemCardProps {
  name: string
  value: string
  period: string
  className?: string
}

export function IPCAItemCard({ name, value, period, className }: IPCAItemCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{value}%</span>
          <Badge variant="outline">{period}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
