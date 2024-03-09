import { useNavigate } from "react-router-dom";
import left_arrow from "../assets/left-arrow.svg";

interface NavigationButtonProps {
  location: string;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  location,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(location)}
      className="rounded bg-blue-500 p-2 font-bold drop-shadow-md hover:bg-blue-700 transition-all duration-300"
    >
      {children}
    </button>
  );
};

export function HomeButton({ handleClick }: { handleClick?: any }) {
  const navigate = useNavigate();

  function handleClickButton() {
    if (handleClick) {
      handleClick();
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <button
        onClick={handleClickButton}
        className={"absolute m-5 w-12 rounded-xl hover:bg-blue-300 hover:scale-110 transition-all"}
      >
        <img src={left_arrow} />
      </button>
    </>
  );
}
