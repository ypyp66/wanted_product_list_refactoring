import { Component } from 'react';
import ReactDom from 'react-dom';

export default class ModalPortal extends Component {
  render() {
    const { children } = this.props;
    const el = document.getElementById('modal');
    return ReactDom.createPortal(children, el);
  }
}
