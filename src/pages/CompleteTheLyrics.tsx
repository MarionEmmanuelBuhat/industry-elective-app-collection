import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HomeButton } from "../components/components";

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
  const index = useRef<number>(0);
  const { id } = useParams();
  const [lyric, setLyric] = useState<string>("");
  const [lyrics, setLyrics] = useState<Lyrics[]>([]);

  useEffect(() => {
    const currentLyric: Lyrics = { lyric: lyric, color: getColor(id!) };

    if (lyric !== "") {
      if (lyrics.length === index.current + 1) {
        let newLyrics = [...lyrics];
        newLyrics[index.current] = currentLyric;
        setLyrics(newLyrics);
      } else {
        setLyrics([...lyrics, currentLyric]);
      }
    } else {
      if (lyrics.length === index.current + 1) {
        lyrics.pop();
        // This forces a re-render
        const newLyrics = [...lyrics];
        setLyrics(newLyrics);
      }
    }
  }, [lyric]);

  function handleClick(location: string) {
    if (lyrics.length > index.current) {
      index.current = index.current + 1;
    }

    setLyric("");
    navigate(location);
  }

  return (
    <>
      <HomeButton />
      <div className="m-auto flex h-screen w-8/12 flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold">Complete The Lyrics</p>

        <div className="flex flex-row text-white">
          {Array.from({ length: 4 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                handleClick(
                  [
                    "/singers/first",
                    "/singers/second",
                    "/singers/third",
                    "/singers/fourth",
                  ][index]
                );
              }}
              className={
                [
                  "rounded-l-full bg-purple-500 px-3 py-2 text-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300",
                  "bg-lime-500 px-3 py-2 text-lg hover:bg-lime-700 focus:outline-none focus:ring focus:ring-lime-300",
                  "bg-cyan-500 px-3 py-2 text-lg hover:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300",
                  "rounded-r-full bg-pink-500 px-3 py-2 text-lg hover:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300",
                ][index]
              }
            >
              {["First Singer", "Second Singer", "Third Singer", "Fourth Singer"][index]}
            </button>
          ))}
        </div>

        {id && (
          <input
            type="text"
            className="w-9/12 rounded-full px-4 py-3 ring-2 ring-neutral-400"
            onChange={(e) => setLyric(e.target.value)}
            value={lyric}
          />
        )}

        <div className="flex max-h-[60vh] min-h-[60vh] w-full flex-col gap-2 overflow-y-scroll rounded-l-lg p-4 text-white ring-2 ring-neutral-400">
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
