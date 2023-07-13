import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { tmdbAPI } from '../../config';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import LoadingSkeleton from '../../loading/LoadingSkeleton';

const MovieCart = ({ item }) => {
	const { title, vote_average, release_date, poster_path, id } = item;
	const navigate = useNavigate();
	return (
		<div
			className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full
      flex flex-col"
		>
			<img
				src={tmdbAPI.image500(poster_path)}
				alt=""
				className="w-full h-[250px] object-cover rounded-lg mb-5"
			/>
			<div className="flex flex-col flex-1">
				<h3 className="text-white text-lg font-bold mb-3">{title}</h3>
				<div className="flex items-center justify-between text-sm opacity-50 mb-10">
					<span>{new Date(release_date).getFullYear()}</span>
					<span>{vote_average}</span>
				</div>
				<Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
					Watch now
				</Button>
			</div>
		</div>
	);
};

MovieCart.propTypes = {
	item: PropTypes.shape({
		title: PropTypes.string,
		vote_average: PropTypes.number,
		release_date: PropTypes.string,
		poster_path: PropTypes.string,
		id: PropTypes.number,
	}),
};

function FallbackComponent() {
	return (
		<p className="bg-red-50 text-red-400">
			Something went wrong with this component
		</p>
	);
}
export default withErrorBoundary(MovieCart, {
	FallbackComponent,
});

export const MovieCartSkeleton = () => {
	return (
		<div
			className="movie-card rounded-lg p-3 bg-slate-800 text-white h-full
      flex flex-col"
		>
			<LoadingSkeleton
				width="100%"
				height="250px"
				radius="8px"
			></LoadingSkeleton>
			<div className="flex flex-col flex-1 mt-4">
				<h3 className="text-white text-lg font-bold mb-3">
					<LoadingSkeleton width="100%" height="20px" />
				</h3>
				<div className="flex items-center justify-between text-sm opacity-50 mb-10">
					<span>
						<LoadingSkeleton width="50px" height="10px" />
					</span>
					<span>
						<LoadingSkeleton width="30px" height="10px" />
					</span>
				</div>
				<LoadingSkeleton width="100%" height="45px" radius="6px" />
			</div>
		</div>
	);
};
