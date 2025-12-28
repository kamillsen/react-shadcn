import Link from "next/link"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"

export default function StateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">State Lab</h1>
        <Link href="/learn">
          <Button variant="secondary">← Learn</Button>
        </Link>
      </header>

      <nav className="flex flex-wrap gap-2">
        <Link href="/learn/state/basic"><Button variant="outline">Basic</Button></Link>
        <Link href="/learn/state/objects-arrays"><Button variant="outline">Objects/Arrays</Button></Link>
        <Link href="/learn/state/lifting"><Button variant="outline">Lifting</Button></Link>
      </nav>

      <section>{children}</section>
    </div>
  )
}
