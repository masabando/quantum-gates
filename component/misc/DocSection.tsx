"use client"

export default function DocSection({
  title,
  children
}: {
  title?: string,
  children?: React.ReactNode
} = {}) {
  return (
    <section className="mb-16">
      {title && <h3 className="text-xl font-bold mb-4 border-b border-accent">{title}</h3>}
      {children}
    </section>
  )
}
