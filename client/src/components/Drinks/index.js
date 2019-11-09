import React from "react";
import Strapi from "strapi-sdk-javascript";

const apiURL = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiURL);

class Drinks extends React.Component {
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

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return <div>Drinks</div>;
  }
}

export default Drinks;
