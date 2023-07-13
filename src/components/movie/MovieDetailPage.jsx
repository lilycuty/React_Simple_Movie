import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import MovieCart from './MovieCart';
import { SwiperSlide, Swiper } from 'swiper/react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

const MovieDetailPage = () => {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;

	return (
		<div className="py-10">
			<div className="w-full h-[600px] relative">
				<div className="absolute inset-0 bg-black bg-opacity-60"></div>
				<div
					className="w-full h-full bg-cover bg-no-repeat"
					style={{
						backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
					}}
				></div>
			</div>
			<div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
				<img
					src={tmdbAPI.imageOriginal(poster_path)}
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<h1 className="text-center text-4xl font-bold text-white mb-10">
				{title}
			</h1>
			{genres?.length > 0 && (
				<div className="flex items-center justify-center gap-x-5 mb-10">
					{genres.map((item) => (
						<span
							key={item.id}
							className="py-2 px-4 border-primary text-primary border rounded"
						>
							{item.name}
						</span>
					))}
				</div>
			)}
			<p className="text-center text-sm leading-relaxed max-w-[600px] mx-auto mb-10">
				{overview}
			</p>
			<MovieMeta type="credits"></MovieMeta>
			<MovieMeta type="videos"></MovieMeta>
			<MovieMeta type="similar"></MovieMeta>
			{/* <MovieCredits></MovieCredits>
			<MovieVideos></MovieVideos>
			<MovieSimilar></MovieSimilar> */}
		</div>
	);
};

function MovieMeta({ type = 'videos' }) {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
	if (!data) return null;

	if (type === 'credits') {
		const { cast } = data;
		if (!cast || cast.length <= 0) return null;
		return (
			<div className="py-10">
				<h2 className="text-center text-3xl mb-10 font-bold">Casts</h2>
				<div className="grid grid-cols-4 gap-5">
					{cast.slice(0, 4).map((item) => (
						<div className="cast-item" key={item.id}>
							<img
								src={tmdbAPI.imageOriginal(item.profile_path)}
								className="w-full h-[350px] object-cover rounded-lg mb-3"
							/>
							<h3 className="text-xl font-medium">{item.name}</h3>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		const { results } = data;
		if (!results || results.length <= 0) return null;

		if (type === 'videos')
			return (
				<div className="py-10">
					<div className="flex flex-col gap-10">
						{results.slice(0, 2).map((item) => (
							<div key={item.id}>
								<h3 className="mb-5 text-xl font-medium bg-secondary inline-block p-3">
									{item.name}
								</h3>
								<div className="w-full aspect-video">
									<iframe
										width="967"
										height="544"
										src={`https://www.youtube.com/embed/${item.key}`}
										title={item.name}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowFullScreen
										className="w-full h-full object-fill"
									></iframe>
								</div>
							</div>
						))}
					</div>
				</div>
			);

		if (type === 'similar')
			return (
				<div className="py-10">
					<h2 className="text-3xl font-medium mb-10">Similar movies</h2>
					<div className="movie-list">
						<Swiper
							grabCursor={'true'}
							spaceBetween={40}
							slidesPerView={'auto'}
						>
							{results?.length > 0 &&
								results.map((item) => (
									<SwiperSlide key={item.id}>
										<MovieCart item={item}></MovieCart>
									</SwiperSlide>
								))}
						</Swiper>
					</div>
				</div>
			);
	}
	return null;
}

function MovieCredits() {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'credits'), fetcher);
	if (!data) return null;
	const { cast } = data;
	if (!cast || cast.length <= 0) return null;
	return (
		<div className="py-10">
			<h2 className="text-center text-3xl mb-10 font-bold">Casts</h2>
			<div className="grid grid-cols-4 gap-5">
				{cast.slice(0, 4).map((item) => (
					<div className="cast-item" key={item.id}>
						<img
							src={tmdbAPI.imageOriginal(item.profile_path)}
							className="w-full h-[350px] object-cover rounded-lg mb-3"
						/>
						<h3 className="text-xl font-medium">{item.name}</h3>
					</div>
				))}
			</div>
		</div>
	);
}

function MovieVideos() {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'videos'), fetcher);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<div className="flex flex-col gap-10">
				{results.slice(0, 2).map((item) => (
					<div key={item.id}>
						<h3 className="mb-5 text-xl font-medium bg-secondary inline-block p-3">
							{item.name}
						</h3>
						<div className="w-full aspect-video">
							<iframe
								width="967"
								height="544"
								src={`https://www.youtube.com/embed/${item.key}`}
								title={item.name}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
								className="w-full h-full object-fill"
							></iframe>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function MovieSimilar() {
	const { movieId } = useParams();
	const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, 'similar'), fetcher);
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	console.log(results);
	return (
		<div className="py-10">
			<h2 className="text-3xl font-medium mb-10">Similar movies</h2>
			<div className="movie-list">
				<Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
					{results?.length > 0 &&
						results.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCart item={item}></MovieCart>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
}

MovieMeta.propTypes = {
	type: PropTypes.string,
};
function FallbackComponent() {
	return (
		<p className="bg-red-50 text-red-400">
			Something went wrong with this component
		</p>
	);
}
export default withErrorBoundary(MovieDetailPage, {
	FallbackComponent,
});
