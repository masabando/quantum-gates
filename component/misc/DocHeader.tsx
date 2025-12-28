"use client"

export function DocH2({ children }: { children?: React.ReactNode } = {}) {
  return (
    <h2 className="text-2xl font-bold mt-20 mb-4 text-accent">{children}</h2>
  )
}

export function DocH4({ children }: { children?: React.ReactNode } = {}) {
  return (
    <h4 className="text-lg font-bold mt-6 mb-4">{children}</h4>
  )
}
