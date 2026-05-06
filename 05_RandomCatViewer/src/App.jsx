import { useState } from "react";
import { useEffect } from "react";
import Loader from "../assets/Loader";
function App() {
  const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-100vh bg-#000 m-75">
        <Loader/>
      </div>
    );
  }
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}

export default App;
