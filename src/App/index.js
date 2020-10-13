import React, { useEffect, useState } from 'react';
import './style.css';
import Tmdb from '../Tmdb';
import MovieRow from '../components/MovieRow';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 120) return setBlackHeader(true);
      return setBlackHeader(false);
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        <div className="copyrights">
          <span className="tmdb">
            Database picked from <a href="https://www.themoviedb.org/">TheMovieDB</a>
          </span>
          <span className="netflix">
            All copyrights reserved by <a href="https://www.netflix.com/">Netflix</a>
          </span>
          <span className="me">
            Ui clone made by <a href="https://github.com/PabloPessanha">Pablo Pessanha</a>
          </span>
        </div>
      </footer>
    </div>
  );
};
