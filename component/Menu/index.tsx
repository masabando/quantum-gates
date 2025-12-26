"use client"
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10 flex justify-between px-6">
      <Link className="btn btn-ghost text-xl" href="/">quantum-gates</Link>
      <div className="flex items-center">
        <Link className="btn btn-ghost" href="/docs">Docs</Link>
        <a
          className="btn btn-ghost"
          href="https://github.com/masabando/quantum-gates">
          <FaGithub className="text-xl" />
        </a>
      </div>
    </div>
  )
}

