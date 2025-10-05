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
    <div className="card border-[var(--color-divider)] rounded-xl overflow-hidden shadow-neon">
      <table className="w-full text-sm">
        <thead className="bg-[var(--color-neutral-gray)]">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className="text-left px-4 py-3 cursor-pointer font-heading text-[var(--color-accent-pink)] border-b border-[var(--color-divider)] hover:text-[var(--color-accent-green)] transition-colors"
                onClick={() => {
                  if (sortKey === c.key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
                  setSortKey(c.key)
                }}
              >
                {c.label}
                {sortKey === c.key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paged.map((r, idx) => (
            <tr key={idx} className="odd:bg-[var(--color-divider)] even:bg-[var(--color-neutral-gray)] hover:bg-[var(--color-accent-pink)]/10 transition-colors">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-[var(--color-text-primary)]">
                  {String(r[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between p-4 bg-[var(--color-neutral-gray)] border-t border-[var(--color-divider)]">
        <span className="text-xs text-[var(--color-text-secondary)]">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border border-[var(--color-accent-pink)] rounded-xl text-[var(--color-accent-pink)] hover:bg-[var(--color-accent-pink)]/10 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border border-[var(--color-accent-green)] rounded-xl text-[var(--color-accent-green)] hover:bg-[var(--color-accent-green)]/10 disabled:opacity-50"
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
