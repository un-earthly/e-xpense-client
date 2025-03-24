import { Budget } from '../interfaces/budget';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface BudgetAnalyticsProps {
    budgets: Budget[];
}

export function BudgetAnalytics({ budgets }: BudgetAnalyticsProps) {
    const data = budgets.map(budget => ({
        category: budget.category,
        'Budget Amount': budget.amount,
        'Spent Amount': budget.spent,
    }));

    return (
        <div className="mt-8">
            <h3 className="text-lg font-medium">Budget Overview</h3>
            <div className="mt-4 bg-white rounded-lg shadow p-6">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="category"
                            tick={{ fill: '#6B7280' }}
                            tickLine={{ stroke: '#6B7280' }}
                        />
                        <YAxis
                            tick={{ fill: '#6B7280' }}
                            tickLine={{ stroke: '#6B7280' }}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            formatter={(value) => [`$${value}`, '']}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #E5E7EB'
                            }}
                        />
                        <Legend />
                        <Bar
                            dataKey="Budget Amount"
                            fill="rgba(99, 102, 241, 0.8)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="Spent Amount"
                            fill="rgba(239, 68, 68, 0.8)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}