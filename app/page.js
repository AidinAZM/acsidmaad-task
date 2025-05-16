import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";

async function getMovies({ genres, sortMethod, searchQuery }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${
      searchQuery != "" ? `query=${searchQuery}&` : ""
    }include_adult=false&include_video=false&language=en-US&page=1&${
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
  console.log("query :", query);
  let genres = query.searchParams.genre || "";
  let sortMethod = query.searchParams.sortMethod || "popularity.desc";
  let searchQuery = query.searchParams.q || "";
  const movies = await getMovies({ genres, sortMethod, searchQuery });
  console.log(movies);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 px-10">
      <Header />
      <div>Hello Acsidmaad!</div>

      {movies.results.length > 0 ? (
        <div className="md:grid md:grid-cols-4 md:gap-4 lg:gap-5 lg:grid-cols-5 xl:gap-6 xl:grid-cols-6">
          {movies.results.map((movie) => (
            <div key={movie.id}>
              <MovieCard
                movieTitle={movie.title}
                moviePosterPath={movie.poster_path}
                movieReleaseDate={movie.release_date}
                movieOverview={movie.overview}
                movieVoteAvg={movie.vote_average}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </main>
  );
}
