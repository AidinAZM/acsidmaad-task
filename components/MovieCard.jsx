"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import CircularMovieScore from "./CircularMovieScore";

function MovieCard({
  movieTitle,
  movieReleaseDate,
  moviePosterPath,
  movieOverview,
  movieVoteAvg,
}) {
  return (
    <Card className="my-2 rounded-[8px] w-[100%] flex md:block bg-[#fcfcfa]">
      <CardHeader className="relative aspect-[2/1] md:aspect-[1/1.5] ">
        <Image
          src={`https://media.themoviedb.org/t/p/original/${moviePosterPath}`}
          alt="test"
          fill={true}
          className="rounded-l-[8px] md:rounded-bl-none md:rounded-tr-[8px]"
        />
        <CircularMovieScore percentage={Math.floor(movieVoteAvg * 10)} />
      </CardHeader>
      <CardContent className="p-[10px] py-[15px] md:h-[78px] md:p-3 md:mt-3">
        <div>
          <h2 className="font-bold">{movieTitle}</h2>
          <span className="text-gray-500">{movieReleaseDate}</span>
        </div>
        <p className="text-sm mt-3 md:hidden overflow-hidden text-ellipsis line-clamp-2">
          {movieOverview}
        </p>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
