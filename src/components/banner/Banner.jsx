import { fetcher } from '../../config';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from 'swiper/react';

const Banner = () => {
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=a47ce0306fa5c2cb2ddf7f640a085e1f`,
		fetcher
	);
	const movies = data?.results || [];

	return (
		<section className="banner h-[500px] bg-white page-container rounded-lg mb-20">
			<Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
				{movies?.length > 0 &&
					movies.map((item) => (
						<SwiperSlide key={item.id}>
							<BannerItem item={item}></BannerItem>
						</SwiperSlide>
					))}
			</Swiper>
		</section>
	);
};

function BannerItem({ item }) {
	const { title, poster_path } = item;
	return (
		<div className="w-full h-full rounded-lg relative">
			<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
			<img
				src={`https://image.tmdb.org/t/p/original${poster_path}`}
				alt=""
				className="w-full h-full object-cover rounded-lg object-top"
			/>
			<div className="absolute left-5 bottom-5 text-white">
				<h2 className="font-bold text-3xl mb-5">{title}</h2>
				<div className="flex items-center gap-x-3 mb-8">
					<span className="py-2 px-4 border border-white rounded-md">
						Adventure
					</span>
					<span className="py-2 px-4 border border-white rounded-md">
						Action
					</span>
					<span className="py-2 px-4 border border-white rounded-md">
						Drama
					</span>
				</div>
				<button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
					Watch
				</button>
			</div>
		</div>
	);
}
export default Banner;
