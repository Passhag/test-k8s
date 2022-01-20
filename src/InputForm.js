import React, { Component } from 'react';
import axios from 'axios';

class InputForm extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/save', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>
    );
  }
}

export default InputForm;
