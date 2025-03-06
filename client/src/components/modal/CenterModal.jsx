import { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const CenterModal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen">
      {/* Overlay */}
      <div
        className="fixed inset-0 transition-opacity"
        onClick={onClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      />

      {/* Modal */}
      <div
        className="relative z-50 max-w-lg mx-4 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "calc(100vh - 4rem)", width: "600px" }} // Adjusted max height
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal content */}
        <div className="p-6">
          {title && (
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {title}
            </h3>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
CenterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.string,
};

export default CenterModal;
