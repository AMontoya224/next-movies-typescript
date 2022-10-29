import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { useContext } from "react";
import { userContext } from "./components/context/UserContext";
import {IMovie} from "./components/MovieList/MovieList";


// This middleware checks if the movie requested in /movies/:id exists.
// If not, it returns a redirect to /movies
export async function middleware (request: NextRequest) {
  const urlItems = request.nextUrl.pathname.split('/').filter((item) => item !== '');

  //const { category, number} = useContext(userContext);
  const category = "All";
  const number = 2;

  if (urlItems[0] === 'movies' && urlItems.length === 2) {
    const movieId = urlItems[1];

    // TODO: Improve perfomance. Fetching movies every time we make this check
    //  is too expensive.
    const movies: IMovie[] = await fetch(`https://api.npoint.io/8ba3b85d1c9abb10d83c/movies`)
      .then((res) => res.json())
      .then((data: IMovie[]) => category == "All"? data.slice(0, number*10) : data.filter(e=>e["Major Genre"] === category).slice(0, number*10))
      .catch((error) => console.error(error)) as IMovie[];

    if (!movies.some((movie) => movie.id === Number(movieId))) {
      return NextResponse.redirect(new URL('/movies', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/movies/:id*' ]
};
