export default function DashboardSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 rounded-lg bg-gray-200" />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="h-96 rounded-lg bg-gray-200" />
                <div className="h-96 rounded-lg bg-gray-200" />
            </div>
        </div>
    );
}