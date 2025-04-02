import { useRef } from "react";
import Input from "./Input";
import InputArea from "./InputArea";
import Modal, { type ModalRefObject } from "./Modal";

export type Project = {
  title: string;
  description: string;
  dueDate: string;
};

type NewProjectProps = {
  onAdd: ({ title, description, dueDate }: Project) => void;
};

export default function NewProject({ onAdd }: NewProjectProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  const modal = useRef<ModalRefObject>(null);
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  function handleSave() {
    const enteredTitle = title.current?.value;
    const enteredDescription = description.current?.value;
    const enteredDueDate = dueDate.current?.value;

    if (
      typeof enteredTitle === "undefined" ||
      typeof enteredDescription === "undefined" ||
      typeof enteredDueDate === "undefined"
    ) {
      modal.current?.open();
    } else {
      onAdd({
        title: enteredTitle.trim(),
        description: enteredDescription.trim(),
        dueDate: enteredDueDate,
      });
    }
  }

  return (
    <>
      <Modal buttonCaption="Close" modalRoot={modalRoot} ref={modal}>
        <h2>Invalid Input</h2>
        <p>Oops.. look like you forgot to enter a value.</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSave()}
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="Title" />
          <InputArea ref={description} label="Description" />
          <Input type="date" ref={dueDate} label="Due Date" />
        </div>
      </div>
    </>
  );
}
