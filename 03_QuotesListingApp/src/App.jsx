import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const url = "https://api.freeapi.app/api/v1/public/quotes";
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
  const quotesData = [];
  if (data) {
    const dataLength = data.data.data.length;

    for (let i = 0; i < dataLength; i++) {
      quotesData.push({
        author: data.data.data[i].author,
        content: data.data.data[i].content,
        id: data.data.data[i].id,
      });
    }
  }
  return (
    <Carousel>
      {quotesData.map((data) => (
        <Carousel.Item key={data.id} className="flex flex-col">
          <div className="flex flex-column align-items-center justify-content-center p-5">
            <h1 className="text-white m-5 w-75 text-center font-serif">" {data.content} "</h1>
            <h3 className="m-5 text-red-600! font-bold!">{data.author}</h3>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default App;
