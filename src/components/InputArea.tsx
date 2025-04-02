import { Ref } from "react";

type InputAreaProps = {
  label: string;
  ref: Ref<HTMLTextAreaElement>;
};

export default function InputArea({ label, ref }: InputAreaProps) {
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      <textarea
        ref={ref}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
      />
    </p>
  );
}
