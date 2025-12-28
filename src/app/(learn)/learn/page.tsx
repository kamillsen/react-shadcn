import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const items = [
  { href: "/learn/components", title: "Component & JSX", desc: "Lego mantığı + JSX pratik" },
  { href: "/learn/props/basic", title: "Props", desc: "Yukarıdan aşağı veri akışı" },
  { href: "/learn/state/lifting", title: "State & Lifting", desc: "useState + state’i yukarı taşıma" },
]

export default function LearnHomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Learn</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((x) => (
          <Card key={x.href}>
            <CardHeader>
              <CardTitle>{x.title}</CardTitle>
              <CardDescription>{x.desc}</CardDescription>

              <Link href={x.href} className="mt-3 inline-block">
                <Button>Git</Button>
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
