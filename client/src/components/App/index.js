import React from "react";
import { Container, Box, Heading, Card, Image, Text } from "gestalt";
import Strapi from "strapi-sdk-javascript";
import { Link } from "react-router-dom";

import "./App.css";

const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class App extends React.Component {
  state = {
    brands: []
  };

  async componentDidMount() {
    try {
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `
		  	{
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

      this.setState({
        brands: data.brands
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { brands } = this.state;

    return (
      <Container>
        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Brands
          </Heading>
        </Box>

        <Box display="flex" justifyContent="around">
          {brands.map(brand => (
            <Box key={brand.id} width={200} margin={2}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      alt={brand.name}
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiURL}${brand.image.url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand.id}`}>See their beers</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }
}

export default App;
