"use client"

export default function SubTitle(props: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 scroll-m-20 text-2xl font-light tracking-tight md:text-3xl">
      {props.children}
    </h2>
  )
}