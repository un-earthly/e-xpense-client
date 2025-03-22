import { Fragment } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Cog6ToothIcon, UserIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

export default function SettingsDropdown() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Menu as="div" className="relative">
            <MenuButton className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600">
                <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                />
                Settings
            </MenuButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute bottom-full left-0 mb-2 w-56 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <MenuItem>
                            {({ active }) => (
                                <Link
                                    to="profile"
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex items-center px-4 py-2 text-sm`}
                                >
                                    <UserIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                                    Profile
                                </Link>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <Link
                                    to="settings"
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex items-center px-4 py-2 text-sm`}
                                >
                                    <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                                    Settings
                                </Link>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={handleLogout}
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex w-full items-center px-4 py-2 text-sm`}
                                >
                                    <ArrowRightEndOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-indigo-600" />
                                    Logout
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    )
}