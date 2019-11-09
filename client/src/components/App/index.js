import React from "react";
import {
  Container,
  Box,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon
} from "gestalt";
import Strapi from "strapi-sdk-javascript";
import { Link } from "react-router-dom";

import LoadingIndicator from "../LoadingIndicator";
import "./App.css";

const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class App extends React.Component {
  state = {
    brands: [],
    searchTerm: "",
    loadingBrands: true
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
        brands: data.brands,
        loadingBrands: false
      });
    } catch (err) {
      console.error(err);
      this.setState({ loadingBrands: false });
    }
  }

  handleChange = ({ value }) => {
    this.setState({ searchTerm: value });
  };

  filteredBrands = ({ searchTerm, brands }) => {
    return brands.filter(brand => {
      return (
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  render() {
    const { searchTerm, loadingBrands } = this.state;

    return (
      <Container>
        <Box display="flex" justifyContent="center" marginTop={4}>
          <SearchField
            id="searchField"
            accessibilityLabel="Search Field"
            onChange={this.handleChange}
            placeholder="Search"
            value={searchTerm}
          />
          <Box margin={3}>
            <Icon
              icon="filter"
              color={searchTerm ? "orange" : "gray"}
              size={20}
              accessibilityLabel="Filter"
            />
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" marginBottom={2}>
          <Heading color="midnight" size="md">
            Brands
          </Heading>
        </Box>

        <Box wrap display="flex" justifyContent="around">
          {this.filteredBrands(this.state).map(brand => (
            <Box key={brand.id} width={200} margin={2} paddingY={4}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
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

        {<LoadingIndicator show={loadingBrands}/>}
      </Container>
    );
  }
}

export default App;
