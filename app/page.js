import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import { Button } from "@/components/ui/button";

async function getMovies({ genres, sortMethod }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&${
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
  return data;
}

export default async function Home(query) {
  let genres = query.searchParams.genre || "";
  let sortMethod = query.searchParams.sortMethod || "popularity.desc";

  const movies = await getMovies({ genres, sortMethod });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 px-10">
      <Header />
      {movies.results.length > 0 ? (
        <MovieList
          intialMovies={movies.results}
          genres={genres}
          sortMethod={sortMethod}
        />
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </main>
  );
}
