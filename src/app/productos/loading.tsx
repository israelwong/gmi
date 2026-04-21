import { SectionLayout } from "@/components/layout/section-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductosLoading() {
  return (
    <SectionLayout
      eyebrow="Catálogo técnico"
      title="Productos y sistemas"
      subtitle="Cargando fichas de producto…"
    >
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-md" />
          ))}
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <li
              key={i}
              className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
            >
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="space-y-3 p-6">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-24 rounded-md" />
                  <Skeleton className="h-4 flex-1 rounded-md" />
                </div>
                <Skeleton className="h-6 w-[88%] rounded-md" />
                <Skeleton className="h-20 w-full rounded-md" />
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionLayout>
  );
}
