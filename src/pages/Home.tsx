import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="m-auto flex h-screen w-1/2 flex-col flex-wrap items-center justify-center text-white">
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/colorsequence")}
            className="rounded bg-blue-500 p-2 font-bold drop-shadow-md hover:bg-blue-700"
          >
            Color Sequence
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
