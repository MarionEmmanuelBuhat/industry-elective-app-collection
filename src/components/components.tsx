import { useNavigate } from "react-router-dom";

interface NavigationButtonProps {
  location: string;
  children: React.ReactNode;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({ location, children }) => {
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
