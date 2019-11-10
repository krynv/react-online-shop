import React from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";

class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: ""
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.isFormEmpty(this.state)) {
      
    }
  };

  isFormEmpty = ({ username, email, password }) => {
    return !username || !email || !password;
  };

  render() {
    return (
      <Container>
        <Box margin={4} padding={4} display="flex" justifyContent="center">
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            <Box
              marginBottom={2}
              display="flex"
              direction="column"
              alignItems="center"
            >
              <Heading color="midnight">Sign Up</Heading>
              <Text italic color="orchid">
                Sign up to order beer
              </Text>
            </Box>

            <TextField
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleChange}
            />

            <Button inline color="blue" text="Submit" type="submit" />
          </form>
        </Box>
      </Container>
    );
  }
}

export default SignUp;
