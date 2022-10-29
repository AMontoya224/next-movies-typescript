import React, {GetStaticProps, NextPage} from "next";
import { useContext, useState } from "react";
import { ApplicationWrapper } from "../../components/layout/ApplicationWrapper";
import {IMovie, MovieList} from "../../components/MovieList/MovieList";
import { userContext } from "../../components/context/UserContext";


interface TProps {
  movies: IMovie[],
  response: string;
}

const Movies: NextPage<TProps> = ({ movies }) => {
  const {number, setNumber} = useContext(userContext);

  function handleClick() {
    setNumber(number+1);
  }

  return (
    <ApplicationWrapper
      title="Movies"
      description="Movies of the rootlab movies website"
    >
      <MovieList movies={movies} />
      <button onClick={handleClick} className="bg-red-900 m-7 w-32 text-xl ml-auto mr-auto p-1 rounded-sm">Ver más</button> 
    </ApplicationWrapper>
  );
};  

export default Movies;



export const getStaticProps: GetStaticProps = async (context) => {
  const {category, number} = useContext(userContext);

  const movies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`)
    .then((res) => res.json())
    .then((data: IMovie[]) => category == "All"? data.slice(0, number*10) : data.filter(e=>e["Major Genre"] === category).slice(0, number*10))
    .catch((error) => console.error(error));
  
  
  return {
    props: {
      movies
    },

    // Incremental static regeneration
    revalidate: 10
  };
};
