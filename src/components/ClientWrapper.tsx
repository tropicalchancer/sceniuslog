"use client"

import dynamic from 'next/dynamic'

const DynamicScene = dynamic(
  () => import('./Scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-gray-800" />
    ),
  }
)

export function ClientWrapper() {
  return <DynamicScene />
} 