import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../styles/components/modal.css";
import { connect } from "react-redux";
import { setModal } from "../actions";
class Modal extends Component {
  state = {};
  close = () => {
    this.props.setModal(false);
  };
  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return ReactDOM.createPortal(
      <div className="Modal">
        <div className="Modal__container">
          <button onClick={this.close} className="Modal__close-button">
            X
          </button>
          {this.props.children}
        </div>
      </div>,
      document.getElementById("modal")
    );
  }
}

const mapDispatchToProps = {
  setModal,
};

export default connect(null, mapDispatchToProps)(Modal);
