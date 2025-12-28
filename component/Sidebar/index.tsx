"use client"
import Link from "next/link"
import { FaBookOpen, FaFileLines } from "react-icons/fa6"
import { usePathname } from "next/navigation"

function LinkItem({
  setSidebarChecked,
  href = "",
  children,
}: Readonly<{
  setSidebarChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  href?: string;
  children?: React.ReactNode;
}> = {}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={active ? "menu-active" : ""}
        onClick={() => {
          if (setSidebarChecked) {
            setSidebarChecked(false);
          }
        }}
      >{children}</Link>
    </li>
  )
}


export default function Sidebar({
  setSidebarChecked,
}: Readonly<{
  setSidebarChecked: React.Dispatch<React.SetStateAction<boolean>>;
}>) {

  return (
    <div className="drawer-side z-[1000] lg:z-[10] top-16 h-[calc(100vh-4rem)]">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar" className="drawer-overlay"></label>
      <div className="h-full overflow-y-auto">
        <ul
          className="menu w-80 pt-4 pb-20 pe-4 ps-0 bg-base-200 text-base-content min-h-full">
          <li>
            <details open>
              <summary className="font-bold">
                <FaBookOpen className="me-2 inline-block text-orange-500" />
                Getting Started
              </summary>
              <ul>
                <LinkItem
                  setSidebarChecked={setSidebarChecked}
                  href="/docs/introduction/">
                  Introduction</LinkItem>
                <LinkItem
                  href="/docs/install/"
                  setSidebarChecked={setSidebarChecked}
                >Install</LinkItem>
                <LinkItem
                  href="/docs/cdn/"
                  setSidebarChecked={setSidebarChecked}
                >CDN</LinkItem>
              </ul>
            </details>
          </li>
          <li>
            <details open>
              <summary>
                <FaFileLines className="me-2 inline-block text-green-500" />
                Reference
              </summary>
              <ul>
                <LinkItem
                  href="/docs/reference/complex/"
                  setSidebarChecked={setSidebarChecked}
                >Complex</LinkItem>
                <LinkItem
                  href="/docs/reference/constant/"
                  setSidebarChecked={setSidebarChecked}
                >Constant</LinkItem>
                <LinkItem
                  href="/docs/reference/cplist/"
                  setSidebarChecked={setSidebarChecked}
                >CPlist</LinkItem>
                <LinkItem
                  href="/docs/reference/qgate/"
                  setSidebarChecked={setSidebarChecked}
                >QGate</LinkItem>
                <LinkItem
                  href="/docs/reference/qmatrix/"
                  setSidebarChecked={setSidebarChecked}
                >QMatrix</LinkItem>
                <LinkItem
                  href="/docs/reference/qstate/"
                  setSidebarChecked={setSidebarChecked}
                >QState</LinkItem>
                <LinkItem
                  href="/docs/reference/qtool/"
                  setSidebarChecked={setSidebarChecked}
                >QTool</LinkItem>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}