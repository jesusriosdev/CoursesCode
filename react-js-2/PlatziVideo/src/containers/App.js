import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';

import useInitialState from '../hooks/useInitialState';

import '../assets/styles/App.scss';

const API = 'http://localhost:3000/initialState';

const App = () => {
	const videos = useInitialState(API);

	if (videos.length === 0) {
		return <h1>Loading.. </h1>;
	}

	return (
		<div className="App">
			<Header />
			<Search />

			{videos.mylist && videos.mylist.length > 0 && (
				<Categories title="Mi lista">
					<Carousel>
						{videos.mylist.map((item) => {
							return <CarouselItem key={item.id} {...item} />;
						})}
					</Carousel>
				</Categories>
			)}

			<Categories title="Tendencias">
				<Carousel>
					{videos.trends.map((item) => {
						return <CarouselItem key={item.id} {...item} />;
					})}
				</Carousel>
			</Categories>

			<Categories title="Originales de PlatziVideo">
				<Carousel>
					{videos.originals.map((item) => {
						return <CarouselItem key={item.id} {...item} />;
					})}
				</Carousel>
			</Categories>

			<Footer />
		</div>
	);
};

export default App;
