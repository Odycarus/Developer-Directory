import { createContext, useContext, useState, useEffect } from "react";
import createSlug from "../utils/slug";


const DeveloperContext = createContext();

export function DeveloperProvider({ children }) {

  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    async function fetchUsers() {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/api/developers/"
        );


        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }


        const data = await response.json();


        const formattedUsers = data.map((user) => ({
  id: user.id,
  name: user.name,
  slug: createSlug(user.name),
  title: user.title,
  affiliation: user.affiliation,
  location: user.location,
  skills: user.skills,
  description: user.description,
  avatar: user.avatar,
}));



        setDevelopers(formattedUsers);


      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    }


    fetchUsers();

  }, []);


  return (
    <DeveloperContext.Provider
      value={{
        developers,
        loading,
        error,
      }}
    >

      {children}

    </DeveloperContext.Provider>
  );
}



export function useDeveloperContext() {

  return useContext(DeveloperContext);

}