interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="ui-modal">
      <div className="ui-modal__panel">
        <div className="ui-modal__header">
          <h2 className="ui-modal__title">{title}</h2>
          <button
            onClick={onClose}
            className="ui-modal__close"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}