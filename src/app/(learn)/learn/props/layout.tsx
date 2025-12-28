import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

export default function PropsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Props Lab</h1>
        <Link href="/learn">
          <Button variant="secondary">← Learn</Button>
        </Link>
      </header>

      <nav className="flex flex-wrap gap-2">
        <Link href="/learn/props/basic"><Button variant="outline">Basic</Button></Link>
        <Link href="/learn/props/children"><Button variant="outline">children</Button></Link>
        <Link href="/learn/props/callback"><Button variant="outline">callback</Button></Link>
      </nav>

      <div>{children}</div>
    </div>
  )
}
