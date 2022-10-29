import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';

export type userContextProps = {
  number: number,
  setNumber: (number:number)=>void
  category: string,
  setCategory: (category:string)=>void
}

export const userContext = createContext<userContextProps>({} as userContextProps);

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {

  const [number, setNumber] = useState(1);
  const [category, setCategory] = useState("All")

  return (<userContext.Provider value={{
    number,
    setNumber,
    category,
    setCategory
  }}>
    {children}
  </userContext.Provider>);
};
