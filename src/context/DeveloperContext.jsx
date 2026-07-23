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
          "https://jsonplaceholder.typicode.com/users"
        );


        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }


        const data = await response.json();


        const formattedUsers = data.map((user) => ({
  name: user.name,
  slug: createSlug(user.name),
  title: user.company.name,
  location: `${user.address.city}, ${user.address.zipcode}`,
  skills: ["React", "JavaScript"],
  description: `Hello, my name is ${user.name}. I work at ${user.company.name}, and I currently reside in ${user.address.city}.`,
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