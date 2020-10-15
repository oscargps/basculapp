import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../styles/components/modal.css";
import { connect } from "react-redux";
import { setModal2 } from "../actions";
class Modal2 extends Component {
  state = {};

  close = () => {
    this.props.setModal2(false);
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
      document.getElementById("modal2")
    );
  }
}

const mapDispatchToProps = {
  setModal2,
};

export default connect(null, mapDispatchToProps)(Modal2);
