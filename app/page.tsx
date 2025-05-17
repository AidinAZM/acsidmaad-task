import Footer from "../components/Footer";
import Header from "../components/Header";
import MovieList from "../components/MovieList";

async function getMovies({ genres, sortMethod }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&${
      genres != "" ? `with_genres=${genres}&` : ""
    }sort_by=${sortMethod}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
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
      {movies.results?.length > 0 ? (
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
