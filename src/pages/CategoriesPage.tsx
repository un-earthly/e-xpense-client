import { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import Modal from '../components/Modal';
import { Category } from '../interfaces/category';
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from '../store/services/categoryApi';
import CategoryForm from '../components/CategoryForm';
import { CategoryAnalytics } from '../components/CategoryAnalytics';

export default function Categories() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

    const { data: categories } = useGetCategoriesQuery();
    const [addCategory] = useAddCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const filteredCategories = categories?.filter(cat =>
        (filter === 'all' || cat.type === filter) &&
        (!searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

    const handleSubmit = async (formData: Partial<Category>) => {
        try {
            if (selectedCategory) {
                await updateCategory({ ...formData, id: selectedCategory.id });
            } else {
                await addCategory(formData);
            }
            setIsModalOpen(false);
            setSelectedCategory(null);
        } catch (error) {
            console.error('Failed to save category:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(id);
            } catch (error) {
                console.error('Failed to delete category:', error);
            }
        }
    };

    return (
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                            Add Category
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-4 sm:flex sm:items-center sm:justify-between"></div>
                <div className="max-w-lg flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 outline-none h-10 p-3 sm:text-sm"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
                        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
            </div >

            {/* Categories List */}
            < div className="mt-8 flex flex-col" >

                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Type
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredCategories.map((category) => (
                                    <tr key={category.id}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                            <div className="flex items-center">
                                                {category.icon && (
                                                    <span className="mr-2">{category.icon}</span>
                                                )}
                                                <span style={{ color: category.color }}>{category.name}</span>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${category.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {category.type}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {category.description}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table >
                    </div >
                </div >

                {/* Analytics Section */}
                {categories && categories.length > 0 && (
                    <CategoryAnalytics categories={categories} />
                )}

                {
                    isModalOpen && (
                        <Modal
                            title={selectedCategory ? 'Edit Category' : 'Add Category'}
                            open={isModalOpen}
                            onClose={() => {
                                setIsModalOpen(false);
                                setSelectedCategory(null);
                            }}
                        >
                            <CategoryForm
                                onSubmit={handleSubmit}
                                initialData={selectedCategory}
                                onCancel={() => {
                                    setIsModalOpen(false);
                                    setSelectedCategory(null);
                                }}
                            />
                        </Modal>
                    )
                }
            </div >
        </div >
    );
}