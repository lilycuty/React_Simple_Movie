import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCart from './MovieCart';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { useEffect, useState } from 'react';

const MovieList = ({ type = 'now_playing' }) => {
	const [movies, setMovies] = useState([]);

	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${type}?api_key=a47ce0306fa5c2cb2ddf7f640a085e1f`,
		fetcher
	);
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
