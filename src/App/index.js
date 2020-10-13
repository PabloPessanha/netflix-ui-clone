import React, { useEffect, useState } from 'react';
import Tmdb from '../Tmdb';
import MovieRow from '../MovieRow';
import './style.css';
import FeaturedMovie from '../MovieRow/FeaturedMovie';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      const list = await Tmdb.getHomeList();
      setMovieList(list);

      const originals = list.filter((item) => item.slug === 'originals');
      const randomChoose = Math.floor(Math.random() * originals[0].items.results.length);
      const choosen = originals[0].items.results[randomChoose];
      const choosenInfo = await Tmdb.getMovieInfoList(choosen.id, 'tv');
      setFeaturedData(choosenInfo);
    };

    loadAll();
  }, []);

  return (
    <div className="page">
      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};
