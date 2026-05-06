import { useEffect, useState } from "react";
import Loader from "../assets/Loader";

const url = "https://api.freeapi.app/api/v1/public/meals";

function App() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const result = await res.json();

        const formattedMeals = result?.data?.data.map((item) => {
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = item[`strIngredient${i}`];
            const measure = item[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
              ingredients.push(`${ingredient} - ${measure}`);
            }
          }
          return {
            id: item.idMeal,
            name: item.strMeal,
            strCategory: item.strCategory,
            recipe: item.strInstructions,
            image: item.strMealThumb,
            youtube: item.strYoutube,
            ingredients,
          };
        });

        setMeals(formattedMeals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (meals.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <Loader />
      </div>
    );
  }

  const showRecipe = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <>
      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => showRecipe(meal)}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {meal.name}
                </h3>

                <h4 className="text-sm text-gray-500 mb-2">
                  {meal.strCategory}
                </h4>

                <p className="text-sm text-gray-600 mb-4">
                  {meal.recipe.length > 120
                    ? meal.recipe.slice(0, 120) + "..."
                    : meal.recipe}
                </p>
              </div>

              <a
                href={meal.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-block text-center bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                ▶ Watch Recipe
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="flex flex-col relative bg-white max-w-2xl w-full rounded-xl p-6  overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-xl text-black font-bold cursor-pointer hover:text-red-500"
              onClick={() => setSelectedMeal(null)}
            >
              ✕
            </button>

            <div className="flex flex-col justify-center items-center">
              <img
                src={selectedMeal.image}
                alt={selectedMeal.name}
                className=" w-[75%] h-60 object-cover rounded-sm mb-4"
              />

              <h2 className="text-xl font-bold mb-2">{selectedMeal.name}</h2>

              <p className="text-sm text-gray-500 mb-3">
                {selectedMeal.strCategory}
              </p>

              <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">
                {selectedMeal.recipe}
              </p>

              <a
                href={selectedMeal.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                ▶ Watch Full Recipe
              </a>

              {selectedMeal.ingredients?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {selectedMeal.ingredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
