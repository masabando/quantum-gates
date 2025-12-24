"use cilent"

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
        <a className="link link-hover">Getting Started</a>
        <a className="link link-hover">Reference</a>
      </nav>
      <nav>
        <h6 className="footer-title">More</h6>
        <a className="link link-hover">GitHub</a>
        <a className="link link-hover">Quant. Inf. Lab.</a>
      </nav>
    </footer>
  )
}