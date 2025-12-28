"use client"

export default function Keyword({
  bold = false,
  children,
}: {
  bold?: boolean,
  children?: React.ReactNode
} = {}) {
  return (
    <span className={`px-1.5 ${bold ? "font-bold" : ""} text-accent`}>
      {children}
    </span>
  )
}