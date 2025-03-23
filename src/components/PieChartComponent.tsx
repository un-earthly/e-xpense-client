import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface PieChartProps {
    data: Array<{
        name: string;
        amount: number;
        percentage: number;
    }>;
    colors: string[];
}

export default function PieChartComponent({ data, colors }: PieChartProps) {
    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}