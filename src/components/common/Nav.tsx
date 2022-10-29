import Link from "next/link";
import React, { FC, useContext } from "react";
import Image from 'next/image';
import { userContext } from '../context/UserContext';

export const Nav: FC = () => {
  const categories = ["All", "Action", "Comedy", "Drama", "Musical", "Thriller/Suspense", "Romantic Comedy", "Adventure"];
  
  const {setCategory} = useContext(userContext)

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    setCategory(e.target.value)
  }

  return (
    <nav className="w-full flex gap-10 p-6 items-center space-x-4 text-2xl text-black">
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/movies">
        <a>Movies</a>
      </Link>
      <select className="bg-white border border-black rounded-sm" onChange={handleSelect}>
        {categories.map((option, idx) => (
          <option value={option} key={idx}>{option}</option>
        ))}
      </select>
    </nav>
  );
};
