import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCart, { MovieCartSkeleton } from './MovieCart';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

const MovieList = ({ type = 'now_playing' }) => {
	const [movies, setMovies] = useState([]);

	const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
	const loading = !data && !error;
	useEffect(() => {
		setMovies(data?.results);
	}, [data]);

	return (
		<div className="movie-list">
			{loading && (
				<>
					<Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
						<SwiperSlide>
							<MovieCartSkeleton />
						</SwiperSlide>
						<SwiperSlide>
							<MovieCartSkeleton />
						</SwiperSlide>
						<SwiperSlide>
							<MovieCartSkeleton />
						</SwiperSlide>
						<SwiperSlide>
							<MovieCartSkeleton />
						</SwiperSlide>
					</Swiper>
				</>
			)}
			{!loading && (
				<Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
					{movies?.length > 0 &&
						movies.map((item) => (
							<SwiperSlide key={item.id}>
								<MovieCart item={item}></MovieCart>
							</SwiperSlide>
						))}
				</Swiper>
			)}
		</div>
	);
};

MovieList.propTypes = {
	type: PropTypes.string.isRequired,
};

function FallbackComponent() {
	return (
		<p className="bg-red-50 text-red-400">
			Something went wrong with this component
		</p>
	);
}
export default withErrorBoundary(MovieList, {
	FallbackComponent,
});
