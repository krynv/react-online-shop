import React from "react";
import { Container, Box, Heading } from "gestalt";
import "./App.css";

function App() {
  return (
    <Container>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Heading color="midnight" size="md">
          Brands
        </Heading>
      </Box>
    </Container>
  );
}

export default App;
