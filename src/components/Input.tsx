import { HTMLInputTypeAttribute, Ref } from "react";

type InputProps = {
  label: string;
  ref: Ref<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
};

export default function Input({ label, type, ref }: InputProps) {
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      <input
        type={type}
        ref={ref}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
      />
    </p>
  );
}
