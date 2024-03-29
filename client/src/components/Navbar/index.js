import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { NavLink, withRouter } from "react-router-dom";

import { getToken, clearToken, clearCart } from "../../utils";

class Navbar extends React.Component {
  handleSignout = () => {
    clearToken();
    clearCart();
    this.props.history.push("/"); // only accessible here with a higher order function withRouter
  };

  render() {
    return getToken() !== null ? (
      <AuthNavbar handleSignout={this.handleSignout} />
    ) : (
      <UnAuthNavbar />
    );
  }
}

const AuthNavbar = ({ handleSignout }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    <NavLink activeClassName="active" to="/checkout">
      <Text size="xl" color="white">
        Checkout
      </Text>
    </NavLink>

    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box magrin={2} height={50} width={50}>
          <Image
            src="./logo.svg"
            alt="React Brewery Logo"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>

        <Heading size="xs" color="orange">
          React Brewery
        </Heading>
      </Box>
    </NavLink>

    <Button
      onClick={handleSignout}
      color="transparent"
      text="Sign Out"
      inline
      size="md"
    />
  </Box>
);

const UnAuthNavbar = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
    shape="roundedBottom"
  >
    <NavLink activeClassName="active" to="/signin">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>

    <NavLink activeClassName="active" exact to="/">
      <Box display="flex" alignItems="center">
        <Box magrin={2} height={50} width={50}>
          <Image
            src="./logo.svg"
            alt="React Brewery Logo"
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>

        <Heading size="xs" color="orange">
          React Brewery
        </Heading>
      </Box>
    </NavLink>

    <NavLink activeClassName="active" to="/signup">
      <Text size="xl" color="white">
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default withRouter(Navbar);
