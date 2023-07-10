import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className="header flex items-center justify-center text-white gap-x-5 py-10 mb-5">
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? 'text-primary' : '')}
			>
				Home
			</NavLink>
			<NavLink
				to="/movies"
				className={({ isActive }) => (isActive ? 'text-primary' : '')}
			>
				Movies
			</NavLink>
		</header>
	);
};

export default Header;
