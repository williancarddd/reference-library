'use client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

interface ProviderProps {
  children: React.ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
  const [client] = useState(new QueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
} 
