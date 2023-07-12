import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, apiKey } from '../../config';

const MovieDetailPage = () => {
	const { movieId } = useParams();
	const { data } = useSWR(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
		fetcher
	);
	console.log(data);
	return <div>This is a Movie Deltais Page</div>;
};

export default MovieDetailPage;
