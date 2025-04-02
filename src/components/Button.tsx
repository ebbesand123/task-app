import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
