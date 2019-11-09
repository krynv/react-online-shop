import React from "react";
import Strapi from "strapi-sdk-javascript";
import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  Button,
  Mask,
  IconButton
} from "gestalt";
import { Link } from "react-router-dom";

import { calculatePrice, setCart, getCart } from "../../utils";

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

      this.setState({
        drinks: data.brand.drinks,
        brand: data.brand.name,
        cartItems: getCart()
      });
    } catch (err) {
      console.error(err);
    }
  }

  addToCart = drink => {
    let alreadyInCart = this.state.cartItems.findIndex(
      item => item.id === drink.id
    );

    if (alreadyInCart === -1) {
      let updatedItems = this.state.cartItems.concat({
        ...drink,
        quantity: 1
      });

      this.setState({ cartItems: updatedItems }, () => {
        setCart(updatedItems);
      });
    } else {
      let updatedItems = [...this.state.cartItems];
      updatedItems[alreadyInCart].quantity += 1;
      this.setState({ cartItems: updatedItems }, () => {
        setCart(updatedItems);
      });
    }
  };

  removeItemFromCart = givenItemToRemove => {
    let filteredItems = this.state.cartItems.filter(
      item => item.id !== givenItemToRemove
    );

    this.setState({ cartItems: filteredItems }, () => {
      setCart(filteredItems);
    });
  };

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
                        <Button
                          onClick={() => this.addToCart(drink)}
                          color="blue"
                          text="Add to cart"
                        />
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
              padding={2}
            >
              <Heading align="center" size="sm">
                Basket
              </Heading>
              <Text color="gray" italic>
                Items in the basket: {cartItems.length}
              </Text>

              {cartItems.map(item => (
                <Box key={item.id} display="flex" alignItems="center">
                  <Text>
                    {item.name} x {item.quantity} - £
                    {(item.quantity * item.price).toFixed(2)}
                  </Text>
                  <IconButton
                    accessibilityLabel="Delete Item"
                    icon="cancel"
                    size="sm"
                    iconColor="red"
                    onClick={() => this.removeItemFromCart(item.id)}
                  ></IconButton>
                </Box>
              ))}

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
                <Text size="lg">Total: {calculatePrice(cartItems)}</Text>
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
