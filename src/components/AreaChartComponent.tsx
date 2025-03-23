import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface AreaChartProps {
    data: any[];
    dataKeys: { key: string; color: string; name: string }[];
    height?: number;
}

export default function AreaChartComponent({ data, dataKeys, height = 80 }: AreaChartProps) {
    return (
        <div className={`h-${height}`}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={(date) => format(new Date(date), 'MMM dd')}
                    />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                        formatter={(value) => [`$${value}`, 'Amount']}
                    />
                    {dataKeys.map(({ key, color, name }) => (
                        <Area
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={color}
                            fill={color}
                            fillOpacity={0.1}
                            name={name}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}