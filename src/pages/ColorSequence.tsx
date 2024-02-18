import { Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import left_arrow from "../assets/left-arrow.svg";

const color_set = [
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
  const navigate = useNavigate();
  const [color_sequence, setColorSequence] = useState<string[]>([]);
  const [shuffled_sequence, setShuffledSequence] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setColorSequence(shuffleArray([...color_set]));
    setShuffledSequence(shuffleArray([...color_set]));
  }, []);

  useEffect(() => {
    if (index === 9) {
      alert("Good Job!");
      setColorSequence(shuffleArray([...color_set]));
      setShuffledSequence(shuffleArray([...color_set]));
      setIndex(0);
    }
  }, [index]);

  function checkSequence(color: string) {
    console.log(color);
    console.log(color_sequence[index]);
    if (color_sequence[index] === color) {
      setIndex((index) => index + 1);
    } else {
      setIndex(0);
    }
  }

  return (
    <>
      <img
        src={left_arrow}
        onClick={() => navigate("/")}
        className="absolute m-5 w-12 rounded-xl hover:cursor-pointer hover:bg-blue-300"
      />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        direction="column"
        gap="1.5rem"
        width="50%"
        margin="auto"
      >
        <Grid container justifyContent="center">
          {color_sequence.map((color, index) => (
            <div
              className="min-h-8 min-w-8"
              key={index}
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </Grid>
        <Grid container gap="0.75rem" flexWrap="wrap" justifyContent="center">
          {shuffled_sequence.map((color, idx) => {
            const matchingIndex: number = color_sequence.indexOf(color);
            return (
              <Button
                key={idx}
                variant="contained"
                sx={{
                  minWidth: "11rem",
                  minHeight: "5rem",
                  bgcolor: index > matchingIndex ? color : "#0d9488",
                }}
                onClick={() => checkSequence(color)}
              ></Button>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
