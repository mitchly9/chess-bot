const whitePieces = ["P", "R", "N", "B", "Q", "K"];
const blackPieces = ["p", "r", "n", "b", "q", "k"];

export function showRookMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile,
  show
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  leftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  rightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  upMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  downMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
}

export function shownKnightMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile,
  show
) {
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
    upUpMove <= 8 &&
    leftMove >= 1 &&
    !ownPieces.includes(boardState[upLeftAttack]) &&
    !attackPiece(
      upLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [upLeftAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [upLeftAttack]: "m",
      }));
    }
  }

  if (
    upUpMove <= 8 &&
    rightMove <= 8 &&
    !ownPieces.includes(boardState[upRightAttack]) &&
    !attackPiece(
      upRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [upRightAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [upRightAttack]: "m",
      }));
    }
  }
  if (
    downDownMove >= 1 &&
    leftMove >= 1 &&
    !ownPieces.includes(boardState[downLeftAttack]) &&
    !attackPiece(
      downLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [downLeftAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [downLeftAttack]: "m",
      }));
    }
  }
  if (
    downDownMove >= 1 &&
    rightMove <= 8 &&
    !ownPieces.includes(boardState[downRightAttack]) &&
    !attackPiece(
      downRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [downRightAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [downRightAttack]: "m",
      }));
    }
  }
  if (
    leftLeftMove >= 1 &&
    upMove <= 8 &&
    !ownPieces.includes(boardState[leftUpAttack]) &&
    !attackPiece(
      leftUpAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [leftUpAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [leftUpAttack]: "m",
      }));
    }
  }

  if (
    leftLeftMove >= 1 &&
    downMove >= 1 &&
    !ownPieces.includes(boardState[leftDownAttack]) &&
    !attackPiece(
      leftDownAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [leftDownAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [leftDownAttack]: "m",
      }));
    }
  }
  if (
    rightRightMove <= 8 &&
    upMove <= 8 &&
    !ownPieces.includes(boardState[rightUpAttack]) &&
    !attackPiece(
      rightUpAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [rightUpAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [rightUpAttack]: "m",
      }));
    }
  }
  if (
    rightRightMove <= 8 &&
    downMove >= 1 &&
    !ownPieces.includes(boardState[rightDownAttack]) &&
    !attackPiece(
      rightDownAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [rightDownAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [rightDownAttack]: "m",
      }));
    }
  }
}

export function showPawnMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile,
  moves,
  show
) {
  checkEnPassant(
    tile,
    isWhite,
    boardState,
    setPossibleMoves,
    setBoardState,
    moves,
    show
  );
  setSelectedTile(tile);
  let verticalMove = isWhite ? parseInt(tile[1]) + 1 : parseInt(tile[1]) - 1;

  let newTile = tile[0] + verticalMove;
  if (boardState[newTile] === "-") {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [newTile],
    ]);
    if (show) {
      setBoardState((boardState) => ({ ...boardState, [newTile]: "m" }));
    }
    if ((isWhite && tile[1] === "2") || (!isWhite && tile[1] === "7")) {
      let newTile = tile[0] + (isWhite ? verticalMove + 1 : verticalMove - 1);
      if (boardState[newTile] === "-") {
        setPossibleMoves((currentPossibleMoves) => [
          ...currentPossibleMoves,
          [newTile],
        ]);
        if (show) {
          setBoardState((boardState) => ({ ...boardState, [newTile]: "m" }));
        }
      }
    }
  }

  let horizontalMove = parseInt(tile[0]) - 1;
  let leftAttack = horizontalMove.toString() + verticalMove;
  attackPiece(
    leftAttack,
    isWhite,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );

  horizontalMove = parseInt(tile[0]) + 1;
  let rightAttack = horizontalMove.toString() + verticalMove;
  attackPiece(
    rightAttack,
    isWhite,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
}

function checkCastle(
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  kingMoved,
  qRookMoved,
  kRookMoved,
  show
) {
  // Where the white pieces are
  let qRook = "11";
  let kRook = "81";
  let king = "51";

  // Check it's empty between king and rook
  let queenSide1 = "21";
  let queenSide2 = "31";
  let queenSide3 = "41";

  let kingSide1 = "61";
  let kingSide2 = "71";

  // Where the circle pops up
  let kingSideCastle = "71";
  let queenSideCastle = "31";

  let queenCastleType = "CQ";
  let kingCastleType = "CK";

  if (!isWhite) {
    // Where the white pieces are
    qRook = "18";
    kRook = "88";
    king = "58";

    // Check it's empty between king and rook
    queenSide1 = "28";
    queenSide2 = "38";
    queenSide3 = "48";

    kingSide1 = "68";
    kingSide2 = "78";

    // Where the circle pops up
    kingSideCastle = "78";
    queenSideCastle = "38";

    queenCastleType = "cq";
    kingCastleType = "ck";
  }
  if (!kingMoved) {
    // Queen Side
    if (
      !qRookMoved &&
      boardState[queenSide1] == "-" &&
      boardState[queenSide2] == "-" &&
      boardState[queenSide3] == "-"
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [queenSideCastle],
      ]);
      if (show) {
        setBoardState((boardState) => ({
          ...boardState,
          [queenSideCastle]: queenCastleType,
        }));
      }
    }

    // King Side
    if (
      !kRookMoved &&
      boardState[kingSide1] == "-" &&
      boardState[kingSide2] == "-"
    ) {
      setPossibleMoves((currentPossibleMoves) => [
        ...currentPossibleMoves,
        [kingSideCastle],
      ]);
      if (show) {
        setBoardState((boardState) => ({
          ...boardState,
          [kingSideCastle]: kingCastleType,
        }));
      }
    }
  }
}

function checkEnPassant(
  currentTile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  moves,
  show
) {
  if (isWhite) {
    if (currentTile[1] !== "5") {
      return;
    }
  } else {
    if (currentTile[1] !== "4") {
      return;
    }
  }

  const opponentPieces = isWhite ? "p" : "P";
  const take = isWhite ? "EN" : "en";
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
  let leftSide = currentTile[0] - 1 + currentTile[1];
  let rightSide = parseInt(currentTile[0]) + 1 + currentTile[1];
  console.log(rightSide);

  if (
    boardState[leftSide] === opponentPieces &&
    moves[moves.length - 1] === charMap[currentTile[0] - 1] + currentTile[1]
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [leftSide[0] + (parseInt(currentTile[1]) + 1)],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [leftSide[0] + (parseInt(currentTile[1]) + 1)]: take,
      }));
    }
  }

  if (
    boardState[rightSide] === opponentPieces &&
    moves[moves.length - 1] ===
      charMap[parseInt(currentTile[0]) + 1] + currentTile[1]
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [rightSide[0] + (parseInt(currentTile[1]) + 1)],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [rightSide[0] + (parseInt(currentTile[1]) + 1)]: take,
      }));
    }
  }
}

function attackPiece(
  attackedTile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  const opponentPieces = isWhite ? blackPieces : whitePieces;
  if (opponentPieces.includes(boardState[attackedTile])) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [attackedTile],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [attackedTile]: boardState[attackedTile] + "x",
      }));
    }
  }
  return opponentPieces.includes(boardState[attackedTile]);
}

export function showBishopMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile,
  show
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  upRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  downRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  upLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  downLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
}

export function showQueenMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile,
  show
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  leftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  upMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  rightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  downMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  upLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  upRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  downLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
  downRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState,
    show
  );
}

export function castleKing(
  setBoardState,
  castleType,
  isWhite,
  setSelectedTile,
  setPossibleMoves,
  setTurn
) {
  setSelectedTile("");
  setPossibleMoves([]);
  setTurn((currentTurn) => currentTurn + 1);
  // Where the white pieces are
  let qRook = "11";
  let kRook = "81";
  let king = "51";

  // Check it's empty between king and rook
  let queenSide1 = "21";
  let queenSide2 = "31";
  let queenSide3 = "41";

  let kingSide1 = "61";
  let kingSide2 = "71";

  // Where the circle pops up
  let kingSideCastle = "71";
  let queenSideCastle = "31";

  let queenCastleType = "CQ";
  let kingCastleType = "CK";

  // Color Type
  let kingColor = "K";
  let rookColor = "R";

  if (!isWhite) {
    // Where the white pieces are
    qRook = "18";
    kRook = "88";
    king = "58";

    // Check it's empty between king and rook
    queenSide1 = "28";
    queenSide2 = "38";
    queenSide3 = "48";

    kingSide1 = "68";
    kingSide2 = "78";

    // Where the circle pops up
    kingSideCastle = "78";
    queenSideCastle = "38";

    queenCastleType = "cq";
    kingCastleType = "ck";

    kingColor = "k";
    rookColor = "r";
  }

  switch (castleType) {
    case "cq":
    case "CQ":
      setBoardState((boardState) => ({
        ...boardState,
        [qRook]: "-",
      }));
      setBoardState((boardState) => ({
        ...boardState,
        [king]: "-",
      }));
      setBoardState((boardState) => ({
        ...boardState,
        [queenSideCastle]: kingColor,
      }));
      setBoardState((boardState) => ({
        ...boardState,
        [queenSide3]: rookColor,
      }));

      break;
    case "ck":
    case "CK":
      setBoardState((boardState) => ({
        ...boardState,
        [kRook]: "-",
      }));
      setBoardState((boardState) => ({
        ...boardState,
        [king]: "-",
      }));
      setBoardState((boardState) => ({
        ...boardState,
        [kingSideCastle]: kingColor,
      }));
      setBoardState((boardState) => ({
        ...boardState,
        [kingSide1]: rookColor,
      }));
      break;
    default:
      break;
  }
}

export function showKingMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile,
  kingMoved,
  qRookMoved,
  kRookMoved,
  show
) {
  checkCastle(
    isWhite,
    boardState,
    setPossibleMoves,
    setBoardState,
    kingMoved,
    qRookMoved,
    kRookMoved,
    show
  );
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  let upMove = parseInt(tile[1]) + 1;
  let leftMove = parseInt(tile[0]) - 1;
  let rightMove = parseInt(tile[0]) + 1;
  let downMove = parseInt(tile[1]) - 1;

  let upAttack = tile[0] + upMove;
  if (
    upAttack <= 8 &&
    !ownPieces.includes(boardState[upAttack]) &&
    !attackPiece(
      upAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [upAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [upAttack]: "m",
      }));
    }
  }

  let upLeftAttack = leftMove.toString() + upMove;
  if (
    upAttack <= 8 &&
    leftMove >= 1 &&
    !ownPieces.includes(boardState[upLeftAttack]) &&
    !attackPiece(
      upLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [upLeftAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [upLeftAttack]: "m",
      }));
    }
  }

  let upRightAttack = rightMove.toString() + upMove;
  if (
    upAttack <= 8 &&
    rightMove <= 8 &&
    !ownPieces.includes(boardState[upRightAttack]) &&
    !attackPiece(
      upRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [upRightAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [upRightAttack]: "m",
      }));
    }
  }

  let leftMoveAttack = leftMove + tile[1];
  if (
    leftMove >= 1 &&
    !ownPieces.includes(boardState[leftMoveAttack]) &&
    !attackPiece(
      leftMoveAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [leftMoveAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [leftMoveAttack]: "m",
      }));
    }
  }

  let rightMoveAttack = rightMove + tile[1];
  if (
    rightMove <= 8 &&
    !ownPieces.includes(boardState[rightMoveAttack]) &&
    !attackPiece(
      rightMoveAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [rightMoveAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [rightMoveAttack]: "m",
      }));
    }
  }

  let downMoveAttack = tile[0] + downMove;
  if (
    downMove >= 1 &&
    !ownPieces.includes(boardState[downMoveAttack]) &&
    !attackPiece(
      downMoveAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [downMoveAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [downMoveAttack]: "m",
      }));
    }
  }

  let downRightAttack = rightMove.toString() + downMove;
  if (
    downMove >= 1 &&
    !ownPieces.includes(boardState[downRightAttack]) &&
    !attackPiece(
      downRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [downRightAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [downRightAttack]: "m",
      }));
    }
  }

  let downLeftAttack = leftMove.toString() + downMove;
  if (
    downMove >= 1 &&
    !ownPieces.includes(boardState[downLeftAttack]) &&
    !attackPiece(
      downLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState,
      show
    )
  ) {
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [downLeftAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [downLeftAttack]: "m",
      }));
    }
  }
}

function leftMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let leftMove = parseInt(tile[0]) - 1;
  let leftAttack = leftMove + tile[1];
  while (leftMove > 0) {
    const currentLeftAtack = leftAttack;
    if (
      ownPieces.includes(boardState[currentLeftAtack]) ||
      attackPiece(
        currentLeftAtack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }

    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentLeftAtack]: "m",
      }));
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentLeftAtack],
    ]);

    leftMove--;
    leftAttack = leftMove + tile[1];
  }
}

function rightMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let rightMove = parseInt(tile[0]) + 1;
  let rightAttack = rightMove + tile[1];
  while (rightMove < 9) {
    const currentRightAtack = rightAttack;
    if (
      ownPieces.includes(boardState[currentRightAtack]) ||
      attackPiece(
        currentRightAtack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentRightAtack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentRightAtack]: "m",
      }));
    }
    rightMove++;
    rightAttack = rightMove + tile[1];
  }
}

function downMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let downMove = parseInt(tile[1]) - 1;
  let downAttack = tile[0] + downMove;
  while (downMove > 0) {
    const currentDownAttack = downAttack;
    if (
      ownPieces.includes(boardState[currentDownAttack]) ||
      attackPiece(
        currentDownAttack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentDownAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentDownAttack]: "m",
      }));
    }

    downMove = downMove - 1;
    downAttack = tile[0] + downMove;
  }
}

function upMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let upMove = parseInt(tile[1]) + 1;
  let upAttack = tile[0] + upMove;
  while (upMove < 9) {
    const currentUpAttack = upAttack;
    if (
      ownPieces.includes(boardState[currentUpAttack]) ||
      attackPiece(
        currentUpAttack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentUpAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentUpAttack]: "m",
      }));
    }

    upMove++;
    upAttack = tile[0] + upMove;
  }
}

function upRightMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let upMove = parseInt(tile[1]) + 1;
  let rightMove = parseInt(tile[0]) + 1;
  let upRightAttack = rightMove.toString() + upMove;
  while (upMove < 9 && rightMove < 9) {
    const currentUpRightAttack = upRightAttack;
    if (
      ownPieces.includes(boardState[currentUpRightAttack]) ||
      attackPiece(
        currentUpRightAttack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentUpRightAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentUpRightAttack]: "m",
      }));
    }
    upMove++;
    rightMove++;
    upRightAttack = rightMove.toString() + upMove;
  }
}

function downRightMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let downMove = parseInt(tile[1]) - 1;
  let rightMove = parseInt(tile[0]) + 1;
  let downRightAttack = rightMove.toString() + downMove;
  while (downMove > 0 && rightMove < 9) {
    const currentDownRightAttack = downRightAttack;

    if (
      ownPieces.includes(boardState[currentDownRightAttack]) ||
      attackPiece(
        currentDownRightAttack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentDownRightAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentDownRightAttack]: "m",
      }));
    }
    downMove = downMove - 1;
    rightMove++;
    downRightAttack = rightMove.toString() + downMove;
  }
}

function upLeftMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let upMove = parseInt(tile[1]) + 1;
  let leftMove = parseInt(tile[0]) - 1;
  let upLeftAttack = leftMove.toString() + upMove;
  while (upMove < 9 && leftMove > 0) {
    const currentLeftUpAttack = upLeftAttack;

    if (
      ownPieces.includes(boardState[currentLeftUpAttack]) ||
      attackPiece(
        currentLeftUpAttack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentLeftUpAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentLeftUpAttack]: "m",
      }));
    }
    upMove++;
    leftMove = leftMove - 1;
    upLeftAttack = leftMove.toString() + upMove;
  }
}

function downLeftMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState,
  show
) {
  let downMove = parseInt(tile[1]) - 1;
  let leftMove = parseInt(tile[0]) - 1;
  let downLeftAttack = leftMove.toString() + downMove;
  while (downMove > 0 && leftMove > 0) {
    const currentDownLeftAttack = downLeftAttack;

    if (
      ownPieces.includes(boardState[currentDownLeftAttack]) ||
      attackPiece(
        currentDownLeftAttack,
        isWhite,
        boardState,
        setPossibleMoves,
        setBoardState,
        show
      )
    ) {
      break;
    }
    setPossibleMoves((currentPossibleMoves) => [
      ...currentPossibleMoves,
      [currentDownLeftAttack],
    ]);
    if (show) {
      setBoardState((boardState) => ({
        ...boardState,
        [currentDownLeftAttack]: "m",
      }));
    }
    downMove = downMove - 1;
    leftMove = leftMove - 1;
    downLeftAttack = leftMove.toString() + downMove;
  }
}
