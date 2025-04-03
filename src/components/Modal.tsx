import { ReactNode, Ref, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export type ModalRefObject = {
  open: () => void;
};

export type ModalProps = {
  children: ReactNode;
  ref: Ref<ModalRefObject>;
  modalRoot: HTMLElement;
  buttonCaption: string;
};

function Modal({ children, ref, modalRoot, buttonCaption }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      className="justify-self-center self-center backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
      ref={dialog}
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    modalRoot
  );
}

export default Modal;
