"use client"
import { FaBars, FaGithub } from "react-icons/fa6";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-999 flex justify-between pe-6 ps-2 lg:ps-6">
      <div className="flex gap-0 justify-between items-center">
        <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden">
          <FaBars />
        </label>
        <Link
          className="text-xl"
          href="/"
        >
          <span>
            quantum-gates
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        {/* <Link className="btn btn-ghost" href="/docs/reference">Docs</Link> */}
        <a
          className="btn btn-ghost"
          href="https://github.com/masabando/quantum-gates">
          <FaGithub className="text-xl" />
        </a>
      </div>
    </div>
  )
}

