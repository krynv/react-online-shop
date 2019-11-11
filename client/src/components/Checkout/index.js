import React from "react";
import { Container, Box, Heading, TextField } from "gestalt";

import ToastMessage from "../ToastMessage";

class Checkout extends React.Component {
  state = {
    address: "",
    postalCode: "",
    townOrCity: "",
    confirmEmail: "",
    toast: false,
    toastMessage: ""
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleConfirmOrder = async e => {
    e.preventDefault();

    if (this.isFormEmpty(this.state)) {
      this.showToast("Please fill in all of the required fields");
      return;
    }
  };

  isFormEmpty = ({ address, postalCode, townOrCity, confirmEmail }) => {
    return !address || !postalCode || !townOrCity || !confirmEmail;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 5000);
  };

  render() {
    const { toast, toastMessage } = this.state;

    return (
      <Container>
        <Box
          color="darkWash"
          margin={4}
          padding={4}
          display="flex"
          justifyContent="center"
        >
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleConfirmOrder}
          >
            <Heading color="midnight">Checkout</Heading>

            <TextField
              id="address"
              type="text"
              name="address"
              placeholder="Shipping Address"
              onChange={this.handleChange}
            />
            <TextField
              id="postalCode"
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              onChange={this.handleChange}
            />
            <TextField
              id="townOrCity"
              type="text"
              name="townOrCity"
              placeholder="Your Town or City of Residence"
              onChange={this.handleChange}
            />

            <TextField
              id="confirmEmail"
              type="email"
              name="confirmEmail"
              placeholder="Please confirm your email address"
              onChange={this.handleChange}
            />

            <button id="stripe__button" type="submit">
              Submit
            </button>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}

export default Checkout;
