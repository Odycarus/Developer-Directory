import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { apiFetch } from "../api/api";


const DeveloperContext = createContext();


export function DeveloperProvider({ children }) {

  const [developers, setDevelopers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);


  async function fetchDevelopers() {

    try {

      setLoading(true);


      const response = await apiFetch(
        "/developers/"
      );


      const data =
        await response.json();


      const formattedUsers = data.map((user) => ({

        id: user.id,

        name: user.name,

        title: user.title,

        location: user.location,

        avatar: user.avatar,

        skills: user.skills || [],

      }));


      setDevelopers(formattedUsers);


    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    fetchDevelopers();

  }, []);


  return (

    <DeveloperContext.Provider
      value={{
        developers,
        loading,
        error,
        refreshDevelopers: fetchDevelopers,
      }}
    >

      {children}

    </DeveloperContext.Provider>

  );

}


export function useDeveloperContext() {

  return useContext(
    DeveloperContext
  );

}