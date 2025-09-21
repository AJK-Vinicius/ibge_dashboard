"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

// Tipos para o estado global
export interface AppState {
  currentPage: string
  loading: boolean
  error: string | null
}

// Ações para o reducer
export type AppAction = 
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

// Estado inicial
const initialState: AppState = {
  currentPage: 'home',
  loading: false,
  error: null
}

// Reducer para gerenciar estado
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook customizado para usar o contexto
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider')
  }
  return context
}

// Hooks específicos para ações comuns
export function useNavigation() {
  const { dispatch } = useApp()
  
  return {
    navigateTo: (page: string) => dispatch({ type: 'SET_PAGE', payload: page }),
    goHome: () => dispatch({ type: 'SET_PAGE', payload: 'home' }),
    goToIPCA: () => dispatch({ type: 'SET_PAGE', payload: 'ipca' }),
    goToIndicators: () => dispatch({ type: 'SET_PAGE', payload: 'indicators' })
  }
}

export function useAppLoading() {
  const { state, dispatch } = useApp()
  
  return {
    loading: state.loading,
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading })
  }
}

export function useAppError() {
  const { state, dispatch } = useApp()
  
  return {
    error: state.error,
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    clearError: () => dispatch({ type: 'SET_ERROR', payload: null })
  }
}
