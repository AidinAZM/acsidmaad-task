import CircularMovieScore from "@/components/CircularMovieScore";
import Image from "next/image";

async function MoviePage({ params }) {
  console.log(params.id);
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWEyZDY1ODlmODI3ZWFkMDQ4ZTVjZjEzY2U0ZGY4YyIsIm5iZiI6MTc0NzA2ODU3OC42MzMsInN1YiI6IjY4MjIyNmEyYjkwYzI3ZDA5NWFkOTU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXvR-KWxbkhGoshDpsiWp5-AGrMzgDZV_qp_eI3XyXE",
      },
    }
  );
  const movie = await res.json();

  const calculateRuntime = (runtime) => {
    let total = runtime;
    let h = 0;
    let m = 0;
    while (total > 0) {
      if (total > 60) {
        h++;
        total = total - 60;
      } else {
        m = total;
        total = 0;
      }
    }
    return `${h}h${m}m`;
  };

  return (
    <div className="my-auto h-[100vh] bg-[#fffff0] md:flex ">
      <div className="flex items-center bg-gradient-to-r from-[#fffff0] to-black md:justify-center w-full md:h-full relative md:px-[30px] md:py-[40px]">
        <Image
          src={`https://media.themoviedb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="aspect-[9/4] md:hidden"
        />
        <Image
          src={`https://media.themoviedb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={100}
          height={150}
          className=" ml-10 rounded-md z-10 shadow-lg border md:w-[50%] aspect-[2/3]"
        />
      </div>
      <div className="relative md:bg-black text-white md:px-[30px] md:py-[40px]">
        {/* <Image
          src={`https://media.themoviedb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="aspect-[9/4] opacity-50"
        /> */}
        <div className="flex justify-center items-center font-bold p-3 text-xl ">
          {movie.title}{" "}
          <span className="ml-2">{`(${
            movie.release_date.split("-")[0]
          })`}</span>
        </div>
        <div className="flex justify-center items-center font-bold py-2 text-lg relative">
          <span className="mr-2">User Score</span>
          <CircularMovieScore percentage={movie.vote_average * 10} />
        </div>
        <div className="bg-black md:bg-transparent text-white py-3 mt-2">
          <div className="flex justify-center items-center p-1">
            <div className="p-1 border rounded-sm text-gray-400 mr-4">PG</div>
            <div>{`${movie.release_date.split("-")[2]}/${
              movie.release_date.split("-")[1]
            }/${movie.release_date.split("-")[0]}`}</div>
            {movie.origin_country.map((country) => (
              <p key={country} className="ml-1">{`(${country})`}</p>
            ))}
            <div className="ml-4">{calculateRuntime(movie.runtime)}</div>
          </div>
          <div className="flex justify-center items-center p-1">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="mx-1 text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="py-10 px-4">
          <p className="italic opacity-70">{movie.tagline}</p>
          <h2 className="font-bold my-2">Overview</h2>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
