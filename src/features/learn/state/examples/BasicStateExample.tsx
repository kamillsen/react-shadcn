"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function BasicStateExample() {
  // React: state "remember" ettiği bilgi. useState ile eklenir. :contentReference[oaicite:3]{index=3}
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Basic State</CardTitle>
        <CardDescription>Counter + Controlled Input</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="font-medium">Count: {count}</div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setCount((c) => c - 1)}>-</Button>
            <Button onClick={() => setCount((c) => c + 1)}>+</Button>
            <Button variant="outline" onClick={() => setCount(0)}>Reset</Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">İsmini yaz:</div>
          <Input
            placeholder="Örn: Kaan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="text-sm">
            Merhaba, <b>{name || "..."}</b>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
