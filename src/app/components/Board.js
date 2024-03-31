"use client";

import Image from "next/image";
import { useState } from "react";

export default function Board() {
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
      if (turn % 2 === 0) {
        switch (boardState[tile]) {
          case "px":
          case "rx":
          case "nx":
          case "bx":
          case "qx":
          case "m":
            move(tile);
            break;
          case "p":
            showPawnMoves(tile, false);
            break;
          case "r":
            showRookMoves(tile, false);
            break;
          case "n":
            shownKnightMoves(tile, false);
            break;
          case "b":
            showBishopMoves(tile, false);
          case "q":
            showQueenMoves(tile, false);
            break;
          case "k":
            showKingMoves(tile, false);
            false;
          default:
            break;
        }
      } else {
        switch (boardState[tile]) {
          case "Px":
          case "Rx":
          case "Nx":
          case "Bx":
          case "Qx":
          case "m":
            move(tile);
            break;
          case "P":
            showPawnMoves(tile, true);
            break;
          case "R":
            showRookMoves(tile, true);
            break;
          case "N":
            shownKnightMoves(tile, true);
            break;
          case "B":
            showBishopMoves(tile, true);
            break;
          case "Q":
            showQueenMoves(tile, true);
            break;
          case "K":
            showKingMoves(tile, true);
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
    setTurn((currentTurn) => currentTurn + 1);
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

    let newTile = tile[0] + verticalMove;
    if (boardState[newTile] === "-") {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [newTile],
      ]);
      setBoardState((boardState) => ({ ...boardState, [newTile]: "m" }));
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
    }

    let horizontalMove = parseInt(tile[0]) - 1;
    let leftAttack = horizontalMove.toString() + verticalMove;
    attackPiece(leftAttack, isWhite);

    horizontalMove = parseInt(tile[0]) + 1;
    let rightAttack = horizontalMove.toString() + verticalMove;
    attackPiece(rightAttack, isWhite);
  }

  function leftMove(tile, isWhite, ownPieces) {
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
  }

  function rightMove(tile, isWhite, ownPieces) {
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
  }

  function downMove(tile, isWhite, ownPieces) {
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

  function upMove(tile, isWhite, ownPieces) {
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
  }

  function showRookMoves(tile, isWhite) {
    setSelectedTile(tile);
    const ownPieces = isWhite ? whitePieces : blackPieces;

    leftMove(tile, isWhite, ownPieces);
    rightMove(tile, isWhite, ownPieces);
    upMove(tile, isWhite, ownPieces);
    downMove(tile, isWhite, ownPieces);
  }

  function shownKnightMoves(tile, isWhite) {
    setSelectedTile(tile);
    const ownPieces = isWhite ? whitePieces : blackPieces;

    let upUpMove = parseInt(tile[1]) + 2;
    let downDownMove = parseInt(tile[1]) - 2;
    let leftMove = parseInt(tile[0]) - 1;
    let rightMove = parseInt(tile[0]) + 1;

    let leftLeftMove = parseInt(tile[0]) - 2;
    let rightRightMove = parseInt(tile[0]) + 2;
    let upMove = parseInt(tile[1]) + 1;
    let downMove = parseInt(tile[1]) - 1;

    let upLeftAttack = leftMove.toString() + upUpMove;
    let upRightAttack = rightMove.toString() + upUpMove;
    let downLeftAttack = leftMove.toString() + downDownMove;
    let downRightAttack = rightMove.toString() + downDownMove;

    let leftUpAttack = leftLeftMove.toString() + upMove;
    let leftDownAttack = leftLeftMove.toString() + downMove;
    let rightUpAttack = rightRightMove.toString() + upMove;
    let rightDownAttack = rightRightMove.toString() + downMove;

    if (
      !ownPieces.includes(boardState[upLeftAttack]) &&
      !attackPiece(upLeftAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [upLeftAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [upLeftAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[upRightAttack]) &&
      !attackPiece(upRightAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [upRightAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [upRightAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[downLeftAttack]) &&
      !attackPiece(downLeftAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [downLeftAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [downLeftAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[downRightAttack]) &&
      !attackPiece(downRightAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [downRightAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [downRightAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[leftUpAttack]) &&
      !attackPiece(leftUpAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [leftUpAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [leftUpAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[leftDownAttack]) &&
      !attackPiece(leftDownAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [leftDownAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [leftDownAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[rightUpAttack]) &&
      !attackPiece(rightUpAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [rightUpAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [rightUpAttack]: "m",
      }));
    }
    if (
      !ownPieces.includes(boardState[rightDownAttack]) &&
      !attackPiece(rightDownAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [rightDownAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [rightDownAttack]: "m",
      }));
    }
  }

  function upRightMove(tile, isWhite, ownPieces) {
    let upMove = parseInt(tile[1]) + 1;
    let rightMove = parseInt(tile[0]) + 1;
    let upRightAttack = rightMove.toString() + upMove;
    while (upMove < 9 && rightMove < 9) {
      const currentUpRightAttack = upRightAttack;
      if (
        ownPieces.includes(boardState[currentUpRightAttack]) ||
        attackPiece(currentUpRightAttack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentUpRightAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentUpRightAttack]: "m",
      }));
      upMove++;
      rightMove++;
      upRightAttack = rightMove.toString() + upMove;
    }
  }

  function downRightMove(tile, isWhite, ownPieces) {
    let downMove = parseInt(tile[1]) - 1;
    let rightMove = parseInt(tile[0]) + 1;
    let downRightAttack = rightMove.toString() + downMove;
    while (downMove > 0 && rightMove < 9) {
      const currentDownRightAttack = downRightAttack;

      if (
        ownPieces.includes(boardState[currentDownRightAttack]) ||
        attackPiece(currentDownRightAttack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentDownRightAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentDownRightAttack]: "m",
      }));
      downMove = downMove - 1;
      rightMove++;
      downRightAttack = rightMove.toString() + downMove;
    }
  }

  function upLeftMove(tile, isWhite, ownPieces) {
    let upMove = parseInt(tile[1]) + 1;
    let leftMove = parseInt(tile[0]) - 1;
    let upLeftAttack = leftMove.toString() + upMove;
    while (upMove < 9 && leftMove > 0) {
      const currentLeftUpAttack = upLeftAttack;

      if (
        ownPieces.includes(boardState[currentLeftUpAttack]) ||
        attackPiece(currentLeftUpAttack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentLeftUpAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentLeftUpAttack]: "m",
      }));
      upMove++;
      leftMove = leftMove - 1;
      upLeftAttack = leftMove.toString() + upMove;
    }
  }

  function downLeftMove(tile, isWhite, ownPieces) {
    let downMove = parseInt(tile[1]) - 1;
    let leftMove = parseInt(tile[0]) - 1;
    let downLeftAttack = leftMove.toString() + downMove;
    while (downMove > 0 && leftMove > 0) {
      const currentDownLeftAttack = downLeftAttack;

      if (
        ownPieces.includes(boardState[currentDownLeftAttack]) ||
        attackPiece(currentDownLeftAttack, isWhite)
      ) {
        break;
      }
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [currentDownLeftAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [currentDownLeftAttack]: "m",
      }));
      downMove = downMove - 1;
      leftMove = leftMove - 1;
      downLeftAttack = leftMove.toString() + downMove;
    }
  }

  function showBishopMoves(tile, isWhite) {
    setSelectedTile(tile);
    const ownPieces = isWhite ? whitePieces : blackPieces;

    upRightMove(tile, isWhite, ownPieces);
    downRightMove(tile, isWhite, ownPieces);
    upLeftMove(tile, isWhite, ownPieces);
    downLeftMove(tile, isWhite, ownPieces);
  }

  function showQueenMoves(tile, isWhite) {
    setSelectedTile(tile);
    const ownPieces = isWhite ? whitePieces : blackPieces;

    leftMove(tile, isWhite, ownPieces);
    upMove(tile, isWhite, ownPieces);
    rightMove(tile, isWhite, ownPieces);
    downMove(tile, isWhite, ownPieces);
    upLeftMove(tile, isWhite, ownPieces);
    upRightMove(tile, isWhite, ownPieces);
    downLeftMove(tile, isWhite, ownPieces);
    downRightMove(tile, isWhite, ownPieces);
  }

  function showKingMoves(tile, isWhite) {
    setSelectedTile(tile);
    const ownPieces = isWhite ? whitePieces : blackPieces;

    let upMove = parseInt(tile[1]) + 1;
    let leftMove = parseInt(tile[0]) - 1;
    let rightMove = parseInt(tile[0]) + 1;
    let downMove = parseInt(tile[1]) - 1;

    let upAttack = tile[0] + upMove;
    if (
      !ownPieces.includes(boardState[upAttack]) &&
      !attackPiece(upAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [upAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [upAttack]: "m",
      }));
    }

    let upLeftAttack = leftMove.toString() + upMove;
    if (
      !ownPieces.includes(boardState[upLeftAttack]) &&
      !attackPiece(upLeftAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [upLeftAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [upLeftAttack]: "m",
      }));
    }

    let upRightAttack = rightMove.toString() + upMove;
    if (
      !ownPieces.includes(boardState[upRightAttack]) &&
      !attackPiece(upRightAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [upRightAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [upRightAttack]: "m",
      }));
    }

    let leftMoveAttack = leftMove + tile[1];
    if (
      !ownPieces.includes(boardState[leftMoveAttack]) &&
      !attackPiece(leftMoveAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [leftMoveAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [leftMoveAttack]: "m",
      }));
    }

    let rightMoveAttack = rightMove + tile[1];
    if (
      !ownPieces.includes(boardState[rightMoveAttack]) &&
      !attackPiece(rightMoveAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [rightMoveAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [rightMoveAttack]: "m",
      }));
    }

    let downMoveAttack = tile[0] + downMove;
    if (
      !ownPieces.includes(boardState[downMoveAttack]) &&
      !attackPiece(downMoveAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [downMoveAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [downMoveAttack]: "m",
      }));
    }

    let downRightAttack = rightMove.toString() + downMove;
    if (
      !ownPieces.includes(boardState[downRightAttack]) &&
      !attackPiece(downRightAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [downRightAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [downRightAttack]: "m",
      }));
    }

    let downLeftAttack = leftMove.toString() + downMove;
    if (
      !ownPieces.includes(boardState[downLeftAttack]) &&
      !attackPiece(downLeftAttack, isWhite)
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [downLeftAttack],
      ]);
      setBoardState((boardState) => ({
        ...boardState,
        [downLeftAttack]: "m",
      }));
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
