import Board from "./components/Board";

let pieces = [
  ["r", "k", "b", "q", "k", "b", "k", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "K", "B", "Q", "K", "B", "K", "R"],
];

export default function Home() {
  return (
    <main className="bg-[#181818] h-screen flex justify-center items-center p-20">
      <Board />
    </main>
  );
}
