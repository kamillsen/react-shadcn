// src/app/(todo-app)/todo-app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SiteHeader } from "@/components/shared/site-header";

export default function TodoAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sol Sidebar - Mevcut sidebar'ı kullanıyoruz */}
        <AppSidebar />
        
        {/* Ana içerik alanı */}
        <div className="flex flex-1 flex-col">
          {/* Header - Mevcut header'ı kullanıyoruz */}
          <SiteHeader />
          
          {/* Todo uygulaması içeriği */}
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}