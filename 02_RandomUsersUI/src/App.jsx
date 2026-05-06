import { useEffect, useState } from "react";
import "./style.css";
const url = "https://api.freeapi.app/api/v1/public/randomusers";
function App() {
  const [data, setData] = useState(null);
  const [hoverId, setHoverId] = useState(null);

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

  const users = [];
  if (data) {
    const dataLength = data.data.data.length;

    for (let i = 0; i < dataLength; i++) {
      users.push({
        title: data?.data?.data[i]?.name.title,
        firstName: data?.data?.data[i]?.name.first,
        lastName: data?.data?.data[i]?.name.last,

        city: data?.data?.data[i]?.location.city,
        state: data?.data?.data[i]?.location.state,
        country: data?.data?.data[i]?.location.country,

        picture: data?.data?.data[i]?.picture.large,

        age: data?.data?.data[i]?.dob.age,

        id: data?.data?.data[i]?.id,

        email: data?.data?.data[i]?.email,
        phone: data?.data?.data[i]?.phone,
      });
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-5">
        {users.map((user) => (
          <div
            className="flex flex-col border border-black p-5 justify-center items-center rounded-lg shadow-md  hover:bg-amber-500 hover:text-amber-50"
            key={user.id}
            onMouseEnter={() => setHoverId(user.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <img
              src={user.picture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-40 h-40 object-cover rounded-full"
            />

            <div className="flex gap-3 items-center mt-2 justify-around">
              <h3>{`${user.title} ${user.firstName} ${user.lastName}`}</h3>
              <h4>{user.age} years</h4>
            </div>

            <div className="text-red-700 flex gap-1 mt-2 ">
              <span className="font-bold">Address:</span>
              <span className="text-black">
                {`${user.city}, ${user.state}`}
                <span className="font-semibold">{`, ${user.country}`}</span>
              </span>
            </div>

            <div
              className={`m-5 transition-all duration-500 ease-in-out transform text-black ${
                hoverId === user.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 pointer-events-none"
              } `}
            >
              <div className="flex gap-2">
                <div className="font-semibold">Email : </div>
                {user.email}
              </div>
              <div className="flex gap-2">
                <div className="font-semibold">Phone : </div>
                {user.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
