"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Todo = { id: number; text: string }

export default function ObjectsArraysExample() {
  const [profile, setProfile] = useState({ city: "İstanbul", job: "Frontend" }) 
  const [todos, setTodos] = useState<Todo[]>([{ id: 1, text: "useState çalış" }]) // üstte type tanımlandı
  const [text, setText] = useState("") 

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Objects / Arrays</CardTitle>
        <CardDescription>Mutate yok: kopya + set</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="font-medium">Profile</div>
          <div className="text-sm text-muted-foreground">
            {profile.city} • {profile.job}
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setProfile((p) => ({ ...p, city: "Ankara" }))}
            >
              City=Ankara
            </Button>
            <Button
              variant="secondary"
              onClick={() => setProfile((p) => ({ ...p, job: "Fullstack" }))}
            >
              Job=Fullstack
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="font-medium">Todos</div>

          <div className="flex gap-2">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Yeni todo" />
            <Button
              onClick={() => {
                if (!text.trim()) return
                setTodos((t) => [...t, { id: Date.now(), text }])
                setText("")
              }}
            >
              Ekle
            </Button>
          </div>

          <div className="space-y-2">
            {todos.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>{t.text}</div>
                <Button
                  variant="outline"
                  onClick={() => setTodos((all) => all.filter((x) => x.id !== t.id))}
                >  
                  Sil
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
