"use client";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularMovieScoreProps {
  percentage: number;
  position?: string;
  size: number;
}

function CircularMovieScore({
  percentage,
  position,
  size,
}: CircularMovieScoreProps) {
  let pathColor = "#9ca3af";
  let trailColor = "#374151";
  if (percentage >= 70) {
    pathColor = "green";
    trailColor = "#052e16";
  } else if (percentage < 70 && percentage >= 40) {
    pathColor = "yellow";
    trailColor = "#422006";
  } else if (percentage < 40) {
    pathColor = "red";
    trailColor = "#450a0a";
  }
  return (
    <div
      className={`${
        position == "absolute"
          ? "hidden md:block absolute bottom-[-19px] left-[10px]"
          : ""
      } box-border rounded-full bg-black`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          pathColor: pathColor,
          textColor: "white",
          backgroundColor: "black",
          trailColor: trailColor,
          textSize: "24px",
        })}
        className="font-bold"
      />
    </div>
  );
}

export default CircularMovieScore;
