import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface Lyrics {
  lyric: string;
  color: string;
}

function getColor(id: string) {
  switch (id) {
    case "first":
      return "bg-purple-500";
    case "second":
      return "bg-lime-500";
    case "third":
      return "bg-cyan-500";
    case "fourth":
      return "bg-pink-500";
    default:
      return "";
  }
}

function CompleteTheLyrics() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [lyric, setLyric] = useState<string>("");
  const [lyrics, setLyrics] = useState<Lyrics[]>([]);

  useEffect(() => {
    if (lyric.length > 0) {
      console.log("test");
      setLyric("");
      setLyrics([...lyrics, { lyric: lyric, color: getColor(id!) }]);
    }
  }, [location]);

  return (
    <>
      <div className="m-auto flex h-screen w-8/12 flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold">Complete The Lyrics</p>

        <div className="flex flex-row text-white">
          <button
            onClick={() => navigate("/singers/first")}
            className="rounded-l-full bg-purple-500 px-3 py-2 text-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
          >
            First Singer
          </button>
          <button
            onClick={() => navigate("/singers/second")}
            className="bg-lime-500 px-3 py-2 text-lg hover:bg-lime-700 focus:outline-none focus:ring focus:ring-lime-300"
          >
            Second Singer
          </button>
          <button
            onClick={() => navigate("/singers/third")}
            className="bg-cyan-500 px-3 py-2 text-lg hover:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300"
          >
            Third Singer
          </button>
          <button
            onClick={() => navigate("/singers/fourth")}
            className="rounded-r-full bg-pink-500 px-3 py-2 text-lg hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300"
          >
            Fourth Singer
          </button>
        </div>
        {id && (
          <input
            type="text"
            className="w-9/12 rounded-full px-4 py-3 ring-2 ring-neutral-400"
            onChange={(e) => setLyric(e.target.value)}
            value={lyric}
          />
        )}
        <div className="mb-5 flex min-h-[60%] w-full flex-col gap-2 overflow-y-scroll rounded-l-lg p-4 text-white ring-2 ring-neutral-400">
          {lyrics.map((object, index) => (
            <p key={index} className={`${object.color} rounded-full px-6 py-3 text-lg`}>
              {object.lyric}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default CompleteTheLyrics;
