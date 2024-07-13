"use client";

import { useState } from "react";
import Board from "./components/Board";

export default function Home() {
  const [moves, setMoves] = useState([]);

  return (
    <main className="bg-[#181818] h-screen flex justify-center items-center p-20">
      <Board moves={moves} setMoves={setMoves} />
      <div className="text-white h-fit pl-2 w-fit">
        {moves.map((move, index) => {
          // Check if the current index is the start of a new row
          if (index % 2 === 0) {
            return (
              <div key={index} className="flex space-x-4 mb-2">
                <div> {Math.ceil(index / 2) + 1}. </div>
                <div className="text-white">{moves[index]}</div>
                {moves[index + 1] && (
                  <div className="text-white">{moves[index + 1]}</div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </main>
  );
}
