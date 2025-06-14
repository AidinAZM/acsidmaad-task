import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieList from "@/components/MovieList";
import Image from "next/image";

async function getMovies({
  genres,
  sortMethod,
}: {
  genres: string;
  sortMethod: string;
}) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&${
      genres != "" ? `with_genres=${genres}&` : ""
    }sort_by=${sortMethod}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

interface HomeProps {
  searchParams: {
    genre?: string;
    sortMethod?: string;
    [key: string]: string | undefined;
  };
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  [key: string]: any;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function Home(query: HomeProps) {
  let genres = query.searchParams.genre || "";
  let sortMethod = query.searchParams.sortMethod || "popularity.desc";

  const movies: MoviesResponse = await getMovies({ genres, sortMethod });

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
