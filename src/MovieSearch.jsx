import { Input, Modal } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import MovieDetailModal from "./MovieDetailModal";


const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const inputRef = useRef(null);

  const apiData = useCallback(async () => {
    if (!debouncedSearchInput) return;
  
    setLoading(true);
    
    const response = await fetch(`/api/searchMovies?s=${debouncedSearchInput}`);
    const data = await response.json();
    console.log(data);
    if (data) {
      setMovies(data);  
    } else {
      setMovies([]);
    }
  
    setLoading(false);
  }, [debouncedSearchInput]);
  

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };

  const onMovieClick = (id) => {
    setModalOpen(true);
    const movie = movies?.find((movie) => movie?.imdbID === id);
    setMovieDetails(movie);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    apiData();
  }, [debouncedSearchInput, apiData]);

  return (
    <div className="flex flex-col justify-center items-center mt-[32px] gap-[32px]">
      <div className="font-[700] text-[32px]">Movie Search</div>
      <Input
        inputProps={{ ref: inputRef }}
        type="text"
        className="b-2 border-[#3c59df] p-2"
        value={searchInput}
        onChange={(e) => handleSearchInput(e?.target?.value)}
        placeholder="Search for a movie"
      />

      {loading && <div>Loading...</div>}

      <div className="rounded-[12px] p-[16px] bg-[#f19da0] mt-4">
        {movies && movies.length > 0 ? (
          <ul>
            {movies?.map((movie) => (
              <li
                onClick={() => onMovieClick(movie?.imdbID)}
                className="flex flex-col justify-start items-start"
                key={movie?.imdbID}
              >
                <div className="cursor-pointer hover:text-blue-500">
                  {movie?.Title} ({movie?.Year})
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <div>No movies found</div>
        )}
      </div>
      <Modal
        className="flex flex-col justify-center items-center"
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <MovieDetailModal movie={movieDetails} />
      </Modal>
    </div>
  );
};

export default MovieSearch;
