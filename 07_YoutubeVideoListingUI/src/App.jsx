import { useState, useEffect } from "react";

function App() {
  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();

        const videoList = json?.data?.data?.map((item) => {
          const video = item?.items;

          return {
            id: video?.id,
            title: video?.snippet?.title,
            image: video?.snippet?.thumbnails?.standard?.url,
            channel: video?.snippet?.channelTitle,
            viewCount: video?.statistics?.viewCount || 0,
            likeCount: video?.statistics?.likeCount || 0,
            commentCount: video?.statistics?.commentCount || 0,
          };
        }) || [];

        setVideos(videoList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">📺 YouTube Clone</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-[#181818] rounded-xl overflow-hidden hover:scale-[1.04] transition cursor-pointer"
          >
            <img
              src={video.image}
              alt={video.title}
              className="w-full h-50 object-cover"
            />

            <div className="p-3">
              <h2 className="text-sm font-semibold line-clamp-2">
                {video.title}
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                {video.channel}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                👀 {video.viewCount} views • ❤️ {video.likeCount}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                💬 {video.commentCount} comments
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;