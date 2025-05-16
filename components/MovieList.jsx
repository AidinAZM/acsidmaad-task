"use client";

import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function MovieList({ intialMovies, genres, sortMethod }) {
  const [movies, setMovies] = useState(intialMovies);
  let page = 1;

  const loadMoreMovies = async () => {
    const nextPage = page + 1;

    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nextPage}&${
        genres != "" ? `with_genres=${genres}&` : ""
      }sort_by=${sortMethod}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWEyZDY1ODlmODI3ZWFkMDQ4ZTVjZjEzY2U0ZGY4YyIsIm5iZiI6MTc0NzA2ODU3OC42MzMsInN1YiI6IjY4MjIyNmEyYjkwYzI3ZDA5NWFkOTU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXvR-KWxbkhGoshDpsiWp5-AGrMzgDZV_qp_eI3XyXE",
        },
      }
    );
    const data = await res.json();
    setMovies((prevMovies) => [...prevMovies, ...data.results]);
    page = nextPage;
  };

  useEffect(() => {
    setMovies(intialMovies);
    page = 1;
  }, [intialMovies]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreMovies();
        }
      },
      { threshold: 1.0 }
    );
    const footer = document.querySelector("#footer");
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div className="mt-4 md:grid md:grid-cols-4 md:gap-4 lg:gap-5 lg:grid-cols-5 xl:gap-6 xl:grid-cols-6">
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            movieID={movie.id}
            movieTitle={movie.title}
            moviePosterPath={movie.poster_path}
            movieReleaseDate={movie.release_date}
            movieOverview={movie.overview}
            movieVoteAvg={movie.vote_average}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieList;
