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
      className="rounded bg-blue-500 p-2 font-bold drop-shadow-md hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export function HomeButton() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className={"absolute m-5 w-12 rounded-xl hover:bg-blue-300"}
      >
        <img src={left_arrow} />
      </button>
    </>
  );
}
