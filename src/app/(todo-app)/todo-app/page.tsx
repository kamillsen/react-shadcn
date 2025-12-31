// src/app/(todo-app)/todo-app/page.tsx
export default function TodoAppPage() {
  return (
    <div className="space-y-6">
      {/* Başlık ve açıklama */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Todo Uygulaması</h1>
        <p className="text-muted-foreground">
          React hook'larını öğrendiğin todo uygulaması. Görevlerini yönet, temayı değiştir, istatistiklere bak!
        </p>
      </div>

      {/* Todo uygulaması içeriği - Daha sonra bileşenlerle dolduracağız */}
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">
          Todo uygulaması burada görünecek. Bileşenleri adım adım ekleyeceğiz.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          📝 useState, useEffect, useContext, useCallback, useMemo hook'larını kullanacağız.
        </p>
      </div>
    </div>
  );
}