import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Planet from "./Planet";

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status, isPreviousData } = useQuery(
    ["planets", page],
    () => fetchPlanets(page),
    {
      //staleTime: 0,
      //cacheTime: 10,
      //onSuccess: () => console.log("Data fetched with no problem"),
      keepPreviousData: true,
    }
  );

  const fetchPlanets = async (page) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  };

  console.log("Page:", page);
  console.log("Previous query:", isPreviousData);
  console.log("Data:", data);

  return (
    <div>
      <h2>Planets</h2>
      <span>Current Page: {page}</span>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          if (!isPreviousData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={page === 6}
      >
        Next Page
      </button>
      {status === "error" && <div>Error fetching data</div>}
      {status === "loading" && <div>Loading data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
