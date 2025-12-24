"use client"

export default function Keyword(props: { children?: React.ReactNode}) {
  return (
    <span className="px-1.5 font-bold text-accent">
      {props.children}
    </span>
  )
}