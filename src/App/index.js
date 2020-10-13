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
