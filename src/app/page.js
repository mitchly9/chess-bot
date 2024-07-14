"use client";

import { useState } from "react";
import Board from "./components/Board";

export default function Home() {
  const [moves, setMoves] = useState([]);

  return (
    <main className="bg-[#181818] max-h-fit min-h-screen flex flex-col justify-center items-center p-20 ">
      <Board moves={moves} setMoves={setMoves} />
      <div className="text-white max-h-[1150px] max-w-[1150px] flex flex-wrap justify-start items-start w-full overflow-auto">
        {moves.map((move, index) => {
          // Check if the current index is the start of a new row
          if (index % 2 === 0) {
            return (
              <div key={index} className="flex space-x-1 ml-3">
                <div> {Math.ceil(index / 2) + 1}. </div>
                <div className="text-white">{moves[index]}</div>
                {moves[index + 1] && (
                  <div className="text-white">{moves[index + 1]}</div>
                )}
              </div>
            );
          }
          return <div key={index} className="flex space-x-1 ml-3"></div>;
        })}
      </div>
    </main>
  );
}
