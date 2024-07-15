"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  showRookMoves,
  showBishopMoves,
  showKingMoves,
  showPawnMoves,
  showQueenMoves,
  shownKnightMoves,
  castleKing,
} from "../logic/moveLogic";

export default function Board() {
  const [boardState, setBoardState] = useState({
    18: "r",
    28: "n",
    38: "b",
    48: "q",
    58: "k",
    68: "b",
    78: "n",
    88: "r",
    17: "p",
    27: "p",
    37: "p",
    47: "p",
    57: "p",
    67: "p",
    77: "p",
    87: "p",
    16: "-",
    26: "-",
    36: "-",
    46: "-",
    56: "-",
    66: "-",
    76: "-",
    86: "-",
    15: "-",
    25: "-",
    35: "-",
    45: "-",
    55: "-",
    65: "-",
    75: "-",
    85: "-",
    14: "-",
    24: "-",
    34: "-",
    44: "-",
    54: "-",
    64: "-",
    74: "-",
    84: "-",
    13: "-",
    23: "-",
    33: "-",
    43: "-",
    53: "-",
    63: "-",
    73: "-",
    83: "-",
    12: "P",
    22: "P",
    32: "P",
    42: "P",
    52: "P",
    62: "P",
    72: "P",
    82: "P",
    11: "R",
    21: "N",
    31: "B",
    41: "Q",
    51: "K",
    61: "B",
    71: "N",
    81: "R",
  });

  const [possibleMoves, setPossibleMoves] = useState([]);

  // Castling Check Variables
  const [whiteKingMoved, setWhiteKingMoved] = useState(false);
  const [whiteQueenRookMoved, setWhiteQueenRookMoved] = useState(false);
  const [whiteKingRookMoved, setWhiteKingRookMoved] = useState(false);

  const [blackKingMoved, setBlackKingMoved] = useState(false);
  const [blackQueenRookMoved, setBlackQueenRookMoved] = useState(false);
  const [blackKingRookMoved, setBlackKingRookMoved] = useState(false);
  const [moves, setMoves] = useState([]);

  const [chosenMoves, setChosenMoves] = useState([]);
  const [turn, setTurn] = useState(1);
  const [selectedTile, setSelectedTile] = useState("");
  const board = [
    ["18", "28", "38", "48", "58", "68", "78", "88"],
    ["17", "27", "37", "47", "57", "67", "77", "87"],
    ["16", "26", "36", "46", "56", "66", "76", "86"],
    ["15", "25", "35", "45", "55", "65", "75", "85"],
    ["14", "24", "34", "44", "54", "64", "74", "84"],
    ["13", "23", "33", "43", "53", "63", "73", "83"],
    ["12", "22", "32", "42", "52", "62", "72", "82"],
    ["11", "21", "31", "41", "51", "61", "71", "81"],
  ];
  const [searching, setSearching] = useState(false);
  const [searchIteration, setSearchIteration] = useState(1);

  // Finds a move for the AI
  useEffect(() => {
    if (chosenMoves.length === 0 && turn % 2 === 0) {
      findValidMove(false);
      setSearching(true);
    }
  }, [turn]);

  useEffect(() => {}, [boardState, searching]);
  useEffect(() => {
    if (searching && possibleMoves.length === 0) {
      // Continue searching for a valid move if possibleMoves is empty
      findValidMove();
    } else if (searching && possibleMoves.length !== 0) {
      setChosenMoves((prevChosenMoves) => [
        ...prevChosenMoves,
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)],
      ]);
      setPossibleMoves([]);
      setSelectedTile("");
      setSearching(false); // Stop searching oncee valid moves are found
    }
  }, [searchIteration]);

  const [playNextMove, setPlayNextMove] = useState(1);
  // Plays the move for the AI
  useEffect(() => {
    if (turn % 2 === 0 && searching === false) {
      // console.log("in the AI");
      // console.log(chosenMoves);
      let move = chosenMoves.shift(); // Remove the first element "22"
      // console.log("MOVING");
      // console.log(move);
      // console.log(boardState[move]);
      setChosenMoves[[...chosenMoves]];
      handleMove(move, true); // Pass "22" to handleMove (assuming it's a function that accepts a parameter)
      // setTimeout(() => {
      setPlayNextMove((playNextMove) => playNextMove + 1);
      // }, 1000);
    }
  }, [chosenMoves]);

  useEffect(() => {
    if (chosenMoves.length === 1) {
      // console.log("TO ");
      let move = chosenMoves.shift(); // Remove the first element "22"
      // console.log(move[0]);

      setChosenMoves[[...chosenMoves]];
      handleMove(move[0], true);
    }
  }, [playNextMove]);

  function findValidMove(isWhite) {
    const whitePieces = ["P", "R", "N", "B", "Q", "K"];
    const blackPieces = ["p", "r", "n", "b", "q", "k"];
    const ownPieces = isWhite ? whitePieces : blackPieces;

    while (true) {
      const randomIndex = Math.floor(Math.random() * boardStateKeys.length);
      const randomKey = boardStateKeys[randomIndex];

      if (
        !boardState[randomKey].includes(ownPieces) &&
        boardState[randomKey] !== "-"
      ) {
        handleMove(randomKey, false);
        setChosenMoves([randomKey]);
        setSearchIteration((searchIteration) => searchIteration + 1);
        break; // Exit the loop to allow state update
      }
    }
  }

  function calculateMove(isWhite) {
    setSearching(true);
    findValidMove();
  }

  function restartGame() {
    setWhiteKingMoved(false);
    setWhiteQueenRookMoved(false);
    setWhiteKingRookMoved(false);

    setBlackKingMoved(false);
    setBlackQueenRookMoved(false);
    setBlackKingRookMoved(false);

    setSelectedTile("");
    setTurn(1);
    setMoves([]);

    setBoardState({
      18: "r",
      28: "n",
      38: "b",
      48: "q",
      58: "k",
      68: "b",
      78: "n",
      88: "r",
      17: "p",
      27: "p",
      37: "p",
      47: "p",
      57: "p",
      67: "p",
      77: "p",
      87: "p",
      16: "-",
      26: "-",
      36: "-",
      46: "-",
      56: "-",
      66: "-",
      76: "-",
      86: "-",
      15: "-",
      25: "-",
      35: "-",
      45: "-",
      55: "-",
      65: "-",
      75: "-",
      85: "-",
      14: "-",
      24: "-",
      34: "-",
      44: "-",
      54: "-",
      64: "-",
      74: "-",
      84: "-",
      13: "-",
      23: "-",
      33: "-",
      43: "-",
      53: "-",
      63: "-",
      73: "-",
      83: "-",
      12: "P",
      22: "P",
      32: "P",
      42: "P",
      52: "P",
      62: "P",
      72: "P",
      82: "P",
      11: "R",
      21: "N",
      31: "B",
      41: "Q",
      51: "K",
      61: "B",
      71: "N",
      81: "R",
    });
  }

  const boardStateKeys = Object.keys(boardState);

  // Upper case = white pieces

  function handleMove(tile, show) {
    clearCurrentMoves();
    if (tile === selectedTile) {
      setSelectedTile("");
    } else {
      if (turn % 2 === 0) {
        // if (true) {
        // Black Move
        switch (boardState[tile]) {
          case "ck":
            setBlackKingMoved(true);
            setBlackKingRookMoved(true);
            castleKing(
              setBoardState,
              "ck",
              false,
              setSelectedTile,
              setPossibleMoves,
              setTurn
            );
            setMoves((moves) => [...moves, "0-0"]);
            break;
          case "cq":
            setBlackKingMoved(true);
            setBlackQueenRookMoved(true);
            castleKing(
              setBoardState,
              "cq",
              false,
              setSelectedTile,
              setPossibleMoves,
              setTurn
            );
            setMoves((moves) => [...moves, "0-0-0"]);
            break;
          case "en":
            setBoardState((boardState) => ({
              ...boardState,
              [tile[0] + parseInt(tile[1]) + 1]: "-",
            }));
            move(tile);
            break;
          case "Px":
          case "Rx":
          case "Nx":
          case "Bx":
          case "Qx":
          case "m":
            move(tile);
            break;
          case "p":
            showPawnMoves(
              tile,
              false,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              moves,
              show
            );
            break;
          case "r":
            showRookMoves(
              tile,
              false,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "n":
            shownKnightMoves(
              tile,
              false,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "b":
            showBishopMoves(
              tile,
              false,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "q":
            showQueenMoves(
              tile,
              false,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "k":
            showKingMoves(
              tile,
              false,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              blackKingMoved,
              blackQueenRookMoved,
              blackKingRookMoved,
              show
            );
          default:
            break;
        }
      } else {
        // white move
        switch (boardState[tile]) {
          case "CK":
            setWhiteKingMoved(true);
            setWhiteKingRookMoved(true);
            castleKing(
              setBoardState,
              "CK",
              true,
              setSelectedTile,
              setPossibleMoves,
              setTurn
            );
            setMoves((moves) => [...moves, "0-0"]);
            break;
          case "CQ":
            setWhiteKingMoved(true);
            setWhiteQueenRookMoved(true);
            castleKing(
              setBoardState,
              "CQ",
              true,
              setSelectedTile,
              setPossibleMoves,
              setTurn
            );
            setMoves((moves) => [...moves, "0-0-0"]);
            break;
          case "EN":
            setBoardState((boardState) => ({
              ...boardState,
              [tile[0] + parseInt(tile[1]) - 1]: "-",
            }));
            move(tile);
            break;
          case "px":
          case "rx":
          case "nx":
          case "bx":
          case "qx":
          case "m":
            move(tile);
            break;
          case "P":
            showPawnMoves(
              tile,
              true,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              moves,
              show
            );
            break;
          case "R":
            showRookMoves(
              tile,
              true,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "N":
            shownKnightMoves(
              tile,
              true,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "B":
            showBishopMoves(
              tile,
              true,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "Q":
            showQueenMoves(
              tile,
              true,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              show
            );
            break;
          case "K":
            showKingMoves(
              tile,
              true,
              boardState,
              setPossibleMoves,
              setBoardState,
              setSelectedTile,
              whiteKingMoved,
              whiteQueenRookMoved,
              whiteKingRookMoved,
              show
            );
            break;
          default:
            break;
        }
      }
    }
  }

  function clearCurrentMoves() {
    if (possibleMoves.length !== 0) {
      possibleMoves.forEach((possibleMove) => {
        let changeTo;
        switch (boardState[possibleMove]) {
          case "Qx":
            changeTo = "Q";
            break;
          case "Bx":
            changeTo = "B";
            break;
          case "Nx":
            changeTo = "N";
            break;
          case "Rx":
            changeTo = "R";
            break;
          case "Px":
            changeTo = "P";
            break;
          case "Kx":
            changeTo = "K";
            break;
          case "qx":
            changeTo = "q";
            break;
          case "bx":
            changeTo = "b";
            break;
          case "nx":
            changeTo = "n";
            break;
          case "rx":
            changeTo = "r";
            break;
          case "px":
            changeTo = "p";
            break;
          case "kx":
            changeTo = "k";
            break;
          case "m":
            changeTo = "-";
            break;
          case "-":
            break;
          default:
            break;
        }
        setBoardState((boardState) => ({
          ...boardState,
          [possibleMove]: changeTo,
        }));
      });
      setSelectedTile("");
      setPossibleMoves([]);
    }
  }

  function move(tile) {
    if (tile === "11") {
      setWhiteQueenRookMoved(true);
    }
    if (tile === "51") {
      setWhiteKingMoved(true);
    }
    if (tile === "81") {
      setWhiteKingRookMoved(true);
    }

    if (tile === "18") {
      setBlackQueenRookMoved(true);
    }
    if (tile === "58") {
      setBlackKingMoved(true);
    }
    if (tile === "88") {
      setBlackKingRookMoved(true);
    }

    const charMap = {
      1: "a",
      2: "b",
      3: "c",
      4: "d",
      5: "e",
      6: "f",
      7: "g",
      8: "h",
    };

    console.log(boardState[selectedTile]);
    console.log(tile);
    console.log(charMap[tile[0]]);
    console.log(tile[1]);
    setMoves((moves) => [
      ...moves,
      (boardState[selectedTile].toLowerCase() !== "p"
        ? boardState[selectedTile].toUpperCase()
        : "") +
        (boardState[tile].includes("x") ? "x" : "") +
        charMap[tile[0]] +
        tile[1],
    ]);
    setBoardState((boardState) => ({
      ...boardState,
      [tile]: boardState[selectedTile],
    }));
    setBoardState((boardState) => ({ ...boardState, [selectedTile]: "-" }));
    setSelectedTile("");
    setPossibleMoves([]);
    setTurn((currentTurn) => currentTurn + 1);
  }

  return (
    <div className="flex flex-col justify-center place-items-center">
      <button
        onClick={restartGame}
        className="text-black mb-2 p-2 h-fit w-fit "
      >
        restart
      </button>

      <div className="grid grid-rows-8  flex-grow max-h-[1150px] max-w-[1150px] aspect-square">
        <div className="text-white"> {selectedTile}</div>
        <div className="text-white"> {possibleMoves}</div>
        {/* {console.log(boardState)} */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-8 w-full h-full">
            {row.map((tile, colIndex) => (
              <div
                onClick={() => handleMove(tile, true)}
                key={tile}
                className={`h-full w-full flex justify-center place-items-center ${
                  (rowIndex % 2 === 0 && colIndex % 2 === 0) ||
                  (rowIndex % 2 !== 0 && colIndex % 2 !== 0)
                    ? "bg-[#EBECD3]"
                    : "bg-[#7A945A]"
                }`}
              >
                {/* <div> {boardState[tile]}</div> */}
                {boardState[tile] === "k" ? (
                  <Image
                    src={"/pieceImages/blackKing.png"}
                    alt="Black King"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "K" ? (
                  <Image
                    src={"/pieceImages/whiteKing.png"}
                    alt="Black King"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "N" ? (
                  <Image
                    src={"/pieceImages/whiteKnight.png"}
                    alt="White Knight"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "n" ? (
                  <Image
                    src={"/pieceImages/blackKnight.png"}
                    alt="Black Knight"
                    width={500}
                    height={500}
                  />
                ) : null}

                {boardState[tile] === "R" ? (
                  <Image
                    src={"/pieceImages/whiteRook.png"}
                    alt="White Rook"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "r" ? (
                  <Image
                    src={"/pieceImages/blackRook.png"}
                    alt="Black Rook"
                    width={500}
                    height={500}
                  />
                ) : null}

                {boardState[tile] === "P" ? (
                  <Image
                    src={"/pieceImages/whitePawn.png"}
                    alt="White Pawn"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "p" ? (
                  <Image
                    src={"/pieceImages/blackPawn.png"}
                    alt="Black Pawn"
                    width={500}
                    height={500}
                  />
                ) : null}

                {boardState[tile] === "B" ? (
                  <Image
                    src={"/pieceImages/whiteBishop.png"}
                    alt="White Bishop"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "b" ? (
                  <Image
                    src={"/pieceImages/blackBishop.png"}
                    alt="Black Bishop"
                    width={500}
                    height={500}
                  />
                ) : null}

                {boardState[tile] === "Q" ? (
                  <Image
                    src={"/pieceImages/whiteQueen.png"}
                    alt="White Queen"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "q" ? (
                  <Image
                    src={"/pieceImages/blackQueen.png"}
                    alt="Black Queen"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile] === "m" ||
                boardState[tile] === "CQ" ||
                boardState[tile] === "CK" ||
                boardState[tile] === "cq" ||
                boardState[tile] === "ck" ||
                boardState[tile] === "en" ||
                boardState[tile] === "EN" ? (
                  <Image
                    src={"/pieceImages/move.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile].toLowerCase() === "px" ? (
                  <Image
                    src={"/pieceImages/attackedPawn.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile].toLowerCase() === "rx" ? (
                  <Image
                    src={"/pieceImages/attackedRook.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile].toLowerCase() === "nx" ? (
                  <Image
                    src={"/pieceImages/attackedKnight.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile].toLowerCase() === "bx" ? (
                  <Image
                    src={"/pieceImages/attackedBishop.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile].toLowerCase() === "qx" ? (
                  <Image
                    src={"/pieceImages/attackedQueen.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
                {boardState[tile].toLowerCase() === "kx" ? (
                  <Image
                    src={"/pieceImages/attackedQueen.png"}
                    alt="move"
                    width={500}
                    height={500}
                  />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
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
    </div>
  );
}
