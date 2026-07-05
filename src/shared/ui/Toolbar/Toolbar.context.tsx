import { createContext, ReactNode, useContext, useMemo } from 'react'
import { ToolbarProperties } from './Toolbar.types'

export interface ToolbarContextProviderProps extends Partial<ToolbarProperties> {
  children: ReactNode
}

const defaultProperties: ToolbarProperties = { variant: 'floating', color: 'standard' }

export const ToolbarContext = createContext<ToolbarProperties>(defaultProperties)

export const ToolbarProvider = ({ children, color, variant }: ToolbarContextProviderProps) => {
  const contextValue = useMemo(() => ({ ...defaultProperties, color, variant }), [color, variant])

  return <ToolbarContext.Provider value={contextValue as ToolbarProperties}>{children}</ToolbarContext.Provider>
}

export const useToolbarContext = () => {
  const context = useContext(ToolbarContext)
  if (!context) throw new Error("useToolbarContext should be called inside toolbar's children only")
  return useContext(ToolbarContext)
}
