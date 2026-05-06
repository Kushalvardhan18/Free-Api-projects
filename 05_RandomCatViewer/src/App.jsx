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
        <Loader />
      </div>
    );
  }
  console.log(data?.data.image);
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 p-6">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col justify-center items-center mt-5">
          <img
            src={data?.data.image}
            alt={data?.data.name}
            className="w-fit h-72 object-contain  mb-1.5 max-w-100"
          />

          <h1 className="bottom-4 left-4 text-3xl font-bold text-red-600 drop-shadow-lg">
            {data?.data.name}
          </h1>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-gray-300 text-sm leading-relaxed">
            {data?.data.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Origin
              </p>
              <p className="text-white font-semibold">{data?.data.origin}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Temperament
              </p>
              <p className="text-white font-semibold">
                {data?.data.temperament}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
