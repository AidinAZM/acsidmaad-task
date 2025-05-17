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

  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWEyZDY1ODlmODI3ZWFkMDQ4ZTVjZjEzY2U0ZGY4YyIsIm5iZiI6MTc0NzA2ODU3OC42MzMsInN1YiI6IjY4MjIyNmEyYjkwYzI3ZDA5NWFkOTU3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXvR-KWxbkhGoshDpsiWp5-AGrMzgDZV_qp_eI3XyXE",
      },
    }
  );
  const credits = await creditsRes.json();

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
    <div className="h-[100vh] bg-[#fffff0] lg:flex ">
      <div className="flex items-center bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,1)),url('https://media.themoviedb.org/t/p/w500/qdKGpTHVaaKaFTnRynQDg4qHdEv.jpg')] bg-cover bg-center h-64 lg:bg-gradient-to-r lg:from-[#fffff0] lg:to-black lg:justify-center w-full lg:h-full relative lg:px-[30px] lg:py-[40px]">
        {/* <Image
          src={`https://media.themoviedb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="aspect-[9/4] opacity-50  lg:hidden"
        /> */}
        <Image
          src={`https://media.themoviedb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={100}
          height={150}
          className="hidden lg:block ml-10 rounded-md z-10 shadow-lg w-[50%] aspect-[2/3]"
        />
      </div>
      <div className="relative bg-black text-white px-[50px] py-[40px]">
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
          <CircularMovieScore
            percentage={Math.floor(movie.vote_average * 10)}
            size={"50"}
            position={"block"}
          />
        </div>
        <div className="bg-black lg:bg-transparent text-white py-3 mt-2">
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
          <div className="py-6 grid grid-cols-2  overflow-clip">
            {credits.crew.slice(0, 4)?.map((crew) => (
              <div key={crew.id} className="p-4 ">
                <p className="font-bold">{crew.name}</p>
                <p className="font-normal text-sm">{crew.job}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
