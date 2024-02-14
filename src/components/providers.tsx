'use client'

import { PrimeReactProvider } from 'primereact/api'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({
  children,
}: ProvidersProps) {
  return <PrimeReactProvider>{children}</PrimeReactProvider>
}
