import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Square = ({ value, onSquareClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ backgroundColor: "#4ade80", scale: 1.1 }}
      className="w-24 h-24 border-4 border-gray-300 flex items-center justify-center text-4xl font-bold bg-white shadow-xl rounded-lg transition-all duration-300 ease-in-out"
      onClick={onSquareClick}
    >
      {value}
    </motion.button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState(""); // Menyimpan pesan modal

  function handleClick(e) {
    if (squares[e] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[e] = xIsNext ? "❌" : "⭕";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setWinner(newWinner);
      setMessage(
        newWinner === "Draw"
          ? "Permainan Seri!"
          : `Pemenangnya adalah ${newWinner}`
      );
      setModalIsOpen(true); // Tampilkan modal saat ada pemenang atau hasil seri
    }
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setModalIsOpen(false); // Tutup modal
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="grid grid-cols-3 gap-3 p-6 bg-gray-900 rounded-lg shadow-2xl"
      >
        {squares.map((square, index) => (
          <Square
            key={index}
            value={square}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </motion.div>

      {/* Modal Pemenang atau Seri */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={resetGame}
        className="bg-white p-8 rounded-lg shadow-xl text-center mx-auto w-80"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-800"
        >
          {message}
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fde047", color: "#000" }}
          whileTap={{ scale: 0.9 }}
          className="mt-2 px-8 py-4 bg-yellow-400 text-black font-bold rounded-full shadow-xl transition-all duration-300 ease-in-out"
          onClick={resetGame}
        >
          Main Lagi
        </motion.button>
      </Modal>
      <div className="mt-4">
        <span className="">z i d h a n r a f f l y</span>
      </div>
    </div>
  );
};


export default Board;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // Jika semua kotak terisi dan tidak ada pemenang
  if (!squares.includes(null)) {
    return "Draw"; // Menyatakan hasil seri
  }

  return null;
}

