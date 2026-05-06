import { useEffect, useState } from "react";

const url = "https://api.freeapi.app/api/v1/public/randomjokes";

function App() {
  const [jokes, setJokes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}?page=${page}&limit=10`);
        const result = await res.json();

        setJokes(result?.data?.data || []);
        setTotalPages(result?.data?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      
   
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        😂 Random Jokes
      </h1>

    
      <div className="w-full max-w-2xl space-y-4">
        {loading ? (
          <div className="text-center text-gray-500">Loading jokes...</div>
        ) : (
          jokes.map((joke) => (
            <div
              key={joke.id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <p className="text-gray-700">{joke.content}</p>
            </div>
          ))
        )}
      </div>

     
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition cursor-pointer hover:text-red-500"
        >
          Prev
        </button>

        <span className="text-gray-700 font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition cursor-pointer hover:text-red-500"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;