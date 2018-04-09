import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';


const ContactForm = () => (
  <div>
    <Form />
  </div>
);

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      website: '',
      company: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    };
  }
  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  submitContact() {
    axios.post('/contact/create-or-update', this.state);
  }
  render() {
    return (
      <form>
        <FormGroup
          controlId="form"
        >
          <ControlLabel>First name</ControlLabel>
          <FormControl
            name="firstName"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Last name</ControlLabel>
          <FormControl
            name="lastName"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Email</ControlLabel>
          <FormControl
            name="email"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Website</ControlLabel>
          <FormControl
            name="website"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Company</ControlLabel>
          <FormControl
            name="company"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Phone</ControlLabel>
          <FormControl
            name="phone"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Address</ControlLabel>
          <FormControl
            name="address"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>City</ControlLabel>
          <FormControl
            name="city"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>State</ControlLabel>
          <FormControl
            name="state"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
          <ControlLabel>Zip Code</ControlLabel>
          <FormControl
            name="zip"
            type="text"
            value={this.state.value}
            onChange={(event, val) => this.onChange(event, val)}
          />
        </FormGroup>
        <Button
          onClick={() => this.submitContact()}
        >Submit</Button>
      </form>
    );
  }
}


ReactDOM.render(<ContactForm />, document.getElementById('form-root'));
