import React from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  TextField,
  Modal,
  Spinner,
  Button
} from "gestalt";

import ToastMessage from "../ToastMessage";
import { getCart, calculatePrice, clearToken } from "../../utils";

class Checkout extends React.Component {
  state = {
    cartItems: [],
    address: "",
    postalCode: "",
    townOrCity: "",
    confirmEmail: "",
    toast: false,
    toastMessage: "",
    orderProcessing: false,
    modal: false
  };

  componentDidMount() {
    this.setState({ cartItems: getCart() });
  }

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

    this.setState({ modal: true });
  };

  isFormEmpty = ({ address, postalCode, townOrCity, confirmEmail }) => {
    return !address || !postalCode || !townOrCity || !confirmEmail;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 5000);
  };

  handleSubmitOrder = () => {};

  closeModal = () => this.setState({ modal: false });

  render() {
    const {
      toast,
      toastMessage,
      cartItems,
      modal,
      orderProcessing
    } = this.state;

    return (
      <Container>
        <Box
          color="darkWash"
          margin={4}
          padding={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Heading color="midnight">Checkout</Heading>

          {cartItems.length > 0 ? (
            <React.Fragment>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction="column"
                marginTop={2}
                marginBottom={6}
              >
                <Text color="darkGray" italic>
                  Items in the basket: {cartItems.length}
                </Text>

                <Box padding={2}>
                  {cartItems.map(item => (
                    <Box key={item.id} padding={1}>
                      <Text color="midnight">
                        {item.name} x {item.quantity} - £
                        {item.quantity * item.price}
                      </Text>
                    </Box>
                  ))}
                </Box>

                <Text bold>Total: {calculatePrice(cartItems)}</Text>
              </Box>

              <form
                style={{
                  display: "inlineBlock",
                  textAlign: "center",
                  maxWidth: 450
                }}
                onSubmit={this.handleConfirmOrder}
              >
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
            </React.Fragment>
          ) : (
            <Box color="darkWash" shape="rounded" padding={4}>
              <Heading align="center" color="watermelon" size="xs">
                No items in the basket
              </Heading>
              <Text align="center" color="green" italic>
                Add items to your basket
              </Text>
            </Box>
          )}
        </Box>
        {modal && (
          <ConfirmationModal
            orderProcessing={orderProcessing}
            cartItems={cartItems}
            closeModal={this.closeModal}
            handleSubmitOrder={this.handleSubmitOrder}
          />
        )}
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}

const ConfirmationModal = ({
  orderProcessing,
  cartItems,
  closeModal,
  handleSubmitOrder
}) => (
  <Modal
    accessibilityCloseLabel="close"
    accessibilityModalLabel="Confirm Your Order"
    heading="Confirm Your Order"
    onDismiss={closeModal}
    footer={
      <Box
        display="flex"
        marginRight={-1}
        marginLeft={-1}
        justifyContent="center"
      >
        <Box padding={1}>
          <Button
            size="lg"
            color="red"
            text="Submit"
            disabled={orderProcessing}
            onClick={handleSubmitOrder}
          />
        </Box>

        <Box padding={1}>
          <Button
            size="lg"
            text="Cancel"
            disabled={orderProcessing}
            onClick={closeModal}
          />
        </Box>
      </Box>
    }
    role="alertdialog"
    size="sm"
  >
    {!orderProcessing && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="column"
        padding={2}
        color="lightWash"
      >
        {cartItems.map(item => (
          <Box key={item.id} padding={1}>
            <Text size="lg" color="red">
              {item.name} x {item.quantity} - £{item.quantity * item.price}
            </Text>
          </Box>
        ))}
        <Box paddingY={2}>
          <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
        </Box>
      </Box>
    )}
    <Spinner
      show={orderProcessing}
      accessibilityLabel="Order Processing Indicator"
    />
    {orderProcessing && (
      <Text align="center" italic>
        Submitting order...
      </Text>
    )}
  </Modal>
);

export default Checkout;
