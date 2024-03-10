import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeButton } from "../components/components";

interface ColorItem {
  color: string;
  points: number;
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 9); // Generates random integer from 0 to 8
}

function ColorRoll() {
  const navigate = useNavigate();
  const [color_set, setColorSet] = useState<ColorItem[]>([
    { color: "#999999", points: 0 }, // Red
    { color: "#00FF00", points: 0 }, // Green
    { color: "#00FFFF", points: 0 }, // Aqua
    { color: "#FFFF00", points: 0 }, // Yellow
    { color: "#FFA500", points: 0 }, // Orange
    { color: "#EE82EE", points: 0 }, // Violet
    { color: "#FF00FF", points: 0 }, // Magenta
    { color: "#FFC0CB", points: 0 }, // Pink
    { color: "#ADD8E6", points: 0 }, // Light Blue
  ]);
  const [rolling, setRolling] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>(null);
  const [highlighted, setHighlighted] = useState<number>(-1);

  function handleClick() {
    if (!rolling) {
      setRolling(true);

      const timer = setInterval(() => {
        setHighlighted(getRandomNumber());
      }, 75);

      setTimer(timer);
      return;
    }

    clearInterval(timer);
    setTimer(null);

    let new_color_set = [...color_set];
    new_color_set[highlighted].points += 1;
    setColorSet(new_color_set);
    setRolling(false);
  }

  function handleBackButton() {
    clearInterval(timer);
    setTimer(null);

    navigate(-1);
  }

  return (
    <>
      <HomeButton handleClick={handleBackButton} />

      <div className="m-auto flex h-screen w-1/2 flex-col items-center justify-center gap-4">
        <div className="flex justify-center gap-2">
          {color_set.map((object, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6"
              style={{ backgroundColor: object.color }}
            >
              <p key={index} className="absolute">
                {object.points}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-flow-row grid-cols-3 gap-4">
          {color_set.map((object, index) => (
            <div
              key={index}
              className={`rounded-lg px-20 py-[4.5rem] shadow-md 
              ${highlighted === index && "ring-2 ring-blue-500"}`}
              style={{ backgroundColor: object.color }}
            ></div>
          ))}
        </div>

        <button
          onClick={handleClick}
          className={`rounded bg-blue-500 p-3 font-bold text-white transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 
          ${rolling && "bg-red-500 hover:bg-red-700 focus:ring-red-300"}`}
        >
          {rolling ? "Stop Rolling" : "Start Rolling"}
        </button>
      </div>
    </>
  );
}

export default ColorRoll;
