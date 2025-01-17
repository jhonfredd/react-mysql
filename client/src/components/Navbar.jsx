import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="bg-neutral-800 flex justify-between px-20 py-2">
            <Link to="/" className="text-white font-bold">
                <h1>React MySql</h1>
            </Link>

            <ul className="flex gap-x-1">
                <li>
                    <Link to="/" className="bg-slate-200 px-2 py-1">Home</Link>
                </li>
                <li>
                    <Link to="/new" className="bg-teal-200 px-2 py-1">Create Tarea</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
