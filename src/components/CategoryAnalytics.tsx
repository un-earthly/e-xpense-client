import { Category } from '../interfaces/category';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryAnalyticsProps {
    categories: Category[];
}

export function CategoryAnalytics({ categories }: CategoryAnalyticsProps) {
    const typeData = categories.reduce((acc, cat) => {
        const type = cat.type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.entries(typeData).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value
    }));

    const COLORS = {
        Income: '#10B981', // green-500
        Expense: '#EF4444'  // red-500
    };

    return (
        <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Category Distribution
                </h3>
            </div>
            <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[entry.name as keyof typeof COLORS]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) => [`${value} categories`, '']}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}