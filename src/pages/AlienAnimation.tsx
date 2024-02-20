import { useEffect, useState } from "react";
import left_arrow from "../assets/left-arrow.svg";
import { useNavigate } from "react-router-dom";
import dock1 from "../assets/moves/dock-1.png";
import dock2 from "../assets/moves/dock-2.png";
import dock3 from "../assets/moves/dock-3.png";
import dock4 from "../assets/moves/dock-4.png";
import jump1 from "../assets/moves/jump-1.png";
import jump2 from "../assets/moves/jump-2.png";
import jump3 from "../assets/moves/jump-3.png";
import jump4 from "../assets/moves/jump-4.png";
import jump5 from "../assets/moves/jump-5.png";
import jump6 from "../assets/moves/jump-6.png";
import jump7 from "../assets/moves/jump-7.png";
import left1 from "../assets/moves/left-1.png";
import left2 from "../assets/moves/left-2.png";
import left3 from "../assets/moves/left-3.png";
import left4 from "../assets/moves/left-4.png";
import left5 from "../assets/moves/left-5.png";
import right1 from "../assets/moves/right-1.png";
import right2 from "../assets/moves/right-2.png";
import right3 from "../assets/moves/right-3.png";
import right4 from "../assets/moves/right-4.png";
import right5 from "../assets/moves/right-5.png";

const duck_frames = [dock1, dock2, dock3, dock4, dock4, dock4, dock3, dock2, dock1];
const jump_frames = [jump1, jump2, jump3, jump4, jump5, jump6, jump7];
const left_frames = [
  left1,
  left2,
  left3,
  left4,
  left5,
  right1,
  right2,
  right3,
  right4,
  right5,
];
const right_frames = [
  right1,
  right2,
  right3,
  right4,
  right5,
  left1,
  left2,
  left3,
  left4,
  left5,
];

const jump_styles = ["", "", "", "pb-[3rem]", "pb-[6rem]", "pb-[9rem]", "pb-[12rem]"];
const left_styles = [
  "",
  "pr-[5rem]",
  "pr-[10rem]",
  "pr-[15rem]",
  "pr-[20rem]",
  "pr-[20rem]",
  "pr-[15rem]",
  "pr-[10rem]",
  "pr-[5rem]",
  "",
];
const right_styles = [
  "",
  "pl-[5rem]",
  "pl-[10rem]",
  "pl-[15rem]",
  "pl-[20rem]",
  "pl-[20rem]",
  "pl-[15rem]",
  "pl-[10rem]",
  "pl-[5rem]",
  "",
];
const duck_styles = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

function AlienAnimation() {
  const navigate = useNavigate();
  const [active, setActive] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [timer, setTimer] = useState<any>(null);

  const [frame, setFrame] = useState<number>(0);
  const [image_array, setImageArray] = useState<any>([]);
  const [image_styles, setImageStyle] = useState<any>([]);

  useEffect(() => {
    duck_frames.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    jump_frames.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    left_frames.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
    
    right_frames.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  useEffect(() => {
    setImage(image_array[frame]);
  }, [frame]);

  function handleRelease() {
    setFrame(0);
    clearInterval(timer);
    setActive(false);
  }

  function handleJump() {
    setActive(true);
    setImageArray(jump_frames);
    setImageStyle(jump_styles);

    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % jump_frames.length);
    }, 100);

    setTimer(timer);
  }

  function handleLeft() {
    setActive(true);
    setImageArray(left_frames);
    setImageStyle(left_styles);

    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % left_frames.length);
    }, 100);

    setTimer(timer);
  }

  function handleRight() {
    setActive(true);
    setImageArray(right_frames);
    setImageStyle(right_styles);

    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % right_frames.length);
    }, 100);

    setTimer(timer);
  }

  function handleDuck() {
    setActive(true);
    setImageArray(duck_frames);
    setImageStyle(duck_styles);

    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % duck_frames.length);
    }, 150);

    setTimer(timer);
  }

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className={"absolute m-5 w-12 rounded-xl hover:bg-blue-300"}
      >
        <img src={left_arrow} />
      </button>

      <div className="mx-auto flex h-screen w-[80vw] items-center justify-center">
        <div className="flex w-full flex-col gap-4 rounded p-5 ring-2 ring-slate-200">
          <div className="flex flex-row justify-center gap-2">
            <button
              onMouseDown={handleJump}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 hover:bg-blue-400 active:bg-blue-500"
            >
              Jump
            </button>
            <button
              onMouseDown={handleLeft}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 hover:bg-blue-400 active:bg-blue-500"
            >
              Left
            </button>
            <button
              onMouseDown={handleRight}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 hover:bg-blue-400 active:bg-blue-500"
            >
              Right
            </button>
            <button
              onMouseDown={handleDuck}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 hover:bg-blue-400 active:bg-blue-500"
            >
              Duck
            </button>
          </div>

          <div className="m-auto flex h-[75vh] w-full flex-col-reverse items-center justify-items-center rounded p-2 ring-2 ring-slate-400">
            {active && (
              <img src={image} className={`box-content w-[20%] ${image_styles[frame]}`} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AlienAnimation;
