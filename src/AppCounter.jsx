import { useState } from "react";

const AppCounter = () => {
  const [count, setCount] = useState(0);

  const Button = ({ children, onClick, disabled }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-black rounded-lg text-white w-24 h-10 text-xl ${
          disabled ? "opacity-50" : "hover:bg-gray-800"
        }`}
      >
        {children}
      </button>
    );
  };

  const isDone = count > 9 || count < 0;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl font-bold">Counter</h1>
      <div className="mt-5">
        <Button onClick={() => setCount(count + 1)} disabled={isDone}>
          tambah
        </Button>
        <span className="text-3xl mx-5 font-bold">
          {isDone ? "Done" : count}
        </span>
        <Button onClick={() => setCount(count - 1)} disabled={isDone}>
          kurang
        </Button>
      </div>
      <div className="mt-5">
        <Button onClick={() => setCount(0)} disabled={!isDone}>
          reset
        </Button>
      </div>
    </div>
  );
};

export default AppCounter;
