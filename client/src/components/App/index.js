import React from "react";
import { Container, Box, Heading } from "gestalt";
import "./App.css";
import Strapi from "strapi-sdk-javascript";

const apiURL = process.env.API_URL || "http://localhost:1337";

const strapi = new Strapi(apiURL);

class App extends React.Component {
  async componentDidMount() {
    const response = await strapi.request("POST", "/graphql", {
      data: {
        query: `{
					brands {
						id
						name
						description
						createdAt
						image {
							url
							name
						}
					}
				}`
      }
    });
    console.log(response);
  }

  render() {
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
}

export default App;
