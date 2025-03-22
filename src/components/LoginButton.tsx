import { Link, useNavigate } from 'react-router-dom';

export default function LoginButton() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleClick = (e: React.MouseEvent) => {
        if (token) {
            e.preventDefault();
            navigate('/dashboard/home');
        }
    };

    return (
        <Link
            to="/login"
            onClick={handleClick}
            className="text-sm/6 font-semibold text-gray-900"
        >
            Log in <span aria-hidden="true">&rarr;</span>
        </Link>
    );
}