import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34, 34, 34)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  zIndex: 1000,
};

export default function Modals({ children, onClose }) {
  const portalRoot = document.getElementById("cart-root");

  if (!portalRoot) {
    console.error("The 'cart-root' element is missing in index.html.");
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose}></div>
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger fs-4"
          style={{ marginLeft: "90%", marginTop: "-35px" }}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    portalRoot
  );
}
