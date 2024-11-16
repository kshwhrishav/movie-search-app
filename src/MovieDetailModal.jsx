import React from "react";

const MovieDetailModal = ({ movie }) => {
  return (
    <div className="flex flex-col p-[32px] jsutify-center items-center rounded-[12px] bg-[#f19da0] gap-[16px]">
      <img src={movie?.Poster} alt={movie?.Title} style={{ width: 100 }} />
      <div className="flex flex-col justify-start">
        <div>Name: {movie?.Title}</div>
        <div>Type: {movie?.Type}</div>
        <div>Year: {movie?.Year}</div>
        <div>IMDB_ID: {movie?.imdbID}</div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
