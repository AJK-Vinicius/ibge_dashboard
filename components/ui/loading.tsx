"use client"

import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
}

export function LoadingSpinner({ 
  size = 'md', 
  className, 
  text 
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}

interface LoadingCardProps {
  className?: string
  text?: string
}

export function LoadingCard({ className, text = 'Carregando...' }: LoadingCardProps) {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

interface LoadingPageProps {
  text?: string
}

export function LoadingPage({ text = 'Carregando dados do IBGE...' }: LoadingPageProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <LoadingCard text={text} />
    </div>
  )
}
