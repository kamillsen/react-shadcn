import type { ReactNode } from "react"

import { AppSidebar } from "@/components/shared/app-sidebar"
import { SiteHeader } from "@/components/shared/site-header"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function LearnLayout({ children }: { children: ReactNode} ) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* SiteHeader içinde SidebarTrigger varsa artık güvenli */}
        <SiteHeader />

        <main className="p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
