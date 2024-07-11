const whitePieces = ["P", "R", "N", "B", "Q", "K"];
const blackPieces = ["p", "r", "n", "b", "q", "k"];

export function showRookMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  leftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  rightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  upMove(tile, isWhite, ownPieces, boardState, setPossibleMoves, setBoardState);
  downMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
}

export function shownKnightMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile
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
    !ownPieces.includes(boardState[upLeftAttack]) &&
    !attackPiece(
      upLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      upRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      downLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      downRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      leftUpAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      leftDownAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      rightUpAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      rightDownAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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

export function showPawnMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile
) {
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
  attackPiece(leftAttack, isWhite, boardState, setPossibleMoves, setBoardState);

  horizontalMove = parseInt(tile[0]) + 1;
  let rightAttack = horizontalMove.toString() + verticalMove;
  attackPiece(
    rightAttack,
    isWhite,
    boardState,
    setPossibleMoves,
    setBoardState
  );
}

function attackPiece(
  attackedTile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState
) {
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

export function showBishopMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  upRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  downRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  upLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  downLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
}

export function showQueenMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  leftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  upMove(tile, isWhite, ownPieces, boardState, setPossibleMoves, setBoardState);
  rightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  downMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  upLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  upRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  downLeftMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
  downRightMove(
    tile,
    isWhite,
    ownPieces,
    boardState,
    setPossibleMoves,
    setBoardState
  );
}

export function showKingMoves(
  tile,
  isWhite,
  boardState,
  setPossibleMoves,
  setBoardState,
  setSelectedTile
) {
  setSelectedTile(tile);
  const ownPieces = isWhite ? whitePieces : blackPieces;

  let upMove = parseInt(tile[1]) + 1;
  let leftMove = parseInt(tile[0]) - 1;
  let rightMove = parseInt(tile[0]) + 1;
  let downMove = parseInt(tile[1]) - 1;

  let upAttack = tile[0] + upMove;
  if (
    !ownPieces.includes(boardState[upAttack]) &&
    !attackPiece(upAttack, isWhite, boardState, setPossibleMoves, setBoardState)
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
    !attackPiece(
      upLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      upRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      leftMoveAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      rightMoveAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      downMoveAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      downRightAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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
    !attackPiece(
      downLeftAttack,
      isWhite,
      boardState,
      setPossibleMoves,
      setBoardState
    )
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

function leftMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function rightMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function downMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function upMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function upRightMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function downRightMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function upLeftMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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

function downLeftMove(
  tile,
  isWhite,
  ownPieces,
  boardState,
  setPossibleMoves,
  setBoardState
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
        setBoardState
      )
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
