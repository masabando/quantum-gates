"use client"

export default function DocTitle(props: { children: React.ReactNode }) {
  return (
    <h1 className="mt-6 mb-8 scroll-m-10 text-4xl font-bold tracking-tight">
      {props.children}
    </h1>
  )
}