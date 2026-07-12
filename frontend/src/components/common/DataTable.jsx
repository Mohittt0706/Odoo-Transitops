import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Check,
} from "lucide-react";

export default function DataTable({
  columns,
  data,
  searchable = true,
  searchPlaceholder = "Search...",
  pageSize = 10,
  bulkSelect = false,
  actions,
  emptyMessage = "No records found",
  onRowClick,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [openActionRow, setOpenActionRow] = useState(null);

  const filtered = useMemo(() => {
    let result = data;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => String(row[col.key]).toLowerCase().includes(q))
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((_, i) => i)));
    }
  };

  const toggleSelect = (i) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setSelected(next);
  };

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-border">
        <div className="flex items-center gap-3 flex-1">
          {searchable && (
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder={searchPlaceholder}
                className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          )}
        </div>
        {selected.size > 0 && (
          <div className="flex items-center gap-2 text-sm text-neutral-textMuted">
            <span className="font-semibold">{selected.size} selected</span>
            <button className="text-xs text-danger hover:underline">Delete</button>
          </div>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-border bg-slate-50/80">
              {bulkSelect && (
                <th className="w-12 px-4 py-3">
                  <button
                    onClick={toggleSelectAll}
                    className={cn(
                      "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                      selected.size === paginated.length && paginated.length > 0
                        ? "bg-primary border-primary"
                        : "border-neutral-border hover:border-neutral-textMuted"
                    )}
                  >
                    {selected.size === paginated.length && paginated.length > 0 && (
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    )}
                  </button>
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted",
                    col.sortable !== false && "cursor-pointer select-none hover:text-accent"
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && sortKey === col.key && (
                      sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </span>
                </th>
              ))}
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (bulkSelect ? 1 : 0) + 1} className="px-4 py-16 text-center">
                  <div className="text-neutral-textMuted">
                    <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5 text-neutral-textMuted" />
                    </div>
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={cn(
                    "border-b border-neutral-border/50 transition-colors",
                    onRowClick && "cursor-pointer",
                    selected.has(i) && "bg-primary/[0.03]"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {bulkSelect && (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSelect(i)}
                        className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                          selected.has(i)
                            ? "bg-primary border-primary"
                            : "border-neutral-border hover:border-neutral-textMuted"
                        )}
                      >
                        {selected.has(i) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                      </button>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-neutral-textMain">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="relative">
                      <button
                        onClick={() => setOpenActionRow(openActionRow === i ? null : i)}
                        className="p-1 rounded hover:bg-accent-light text-neutral-textMuted"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openActionRow === i && (
                        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-neutral-border rounded-lg shadow-soft-lg py-1 z-10">
                          <button className="w-full text-left px-3 py-2 text-sm text-neutral-textMuted hover:bg-accent-light">View</button>
                          <button className="w-full text-left px-3 py-2 text-sm text-neutral-textMuted hover:bg-accent-light">Edit</button>
                          <button className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger-light">Delete</button>
                        </div>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-border">
          <p className="text-xs text-neutral-textMuted">
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (page <= 3) pageNum = i + 1;
              else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = page - 2 + i;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                    page === pageNum
                      ? "bg-primary text-white"
                      : "text-neutral-textMuted hover:bg-accent-light"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
