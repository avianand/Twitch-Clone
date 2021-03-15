import React from "react";
import ReactDOM, { render } from "react-dom";

const Modal = ({ title, actions, stream, content, onDismiss }) => {
  const renderModal = () => {
    return (
      <div onClick={onDismiss} className="ui dimmer modals visible active">
        <div
          onClick={(e) => e.stopPropagation()}
          className="ui standard modal visible active"
        >
          <div className="header">{title}</div>
          <div className="content">{content}</div>
          <div className="actions">{actions}</div>
        </div>
      </div>
    );
  };
  return ReactDOM.createPortal(renderModal(), document.querySelector("#modal"));
};

export default Modal;
