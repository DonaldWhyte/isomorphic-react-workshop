import React from 'react';
import { FormControl } from 'react-bootstrap';

export default class TextInput extends React.Component {

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  onChangeWrapper = (event) => {
    this.setState({
      value: event.target.value
    });
    // Invoke parent's callback, passing new value
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div>
        <FormControl type="text" value={ this.state.value }
                     placeholder={ this.props.placeholder }
                     onChange={ this.onChangeWrapper } />
      </div>
    );
  }

}
