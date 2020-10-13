import React from 'react';
import './style.css';

export default ({ item }) => {
  const percent = parseFloat(item.vote_average) * 10;
  const releaseDate = new Date(item.first_air_date);

  const genres = [];
  for (let genre in item.genres) {
    genres.push(item.genres[genre].name);
  }

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})` }}
    >
      <div className="vertical">
        <div className="horizontal">
          <div className="name">{item.original_name}</div>
          <div className="info">
            <div className="approval">{percent}% de Aprovação</div>
            <div className="release">{releaseDate.getFullYear()}</div>
            <div className="seasons">
              {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="description">{item.overview}</div>
          <div className="buttons">
            <a href={`/watch/${item.id}`} className="watch">
              ► Assistir
            </a>
            <a href={`/list/add/${item.id}`} className="add-list">
              + Minha lista
            </a>
          </div>
          <div className="genres">
            <strong>Genêros: </strong>
            {genres.join(', ')}
          </div>
        </div>
      </div>
    </section>
  );
};
