import React, { Component } from 'react';

class Net extends Component<{}, { hasError: boolean, message: string }> {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError(error) {
    let message = 'Something went wrong';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if (typeof error === 'object' && typeof error.message === 'string') {
      message = error.message;
    }
    return {
      hasError: true,
      message,
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>{this.state.message}</div>
      );
    }
    return this.props.children;
  }
  componentDidCatch(error, errorInfo) {
    console.error(error);
  }
}

export default Net;
