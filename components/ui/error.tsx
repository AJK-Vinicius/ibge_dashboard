"use client"

import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
  className?: string
  retryText?: string
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  className,
  retryText = 'Tentar Novamente'
}: ErrorDisplayProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Card className="max-w-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <div>
              <h3 className="font-semibold">Erro ao carregar dados</h3>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
            {onRetry && (
              <Button onClick={onRetry} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                {retryText}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ErrorPageProps {
  error: string
  onRetry?: () => void
}

export function ErrorPage({ error, onRetry }: ErrorPageProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <ErrorDisplay error={error} onRetry={onRetry} />
    </div>
  )
}
