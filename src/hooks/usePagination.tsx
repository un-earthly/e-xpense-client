import { useState, useMemo } from 'react';

export function usePagination<T>(items: T[], defaultPageSize = 10) {
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [pageIndex, setPageIndex] = useState(0);

    const paginatedItems = useMemo(() => {
        return items?.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize) ?? [];
    }, [items, pageIndex, pageSize]);

    const totalPages = useMemo(() => {
        return Math.ceil((items?.length ?? 0) / pageSize);
    }, [items?.length, pageSize]);

    return {
        paginatedItems,
        pageSize,
        setPageSize,
        pageIndex,
        setPageIndex,
        totalPages,
    };
}