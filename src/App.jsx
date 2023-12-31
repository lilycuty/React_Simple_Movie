import { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'swiper/scss';
import Main from './components/layout/Main';
import Banner from './components/banner/Banner';
// import HomePage from './pages/HomePage';
// import MoviePage from './pages/MoviePage';
// import MovieDetailPage from './components/movie/MovieDetailPage';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const MovieDetailPage = lazy(() =>
	import('./components/movie/MovieDetailPage')
);

function App() {
	return (
		<Fragment>
			<Suspense fallback={<></>}>
				<Routes>
					<Route element={<Main></Main>}>
						<Route
							path="/"
							element={
								<>
									<Banner></Banner>
									<HomePage></HomePage>
								</>
							}
						></Route>
						<Route path="/movies" element={<MoviePage></MoviePage>}></Route>
						<Route
							path="/movie/:movieId"
							element={<MovieDetailPage></MovieDetailPage>}
						></Route>
						<Route path="*" element={<>Not found</>}></Route>
					</Route>
				</Routes>
			</Suspense>
		</Fragment>
	);
}

export default App;
{
	/* <Header></Header>
			<Banner></Banner>
			<HomePage></HomePage> */
}
