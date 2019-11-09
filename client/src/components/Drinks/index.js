import React from "react";
import Strapi from "strapi-sdk-javascript";
import { Box, Heading, Text, Image, Card, Button, Mask } from "gestalt";
import { Link } from "react-router-dom";

const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class Drinks extends React.Component {
  state = {
    drinks: [],
    brand: "",
    cartItems: []
  };

  async componentDidMount() {
    try {
      const { data } = await strapi.request("POST", "/graphql", {
        data: {
          query: `
                  {
                      brand(id: "${this.props.match.params.brandId}") {
                          id
                          name
                          drinks {
                              id
                              name
                              description
                              image {
                                  name
                                  url
                              }
                              price
                          }
                      } 
                  }
              `
        }
      });

      this.setState({ drinks: data.brand.drinks, brand: data.brand.name });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { brand, drinks, cartItems } = this.state;

    return (
      <Box
        marginTop={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        dangerouslySetInlineStyle={{
          __style: {
            flexWrap: "wrap-reverse"
          }
        }}
      >
        <Box display="flex" direction="column" alignItems="center">
          <Box margin={2}>
            <Heading color="orchid">{brand}</Heading>
          </Box>

          <Box wrap display="flex" justifyContent="center" padding={4}>
            {drinks.map(drink => (
              <Box key={drink.id} width={210} margin={2} paddingY={4}>
                <Card
                  image={
                    <Box height={250} width={200}>
                      <Image
                        fit="cover"
                        alt={drink.name}
                        naturalHeight={1}
                        naturalWidth={1}
                        src={`${apiURL}${drink.image.url}`}
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
                    <Box marginBottom={2}>
                      <Text bold size="xl">
                        {drink.name}
                      </Text>
                    </Box>

                    <Text>{drink.description}</Text>
                    <Text color="orchid">£{drink.price}</Text>
                    <Box marginTop={2}>
                      <Text bold size="xl">
                        <Button color="blue" text="Add to cart" />
                      </Text>
                    </Box>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        <Box alignSelf="end" marginTop={2} marginLeft={8}>
          <Mask shape="rounded" wash>
            <Box
              display="flex"
              direction="column"
              alignItems="center"
              paddin={2}
            >
              <Heading align="center" size="md">
                Basket
              </Heading>
              <Text color="gray" italic>
                {cartItems.length} items selected
              </Text>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                direction="column"
              >
                <Box margin={2}>
                  {cartItems.length === 0 && (
                    <Text color="red">Your basket is empty</Text>
                  )}
                </Box>
                <Text size="lg">Total: £0.00</Text>
                <Text>
                  <Link to="/checkout">Checkout</Link>
                </Text>
              </Box>
            </Box>
          </Mask>
        </Box>
      </Box>
    );
  }
}

export default Drinks;
