"use client";

import Image from "next/image";
import { useState } from "react";

export default function Board() {
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

  const whitePieces = ["P", "R", "N", "B", "Q", "K"];
  const blackPieces = ["p", "r", "n", "b", "q", "k"];

  const [possibleMoves, setPossibleMoves] = useState([]);

  function handleMove(tile) {
    clearCurrentMoves();
    if (tile === selectedTile) {
      setSelectedTile("");
    } else {
      switch (boardState[tile]) {
        case "px":
        case "Px":
        case "rx":
        case "Rx":
        case "nx":
        case "Nx":
        case "bx":
        case "Bx":
        case "qx":
        case "Qx":
        case "m":
          move(tile);
          break;
        case "P":
          showPawnMoves(tile, true);
          break;
        case "p":
          showPawnMoves(tile, false);
          break;
        case "R":
          showRookMoves(tile, true);
          break;
        case "r":
          showRookMoves(tile, false);
          break;
        default:
          break;
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
          case "m":
            changeTo = "-";
            break;
          default:
            changeTo = "-";
            break;
        }
        setBoardState((boardState) => ({
          ...boardState,
          [possibleMove]: changeTo,
        }));
      });
      setPossibleMoves([]);
    }
  }

  function move(tile) {
    setBoardState((boardState) => ({
      ...boardState,
      [tile]: boardState[selectedTile],
    }));
    setBoardState((boardState) => ({ ...boardState, [selectedTile]: "-" }));
    setSelectedTile("");
    setPossibleMoves([]);
  }

  function attackPiece(attackedTile, isWhite) {
    const opponentPieces = isWhite ? blackPieces : whitePieces;
    if (opponentPieces.includes(boardState[attackedTile])) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [attackedTile],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [attackedTile]: boardState[attackedTile] + "x",
      }));
    }
    return opponentPieces.includes(boardState[attackedTile]);
  }

  function showPawnMoves(tile, isWhite) {
    setSelectedTile(tile);
    let verticalMove = isWhite ? parseInt(tile[1]) + 1 : parseInt(tile[1]) - 1;

    if ((isWhite && tile[1] === "2") || (!isWhite && tile[1] === "7")) {
      let newTile = tile[0] + (isWhite ? verticalMove + 1 : verticalMove - 1);
      if (boardState[newTile] === "-") {
        setPossibleMoves((currentPossibleMoves) => [
          ...currentPossibleMoves,
          [newTile],
        ]);
        setBoardState((boardState) => ({ ...boardState, [newTile]: "m" }));
      }
    }

    let newTile = tile[0] + verticalMove;
    if (boardState[newTile] === "-") {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [newTile],
      ]);
      setBoardState((boardState) => ({ ...boardState, [newTile]: "m" }));
    }

    let horizontalMove = parseInt(tile[0]) - 1;
    let leftAttack = horizontalMove.toString() + verticalMove;
    attackPiece(leftAttack, isWhite);

    horizontalMove = parseInt(tile[0]) + 1;
    let rightAttack = horizontalMove.toString() + verticalMove;
    attackPiece(rightAttack, isWhite);
  }

  function showRookMoves(tile, isWhite) {
    setSelectedTile(tile);
    const ownPieces = isWhite ? whitePieces : blackPieces;

    let leftMove = parseInt(tile[0]) - 1;
    let leftAttack = leftMove + tile[1];
    while (leftMove > 0) {
      const currentLeftAtack = leftAttack;
      if (
        ownPieces.includes(boardState[currentLeftAtack]) ||
        attackPiece(currentLeftAtack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentLeftAtack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentLeftAtack]: "m",
      }));
      leftMove--;
      leftAttack = leftMove + tile[1];
    }

    let rightMove = parseInt(tile[0]) + 1;
    let rightAttack = rightMove + tile[1];
    while (rightMove < 9) {
      const currentRightAtack = rightAttack;
      if (
        ownPieces.includes(boardState[currentRightAtack]) ||
        attackPiece(currentRightAtack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentRightAtack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentRightAtack]: "m",
      }));
      rightMove++;
      rightAttack = rightMove + tile[1];
    }

    let upMove = parseInt(tile[1]) + 1;
    let upAttack = tile[0] + upMove;
    while (upMove < 9) {
      const currentUpAttack = upAttack;
      if (
        ownPieces.includes(boardState[currentUpAttack]) ||
        attackPiece(currentUpAttack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentUpAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentUpAttack]: "m",
      }));

      upMove++;
      upAttack = tile[0] + upMove;
    }

    let downMove = parseInt(tile[1]) - 1;
    let downAttack = tile[0] + downMove;
    while (downMove > 0) {
      const currentDownAttack = downAttack;
      if (
        ownPieces.includes(boardState[currentDownAttack]) ||
        attackPiece(currentDownAttack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentDownAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentDownAttack]: "m",
      }));

      downMove = downMove - 1;
      downAttack = tile[0] + downMove;
    }
  }

  return (
    <div className="grid grid-rows-8 bg-black flex-grow max-h-[1150px] max-w-[1150px] aspect-square">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-8 w-full h-full">
          {row.map((tile, colIndex) => (
            <div
              onClick={() => handleMove(tile)}
              key={tile}
              className={`h-full w-full flex justify-center place-items-center ${
                (rowIndex % 2 === 0 && colIndex % 2 === 0) ||
                (rowIndex % 2 !== 0 && colIndex % 2 !== 0)
                  ? "bg-[#EBECD3]"
                  : "bg-[#7A945A]"
              }`}
            >
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
              {boardState[tile] === "m" ? (
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
