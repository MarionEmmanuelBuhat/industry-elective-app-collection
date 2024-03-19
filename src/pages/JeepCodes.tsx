import { useState } from "react";

interface Intersection {
  index: number;
  color: string;
  column: number;
}

const jeepney_routes: string[] = [
  "01A",
  "02B",
  "03C",
  "04A",
  "04D",
  "06B",
  "06D",
  "10C",
  "10H",
  "11A",
  "11B",
  "20A",
  "20C",
  "42C",
  "42D",
];

const location_name: string[] = [
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliet",
  "Kilo",
  "Lima",
  "Mike",
  "November",
  "Oscar",
  "Papa",
  "Quebec",
  "Romeo",
];

const colors = [
  "#FF5733", // Coral
  "#FFC300", // Sunflower
  "#C70039", // Crimson
  "#900C3F", // Rose
  "#581845", // Eggplant
  "#273746", // Asphalt
  "#34495E", // Wet Asphalt
  "#1F618D", // Belize Hole
];

const data = [
  [1, 2, 3, 0, 4, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 0, 3, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 2, 3, 4, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 2, 0, 3, 4, 5, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 2, 3, 0, 4, 0, 5, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 3, 0, 4, 5, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 3, 0, 0, 4, 5, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 3, 0, 4, 0, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 3, 4, 0, 0, 0, 0, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 3, 0, 4, 5],
];

const sample_nodes = data.map((row) => row.map(() => 0));

function JeepCodes() {
  const [code, setCode] = useState<string>("");
  const [err, setErr] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [indices, setIndices] = useState<number[]>([]);
  const [nodes, setNodes] = useState<number[][]>([]);
  const [intersections, setIntersections] = useState<Intersection[]>([]);

  function handleClick() {
    if (!isCodeValid(code.split(","))) {
      setErr(true);
      setSuccess(false);
      return;
    }
    setErr(false);
    setSuccess(true);
    const indices: number[] = getIndex(code.split(","));
    const nodes = [...sample_nodes];
    mapIndices(indices, nodes);
    setIndices(indices);
    setNodes(nodes);
    handleIntersection(indices, nodes);
  }

  function displayResult() {
    return (
      <div className="flex flex-col gap-2">
        {indices.map((index) => {
          const route = jeepney_routes[index];
          const row = nodes[index];
          return (
            <div key={index * 100}>
              <span>{route} =&gt; </span>
              {row.map((value, rowIndex) => {
                if (value !== 0) {
                  const intersection: Intersection | undefined = intersections.find(
                    (intersection) =>
                      intersection.column === rowIndex && intersection.index === index
                  );
                  console.log(intersection);
                  const name = location_name[rowIndex];
                  return (
                    <>
                      <span
                        key={index}
                        style={{ color: intersection ? intersection.color : "black" }}
                      >
                        {name}
                      </span>
                      {value !== 5 && <span> &lt;-&gt; </span>}
                    </>
                  );
                } else {
                  return null;
                }
              })}
            </div>
          );
        })}
      </div>
    );
  }

  function handleIntersection(indices: number[], nodes: number[][]) {
    let intersections: Intersection[] = [];
    let index = 0;
    for (let i = 0; i < indices.length; i++) {
      for (let j = 0; j < indices.length; j++) {
        if (i === j) {
          continue;
        }
        const indexI = indices[i];
        const indexJ = indices[j];
        const rowI = nodes[indexI];
        const rowJ = nodes[indexJ];

        for (let z = 0; z < rowI.length; z++) {
          if (rowI[z] > 0 && rowJ[z] > 0) {
            intersections.push({ index: indexI, color: colors[index], column: z });
            intersections.push({ index: indexJ, color: colors[index], column: z });
          }
        }
      }
      index++;
    }
    console.log(intersections);
    setIntersections(intersections);
  }

  function mapIndices(indices: number[], nodes: number[][]) {
    for (let i = 0; i < indices.length; i++) {
      const index = indices[i];
      const row = data[index];
      nodes[index] = row;
    }
  }

  function isCodeValid(codes: string[]) {
    for (let i = 0; i < codes.length; i++) {
      if (!(jeepney_routes.indexOf(codes[i]) >= 0)) {
        return false;
      }
    }
    return true;
  }

  function getIndex(codes: string[]) {
    let indices: number[] = [];
    for (let i = 0; i < codes.length; i++) {
      indices.push(jeepney_routes.indexOf(codes[i]));
    }
    return indices;
  }

  return (
    <>
      <div className="mx-auto flex h-screen w-3/4 flex-col items-center justify-center gap-3">
        <p className="text-2xl font-bold">Enter Jeep Code</p>
        <input
          type="text"
          className="rounded-full px-4 py-3 ring-2 ring-neutral-400"
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="rounded-md p-3 font-bold ring-1 ring-black transition-all 
            duration-300 hover:scale-110 hover:bg-black hover:text-white"
          onClick={handleClick}
        >
          Submit
        </button>
        {err && <p className="text-red-500">Invalid Jeepney Code</p>}
        {success && displayResult()}
      </div>
    </>
  );
}

export default JeepCodes;
