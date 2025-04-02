import { ReactNode, Ref, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

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
    <dialog ref={dialog}>
      {children}
      <form method="dialog">
        <button>{buttonCaption}</button>
      </form>
    </dialog>,
    modalRoot
  );
}

export default Modal;
