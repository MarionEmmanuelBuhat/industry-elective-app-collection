import { useEffect, useState } from "react";

const map1 = new Map();

function generateSequence() {
  let color_set = [
    "#FFC0CB", // pink
    "#00008B", // dark blue
    "#FF0000", // red
    "#FFA500", // orange
    "#00FFFF", // cyan
    "#008000", // green
    "#9ACD32", // yellow green
    "#FFFF00", // yellow
    "#800080", // purple
  ];

  let colors = [];
  while (color_set.length > 0) {
    const index = Math.floor(Math.random() * color_set.length);
    const color = color_set.splice(index, 1)[0]; // Extract the color from the array returned by splice
    colors.push(color);
  }
  console.log(colors);
  return colors;
}

function shuffleArray(array: string[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function App() {
  const [colors, setColors] = useState<string[]>([]);
  const [shuffled_colors, setShuffledColors] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);
  const initial_color = "#0d9488";

  function checkSequence(color: string) {
    if (colors[index] === color) {
      setIndex((index) => index + 1);
    } else {
      setIndex(0);
    }
  }

  useEffect(() => {
    const color_sequence = generateSequence();
    setColors(color_sequence);
    setShuffledColors(shuffleArray([...color_sequence]));
    color_sequence.map((color, index) => map1.set(color, index));
  }, []);

  useEffect(() => {
    if (index === 9) {
      setTimeout(() => {
        alert("Good Job!");
        setColors((prevColors) => shuffleArray(prevColors));
        setShuffledColors((prevShuffledColors) =>
          shuffleArray(prevShuffledColors)
        );
        colors.forEach((color, idx) => map1.set(color, idx));

        setIndex(0);
      }, 50);
    }
  }, [index, colors, shuffled_colors]);

  return (
    <>
      <div className="m-auto flex h-screen w-1/2 flex-col items-center justify-center gap-6">
        <div className="flex">
          {colors.map((color) => (
            <div
              className="min-h-8 min-w-8"
              style={{ backgroundColor: color }}
              key={color}
            ></div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {shuffled_colors.map((color) => (
            <div
              className="min-h-20 min-w-44 rounded hover:cursor-pointer"
              onClick={() => checkSequence(color)}
              key={color}
              style={{
                backgroundColor:
                  map1.get(color) < index ? color : initial_color,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
