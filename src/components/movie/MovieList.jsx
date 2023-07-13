import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCart from './MovieCart';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import { useEffect, useState } from 'react';

const MovieList = ({ type = 'now_playing' }) => {
	const [movies, setMovies] = useState([]);

	const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
	useEffect(() => {
		setMovies(data?.results);
	}, [data]);

	return (
		<div className="movie-list">
			<Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
				{movies?.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<MovieCart item={item}></MovieCart>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	);
};

export default MovieList;
