import { useEffect, useState } from "react";
import { HomeButton } from "../components/components";
import axios from "axios";

interface Card {
  [key: string]: number[]; // Assuming the values are arrays of numbers
}

function getOrdinalSuffix(number: number) {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return "th";
  }
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function BingoCard({ card }: { card: Card; token: string }) {
  return (
    <>
      <div className="flex flex-col rounded-lg border-[1px] border-black p-6 shadow-md">
        <div className="flex flex-row items-center justify-center gap-2 ">
          {Object.keys(card).map((key: string) => {
            const array = card[key];

            return (
              <div key={key} className="flex flex-col items-center justify-center gap-4">
                <p className="text-4xl font-bold">{key}</p>
                <div key={key} className="flex flex-col gap-2">
                  {array.map((number) => (
                    <Number key={number} number={number} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Number({ number }: { number: any }) {
  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <>
      <div
        className={`flex items-center justify-center rounded px-4 py-3 text-xl 
                  font-bold ring-1 ring-black transition-all duration-300 hover:scale-110
                  hover:cursor-pointer
                  ${clicked && "bg-black text-white"}`}
        onClick={() => setClicked((state) => !state)}
      >
        <p key={number}>{number}</p>
      </div>
    </>
  );
}

function JoinGame({ setCode, onClick }: { setCode: any; onClick: any }) {
  return (
    <>
      <div className="mx-auto flex h-screen w-3/4 flex-row flex-wrap items-center justify-center">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">Enter Game Code</p>
            <input
              type="text"
              className="w-[20vw] rounded-lg px-3 py-2 ring-2 ring-neutral-400"
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={onClick}
              className="mt-2 w-[20vw] rounded bg-blue-500 py-1 text-lg text-white
                 transition-all duration-300 hover:bg-blue-700 focus:outline-none 
                 focus:ring focus:ring-blue-300"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function BingoGame({
  cards,
  code,
  tokens,
  getCard,
  checkCards,
}: {
  cards: object[];
  code: string;
  tokens: string[];
  getCard: any;
  checkCards: any;
}) {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-3xl font-bold">Game Code: {code}</p>
        <div className="flex max-w-[75%] flex-wrap items-center overflow-x-auto">
          <div className="flex flex-row gap-4">
            {cards.map((card: any, index) => (
              <BingoCard card={card} key={index} token={tokens[index]} />
            ))}
          </div>
        </div>
        <div className="flex w-[30%] justify-between">
          <button
            className="rounded-md p-3 font-bold ring-1 ring-black transition-all 
            duration-300 hover:scale-110 hover:bg-black hover:text-white"
            onClick={checkCards}
          >
            Check Cards
          </button>
          <button
            className="rounded-md p-3 font-bold ring-1 ring-black transition-all 
            duration-300 hover:scale-110 hover:bg-black hover:text-white"
            onClick={getCard}
          >
            New Card
          </button>
        </div>
      </div>
    </>
  );
}

function Bingo() {
  const API = "http://www.hyeumine.com/";
  const GET_CARD = "getcard.php?bcode=";
  const CHECK_WIN = "checkwin.php?playcard_token=";
  const [code, setCode] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [cards, setCards] = useState<object[]>([]);
  const [tokens, setTokens] = useState<string[]>([]);

  function handleBackButton() {
    if (submitted) {
      setCode("");
      setSubmitted(false);
      setCards([]);
      setTokens([]);
    }
  }

  useEffect(() => {
    console.log(tokens);
    console.log(cards);
    console.log(cards.length);
  }, [tokens, cards]);

  async function checkCards() {
    try {
      const requests = tokens.map((token) => {
        return axios.get(API + CHECK_WIN + token);
      });

      const responses = await Promise.all(requests);

      let wins = "";
      Array.from({ length: tokens.length }).forEach((_, index) => {
        if (responses[index].data === 1) {
          const ordinalSuffix = getOrdinalSuffix(index + 1);
          wins += index + 1 + ordinalSuffix + " ";
        }
      });

      if (wins.length > 0) {
        alert("Cards that have won: " + wins);
      } else {
        alert("None of your card/s won");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getCard() {
    try {
      const response = await axios.get(API + GET_CARD + code);
      if (response.data === 0) {
        alert("Invalid game code!");
        return;
      }
      if (!submitted) {
        setSubmitted(true);
      }

      const token: string = response.data.playcard_token;
      const bingo_card: any = response.data.card;
      setTokens([...tokens, token]);
      setCards([...cards, bingo_card]);
    } catch (e) {
      alert("Invalid game code!");
      console.log(e);
    }
  }

  return (
    <>
      <HomeButton handleClick={submitted ? handleBackButton : null} />
      {!submitted && <JoinGame setCode={setCode} onClick={getCard} />}
      {submitted && (
        <BingoGame
          cards={cards}
          code={code}
          tokens={tokens}
          getCard={getCard}
          checkCards={checkCards}
        />
      )}
    </>
  );
}

export default Bingo;
