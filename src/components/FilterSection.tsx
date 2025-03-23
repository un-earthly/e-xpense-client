import { Fragment } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition, Popover, PopoverButton, PopoverPanel, Switch } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, CalendarIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ExpenseFilters } from '../interfaces/expense';
import { DayPicker } from 'react-day-picker';
import { format, subDays, startOfMonth, startOfYear } from 'date-fns';
import 'react-day-picker/dist/style.css';

const DATE_PRESETS = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
    { label: 'This month', period: 'month' },
    { label: 'This year', period: 'year' },
];

interface FilterPanelProps {
    filters: ExpenseFilters;
    onFilterChange: (key: keyof ExpenseFilters, value: any) => void;
    categories?: string[];
    pageSize: number;
    onPageSizeChange: (size: number) => void;
    type: 'income' | 'expense';
    onResetFilters: () => void;
}

const PAYMENT_METHODS = ['all', 'cash', 'credit', 'debit', 'online'];
const STATUS_OPTIONS = ['all', 'completed', 'pending', 'cancelled'];
const PAGE_SIZES = [10, 25, 50, 100];

const DateInput = ({
    label,
    value,
    onChange,
    id
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    id: string;
}) => {
    return (
        <Popover className="relative">
            <PopoverButton className="w-full">
                <div className="flex flex-col items-start">
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                    <div className="relative w-full mt-1">
                        <input
                            type="text"
                            id={id}
                            readOnly
                            value={value ? format(new Date(value), 'MMM dd, yyyy') : 'Select date'}
                            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm cursor-pointer"
                        />
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </PopoverButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel className="absolute z-10 mt-1 bg-white rounded-md shadow-lg p-4 border border-gray-200">
                    <DayPicker
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(date) => onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                        className="border-0"
                        classNames={{
                            day_selected: "bg-indigo-600 text-white hover:bg-indigo-500",
                            day_today: "font-bold",
                        }}
                    />
                </PopoverPanel>
            </Transition>
        </Popover>
    );
};

const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    return (
        <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search Expenses
            </label>
            <div className="relative mt-1">
                <input
                    type="text"
                    name="search"
                    id="search"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search description..."
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default function FilterPanel({
    filters,
    onFilterChange,
    categories = [],
    pageSize,
    onPageSizeChange,
    onResetFilters
}: FilterPanelProps) {
    return (
        <div className="space-y-4">
            {/* Top Row - Search and Actions */}
            <div className="flex items-center justify-between">
                <div className="w-full max-w-xs">
                    <SearchInput
                        value={filters.searchTerm || ''}
                        onChange={(value) => onFilterChange('searchTerm', value)}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <Switch.Group>
                        <div className="flex items-center">
                            <Switch.Label className="mr-3 text-sm text-gray-700">Recurring Only</Switch.Label>
                            <Switch
                                checked={filters.isRecurring || false}
                                onChange={(checked) => onFilterChange('isRecurring', checked)}
                                className={`${filters.isRecurring ? 'bg-indigo-600' : 'bg-gray-200'
                                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                            >
                                <span
                                    className={`${filters.isRecurring ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                />
                            </Switch>
                        </div>
                    </Switch.Group>
                    <button
                        type="button"
                        onClick={onResetFilters}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        <XMarkIcon className="h-5 w-5 mr-2 text-gray-400" />
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Date Range Shortcuts */}
            <div className="flex space-x-2">
                {DATE_PRESETS.map((preset) => (
                    <button
                        key={preset.label}
                        onClick={() => {
                            const today = new Date();
                            let startDate: Date;  

                            if (preset.days) {
                                startDate = subDays(today, preset.days);
                            } else if (preset.period === 'month') {
                                startDate = startOfMonth(today);
                            } else {
                                startDate = startOfYear(today);  
                            }


                            onFilterChange('startDate', format(startDate, 'yyyy-MM-dd'));
                            onFilterChange('endDate', format(today, 'yyyy-MM-dd'));
                        }}
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {preset.label}
                    </button>
                ))}
            </div>

            
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <DateInput
                        label="Start Date"
                        id="startDate"
                        value={filters.startDate || ''}
                        onChange={(value) => onFilterChange('startDate', value)}
                    />
                </div>

                <div>
                    <DateInput
                        label="End Date"
                        id="endDate"
                        value={filters.endDate || ''}
                        onChange={(value) => onFilterChange('endDate', value)}
                    />
                </div>

                
                <div className="relative">
                    <Listbox value={filters.category || 'all'} onChange={(value) => onFilterChange('category', value)}>
                        <Label className="block text-sm font-medium text-gray-700">
                            Category
                        </Label>
                        <div className="relative mt-1">
                            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <span className="block truncate">{filters.category || 'All Categories'}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption value="all" className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'}`
                                    }>
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    All Categories
                                                </span>
                                                {selected && (
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </ListboxOption>
                                    {categories.map((category) => (
                                        <ListboxOption
                                            key={category}
                                            value={category}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'}`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {category}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Payment Method Filter */}
                <div className="relative">
                    <Listbox value={filters.paymentMethod || 'all'} onChange={(value) => onFilterChange('paymentMethod', value)}>
                        <Label className="block text-sm font-medium text-gray-700">
                            Payment Method
                        </Label>
                        <div className="relative mt-1">
                            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <span className="block truncate">{(filters.paymentMethod || 'All').charAt(0).toUpperCase() + (filters.paymentMethod || 'All').slice(1)}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {PAYMENT_METHODS.map((method) => (
                                        <ListboxOption
                                            key={method}
                                            value={method}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'}`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {method.charAt(0).toUpperCase() + method.slice(1)}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Status Filter */}
                <div className="relative">
                    <Listbox value={filters.status || 'all'} onChange={(value) => onFilterChange('status', value)}>
                        <Label className="block text-sm font-medium text-gray-700">
                            Status
                        </Label>
                        <div className="relative mt-1">
                            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <span className="block truncate">{(filters.status || 'All').charAt(0).toUpperCase() + (filters.status || 'All').slice(1)}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {STATUS_OPTIONS.map((status) => (
                                        <ListboxOption
                                            key={status}
                                            value={status}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'}`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Transition>
                        </div>
                    </Listbox>
                </div>

                {/* Page Size Selector */}
                <div className="relative">
                    <Listbox value={pageSize} onChange={onPageSizeChange}>
                        <Label className="block text-sm font-medium text-gray-700">
                            Page Size
                        </Label>
                        <div className="relative mt-1">
                            <ListboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <span className="block truncate">{pageSize} items per page</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {PAGE_SIZES.map((size) => (
                                        <ListboxOption
                                            key={size}
                                            value={size}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'}`
                                            }
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {size} items per page
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </div>
    );
}