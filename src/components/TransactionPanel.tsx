import { BaseFilters, Transaction } from "../interfaces/transactions";
import FilterPanel from "./FilterSection";
import { Pagination } from "./Pagination";
import TransactionTable from "./TransactionTable";

interface TransactionPanelProps<T extends Transaction, F extends BaseFilters> {
    data: T[];
    filters: F;
    onFilterChange: (key: keyof F, value: any) => void;
    onSort: (field: keyof T) => void;
    sortField: keyof T;
    sortDirection: 'asc' | 'desc';
    onEdit: (item: T) => void;
    categories: string[];
    pageSize: number;
    onPageSizeChange: (size: number) => void;
    total: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    type: 'income' | 'expense';
    onResetFilters: () => void;
    showFilters: boolean;
}

export function TransactionPanel<T extends Transaction, F extends BaseFilters>({
    data,
    filters,
    onFilterChange,
    onSort,
    sortField,
    sortDirection,
    onEdit,
    categories,
    pageSize,
    onPageSizeChange,
    total,
    currentPage,
    onPageChange,
    type,
    onResetFilters,
    showFilters
}: TransactionPanelProps<T, F>) {
    return (
        <div>
            {showFilters && (
                <FilterPanel
                    filters={filters}
                    onFilterChange={onFilterChange}
                    categories={categories}
                    pageSize={pageSize}
                    onPageSizeChange={onPageSizeChange}
                    type={type}
                    onResetFilters={onResetFilters}
                />
            )}
            <TransactionTable
                data={data}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={onSort}
                onEdit={onEdit}
                type={type}
            />
            <Pagination
                currentPage={currentPage}
                pageSize={pageSize}
                total={total}
                onPageChange={onPageChange}
            />
        </div>
    );
}