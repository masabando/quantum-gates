"use cilent"
import Link from "next/link"

export default function Footer() {

  return (
    <footer className="footer sm:footer-horizontal bg-base-200 text-base-content px-10 pt-10 pb-30">
      <aside>
        <div className="font-bold text-xl text-accent">
          quantum-gates
        </div>
        <p>
          masabando
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Docs</h6>
        <Link className="link link-hover" href="/docs/introduction/">Introduction</Link>
        <Link className="link link-hover" href="/docs/install/">Installation</Link>
        <Link className="link link-hover" href="/docs/cdn/">CDN</Link>
        <Link className="link link-hover" href="/docs/reference">Reference (to be added)</Link>
      </nav>
      <nav>
        <h6 className="footer-title">More</h6>
        <a className="link link-hover" href="https://github.com/masabando/quantum-gates">GitHub</a>
        <a className="link link-hover" href="https://alice.helixcode.net/~bando/Lab/">Quant. Inf. Lab.</a>
      </nav>
    </footer>
  )
}