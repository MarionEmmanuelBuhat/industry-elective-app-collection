import { NavigationButton } from "../components/components";

function Home() {
  return (
    <>
      <div className="m-auto flex h-screen w-1/2 flex-col flex-wrap items-center justify-center text-white">
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <NavigationButton location="/colorsequence">Color Sequence</NavigationButton>
          <NavigationButton location="/colorroll">Color Roll</NavigationButton>
          <NavigationButton location="/alien">Alien Animation</NavigationButton>
          <NavigationButton location="/singers">Complete The Lyrics</NavigationButton>
          <NavigationButton location="/bingo">Bingo</NavigationButton>
          <NavigationButton location="/jeep">Jeep Codes</NavigationButton>
        </div>
      </div>
    </>
  );
}

export default Home;
