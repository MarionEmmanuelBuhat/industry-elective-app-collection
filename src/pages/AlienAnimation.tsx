import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeButton } from "../components/components";
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

const jump_styles = ["", "", "", "pb-[4rem]", "pb-[8rem]", "pb-[4rem]", "pb-[0rem]"];
const left_styles = [
  "",
  "pr-[7rem]",
  "pr-[14rem]",
  "pr-[21rem]",
  "pr-[28rem]",
  "pr-[28rem]",
  "pr-[21rem]",
  "pr-[14rem]",
  "pr-[7rem]",
  "",
];
const right_styles = [
  "",
  "pl-[7rem]",
  "pl-[14rem]",
  "pl-[21rem]",
  "pl-[28rem]",
  "pl-[28rem]",
  "pl-[21rem]",
  "pl-[14rem]",
  "pl-[7rem]",
  "",
];
const duck_styles = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];

const all_frames = duck_frames.concat(jump_frames, left_frames, right_frames);

function AlienAnimation() {
  const [active, setActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<any>(null);

  const [frame, setFrame] = useState<number>(0);
  const [image_array, setImageArray] = useState<any>([]);
  const [image_styles, setImageStyle] = useState<any>([]);

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    all_frames.map((image) => {
      const img = new Image();
      img.src = image;
      setImages((prevImages) => [...prevImages, img]);
    });
  }, []);

  function clearTimer() {
    if (timer !== null) {
      clearInterval(timer);
      setTimer(null);
    }
  }

  function handleRelease() {
    setFrame(0);
    clearInterval(timer);
    setActive(false);
  }

  function initializeAction(imageArray: string[], imageStyle: string[]) {
    setActive(true);
    setImageArray(imageArray);
    setImageStyle(imageStyle);

    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % imageArray.length);
    }, 150);

    clearTimer();
    setTimer(timer);
  }

  function handleJump() {
    initializeAction(jump_frames, jump_styles);
  }

  function handleLeft() {
    initializeAction(left_frames, left_styles);
  }

  function handleRight() {
    initializeAction(right_frames, right_styles);
  }

  function handleDuck() {
    initializeAction(duck_frames, duck_styles);
  }

  return (
    <>
      <HomeButton />

      <div className="mx-auto flex h-screen w-[60vw] items-center justify-center">
        <div className="flex w-full flex-col gap-4 rounded p-5">
          <div className="flex flex-row justify-center gap-2">
            <button
              onMouseDown={handleJump}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 transition-all duration-300 hover:bg-blue-400 active:bg-blue-500"
            >
              Jump
            </button>
            <button
              onMouseDown={handleLeft}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 transition-all duration-300 hover:bg-blue-400 active:bg-blue-500"
            >
              Left
            </button>
            <button
              onMouseDown={handleRight}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 transition-all duration-300 hover:bg-blue-400 active:bg-blue-500"
            >
              Right
            </button>
            <button
              onMouseDown={handleDuck}
              onMouseUp={handleRelease}
              className="rounded-md bg-blue-300 px-10 py-2 transition-all duration-300 hover:bg-blue-400 active:bg-blue-500"
            >
              Duck
            </button>
          </div>

          <div className="m-auto flex h-[75vh] w-full flex-col-reverse items-center justify-items-center rounded p-2 ring-2 ring-slate-400">
            {active && (
              <img
                src={image_array[frame]}
                className={`box-content w-[25%] transition-all ${image_styles[frame]} `}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AlienAnimation;
