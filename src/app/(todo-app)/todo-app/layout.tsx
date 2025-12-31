// src/app/(todo-app)/todo-app/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SiteHeader } from "@/components/shared/site-header";
import { ThemeProvider } from "@/features/todo/context/ThemeContext";
import { TodoProvider } from "@/features/todo/context/TodoContext";

export default function TodoAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <TodoProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <SiteHeader />
              <main className="flex-1 p-6">
                <div className="mx-auto max-w-6xl">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}