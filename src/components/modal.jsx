import React, {Component} from "react";
import ReactDOM from "react-dom";
import '../styles/components/modal.css';

class Modal extends Component {
    state={}
    render() {
        if(!this.props.isOpen)
        {
            return null
        }
        return (
            ReactDOM.createPortal(
                <div className="Modal">
                    <div className="Modal__container">
                        <button onClick={this.props.onClose} className="Modal__close-button">X</button>
                        {this.props.children}
                    </div>
                </div>,
                 document.getElementById('modal'))
        )
    }
}


export default Modal