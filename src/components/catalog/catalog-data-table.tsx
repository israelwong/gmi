"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product, ProductCategory } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/types/product";
import { cn } from "@/lib/utils";

const PAGE_SIZES = [10, 20, 50] as const;

type CatalogDataTableProps = {
  data: Product[];
};

export function CatalogDataTable({ data }: CatalogDataTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<
    "all" | ProductCategory
  >("all");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filtered = React.useMemo(() => {
    const q = globalFilter.trim().toLowerCase();
    return data.filter((row) => {
      const catOk =
        categoryFilter === "all" || row.category === categoryFilter;
      const searchOk =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.sku.toLowerCase().includes(q);
      return catOk && searchOk;
    });
  }, [data, globalFilter, categoryFilter]);

  React.useEffect(() => {
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  }, [globalFilter, categoryFilter]);

  const catalogRootRef = React.useRef<HTMLDivElement>(null);
  const skipInitialScrollRef = React.useRef(true);

  React.useEffect(() => {
    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      return;
    }
    catalogRootRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pagination.pageIndex, pagination.pageSize, categoryFilter]);

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "sku",
        header: "Clave / SKU",
        cell: ({ row }) => (
          <span className="font-mono text-[13px] tracking-tight text-foreground">
            {row.original.sku}
          </span>
        ),
      },
      {
        accessorKey: "name",
        header: "Nombre del producto",
        cell: ({ row }) => (
          <span className="font-medium leading-snug text-foreground">
            {row.original.name}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Categoría",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.category}</span>
        ),
      },
      {
        id: "actions",
        header: () => (
          <span className="flex w-full justify-end pr-1 text-primary-foreground">
            Acciones
          </span>
        ),
        cell: ({ row }) => {
          const p = row.original;
          const contactHref = `/contacto?solicitud=${encodeURIComponent(p.sku)}&producto=${encodeURIComponent(p.name)}`;
          return (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button asChild variant="outline" size="sm" className="h-8">
                <Link href={`/productos?ref=${encodeURIComponent(p.sku)}`}>
                  Ver ficha
                </Link>
              </Button>
              <Button asChild size="sm" className="h-8">
                <Link href={contactHref}>Solicitar info</Link>
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  /* TanStack Table: el hook expone funciones; el aviso del compilador de React no aplica a nuestro uso controlado. */
  // eslint-disable-next-line react-hooks/incompatible-library -- useReactTable es el API oficial de @tanstack/react-table
  const table = useReactTable({
    data: filtered,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const pageCount = table.getPageCount();
  const from =
    filtered.length === 0
      ? 0
      : pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    filtered.length,
  );

  return (
    <div
      ref={catalogRootRef}
      className="space-y-4 scroll-mt-24"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:items-end md:gap-x-8 lg:gap-x-10">
        <div className="relative min-w-0 md:max-w-none">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar por nombre o SKU…"
            className="h-10 border-border bg-background pl-9 shadow-sm"
            aria-label="Buscar en el directorio"
          />
        </div>

        <div className="min-w-0 md:max-w-none">
          <label htmlFor="catalog-category" className="sr-only">
            Filtrar listado
          </label>
          <select
            id="catalog-category"
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value as "all" | ProductCategory)
            }
            className={cn(
              "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
            )}
          >
            <option value="all">Todas las categorías</option>
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-border/0 bg-primary hover:bg-primary"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-primary-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/55">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No hay resultados para los filtros actuales.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length === 0 ? (
            "0 registros"
          ) : (
            <>
              Mostrando{" "}
              <span className="font-mono font-medium text-foreground">
                {from}
              </span>
              –
              <span className="font-mono font-medium text-foreground">
                {to}
              </span>{" "}
              de{" "}
              <span className="font-mono font-medium text-foreground">
                {filtered.length}
              </span>
            </>
          )}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="page-size"
              className="text-xs font-medium text-muted-foreground"
            >
              Por página
            </label>
            <select
              id="page-size"
              value={pagination.pageSize}
              onChange={(e) => {
                const next = Number(e.target.value);
                setPagination({ pageIndex: 0, pageSize: next });
              }}
              className={cn(
                "h-9 rounded-md border border-border bg-background px-2 text-sm shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35",
              )}
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[120px] text-center text-sm tabular-nums text-muted-foreground">
              Página{" "}
              <span className="font-mono font-medium text-foreground">
                {pageCount === 0 ? 0 : pagination.pageIndex + 1}
              </span>{" "}
              /{" "}
              <span className="font-mono font-medium text-foreground">
                {Math.max(1, pageCount)}
              </span>
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
