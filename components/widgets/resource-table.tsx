"use client"

import { useMemo, useState } from "react"

type Row = Record<string, any>

export function ResourceTable({
  rows,
  columns,
  pageSize = 10,
}: { rows: Row[]; columns: { key: string; label: string }[]; pageSize?: number }) {
  const [sortKey, setSortKey] = useState<string>(columns[0]?.key)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    const r = [...rows]
    r.sort((a, b) => {
      const A = a[sortKey]
      const B = b[sortKey]
      if (A == null) return 1
      if (B == null) return -1
      if (A < B) return sortDir === "asc" ? -1 : 1
      if (A > B) return sortDir === "asc" ? 1 : -1
      return 0
    })
    return r
  }, [rows, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="text-left px-3 py-2 cursor-pointer"
                onClick={() => {
                  if (sortKey === c.key) setSortDir(sortDir === "asc" ? "desc" : "asc")
                  setSortKey(c.key)
                }}
              >
                {c.label}
                {sortKey === c.key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.map((r, idx) => (
            <tr key={idx} className="odd:bg-card">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2">
                  {String(r[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between p-2">
        <span className="text-xs text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
