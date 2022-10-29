import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import { IMovie } from "../../components/MovieList/MovieList";
import Image from 'next/image';

interface TProps {
  movie: IMovie;
}

const MovieDetailPage: NextPage<TProps> = ({ movie }) => {
  return (
    <ApplicationWrapper title={movie.Title}>
      <div className="ml-14 mr-14 text-center">
        <div className="absolute">
          <Image
            className="rounded-lg blur opacity-20"
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
            width={1420}
            height={630}
          />
        </div>
        <div className="flex justify-around items-center h-96 mt-28">
          <div>
            <p className="white text-2xl font-bold ml-6 text-left">{movie["Major Genre"]}</p>
            <h1 className="white text-7xl font-black mt-8 ml-5 text-left">{movie.Title}</h1>
            <div className="mt-10 ml-6 flex space-x-4 text-xl">
              <p><b>Date:</b> {movie["Release Date"]}</p>
              <p>|</p>
              <p className="text-amber-400"><b className="bg-amber-400 text-black rounded pl-1 pr-1">IMBb</b> {movie["IMDB Rating"]}</p>
              <p>|</p>
              <p><b>Votes:</b> {movie["IMDB Votes"]}</p>
            </div>
          </div>
          <div>
            <Image
              className="rounded-sm"
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              width={350}
              height={450}
            />
          </div>
        </div>
      </div>
    </ApplicationWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/movies/" + context.params?.id
  );
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
};

export default MovieDetailPage;
