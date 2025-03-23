interface StatusBadgeProps {
    status: 'completed' | 'pending' | 'cancelled';
}

const statusStyles = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800'
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusStyles[status]}`}>
            {status}
        </span>
    );
}