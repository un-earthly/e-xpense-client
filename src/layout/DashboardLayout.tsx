import {
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon
} from '@heroicons/react/24/outline'
import { Link, NavLink, Outlet } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute';

const navigation = [
    { name: 'Dashboard', href: 'home', icon: HomeIcon },
    { name: 'Expenses', href: 'expenses', icon: DocumentDuplicateIcon },
    { name: 'Reports', href: 'reports', icon: ChartPieIcon },
    { name: 'Categories', href: 'categories', icon: FolderIcon },
    { name: 'Budget', href: 'budget', icon: CalendarIcon },
]


export default function DashboardLayout() {

    return (
        <ProtectedRoute>
            <div>
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
                        <Link to="/">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="E-xpense"
                                />
                            </div>
                        </Link>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <NavLink
                                                    to={item.href}
                                                    className={({ isActive }) =>
                                                        `${isActive ? "text-indigo-600" : ""} group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:text-indigo-600`
                                                    }

                                                >
                                                    <item.icon
                                                        className='h-6 w-6 shrink-0'
                                                        aria-hidden="true"
                                                    />
                                                    {item.name}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto">
                                    <Link
                                        to="settings"
                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                    >
                                        <Cog6ToothIcon
                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                                            aria-hidden="true"
                                        />
                                        Settings
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">


                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    )
}