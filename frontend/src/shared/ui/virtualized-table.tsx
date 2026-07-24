import React, { useState, useRef, ReactNode } from 'react';

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  width?: string;
}

interface VirtualizedTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowHeight?: number;
  containerHeight?: number;
  keyExtractor: (item: T, index: number) => string;
}

export function VirtualizedTable<T>({
  data,
  columns,
  rowHeight = 48,
  containerHeight = 380,
  keyExtractor,
}: VirtualizedTableProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = data.length * rowHeight;
  const visibleCount = Math.ceil(containerHeight / rowHeight) + 2;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
  const endIndex = Math.min(data.length, startIndex + visibleCount);

  const visibleData = data.slice(startIndex, endIndex);
  const offsetY = startIndex * rowHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div className="w-full overflow-x-auto border border-slate-100 rounded-xl bg-white text-left">
      {/* Table Header */}
      <div className="flex bg-slate-50 border-b border-slate-200 text-xs font-bold text-text-muted uppercase px-4 py-2.5">
        {columns.map((col) => (
          <div key={col.key} style={{ width: col.width || '100%', flex: col.width ? undefined : 1 }}>
            {col.header}
          </div>
        ))}
      </div>

      {/* Virtualized Rows Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: Math.min(containerHeight, totalHeight), overflowY: 'auto', position: 'relative' }}
      >
        <div style={{ height: totalHeight, width: '100%', position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetY}px)`, position: 'absolute', left: 0, right: 0, top: 0 }}>
            {visibleData.map((item, index) => {
              const actualIndex = startIndex + index;
              return (
                <div
                  key={keyExtractor(item, actualIndex)}
                  className="flex items-center px-4 border-b border-slate-100 hover:bg-slate-50/60 transition-colors text-xs text-text-body"
                  style={{ height: rowHeight }}
                >
                  {columns.map((col) => (
                    <div key={col.key} style={{ width: col.width || '100%', flex: col.width ? undefined : 1 }}>
                      {col.render(item)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
