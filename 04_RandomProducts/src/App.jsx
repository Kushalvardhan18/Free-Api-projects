import { useState } from "react";
import { useEffect } from "react";

const url = "https://api.freeapi.app/api/v1/public/randomproducts";
function App() {
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
  const products = [];
  if (data) {
    const dataLength = data.data.data.length;
    for (let i = 0; i < dataLength; i++) {
      products.push({
        title: data.data.data[i].title,
        desc: data.data.data[i].description,
        price: data.data.data[i].price,

        image: data.data.data[i].thumbnail,
        id: data.data.data[i].id,

        stock: data.data.data[i].stock,
        rating: data.data.data[i].rating,
      });
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-stretch gap-8 my-10 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-75 bg-white rounded-2xl shadow-md overflow-hidden 
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 cursor-pointer"
        >
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />

            <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {product.rating.toFixed(1)} ⭐
            </span>
          </div>

          <div className="p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <h4 className="font-semibold text-gray-800 text-base leading-snug">
                {product.title}
              </h4>

              <span className="text-lg font-bold text-emerald-600 whitespace-nowrap">
                ${product.price}
              </span>
            </div>

            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {product.desc}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  product.stock > 5
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                Only {product.stock} left
              </span>

              <span className="text-xs text-gray-500">
                Rating: {product.rating.toFixed(1)}/5
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
