import React from "react";
import Box from "@material-ui/core/Box";
import { List, Button } from "@material-ui/core";
const axios = require("axios").default;
let baseURL = "https://countries-api-first.herokuapp.com/countries/";
class Profile extends React.Component {
  componentDidMount() {
    console.log("componentDidMount");
    const name = this.props.match.params.name;
    const profileURL = `${baseURL}${name}`;
    console.log(profileURL);

    axios
      .get(profileURL)
      .then((res) => {
        let newProfile = res.data.map((profile) => ({
          name: `${profile.name}`,
          capital: `${profile.capital}`,
          population: `${profile.population}`,
          currencies: [
            `${profile.currencies[0].name}`,
            `${profile.currencies[0].code}`,
            `${profile.currencies[0].symbol}`,
          ],
          languages: [`${profile.languages[0].name}`],
        }));
        this.props.setProfile(newProfile);
        console.log(newProfile);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteData = () => {
    const name = this.props.match.params.name;
    const profileURL = `${baseURL}${name}`;
    // const data = this.props.profiles;
    axios
      .delete(profileURL)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    console.log(this.props);
    let dashboard = this.props.profiles.map((profile, i) => {
      return (
        <Box
          key={i}
          color="primary.main"
          bgcolor="warning.main"
          border={1}
          borderColor="primary.main"
          borderRadius={16}
          maxWidth="sm"
        >
          <List>
            <h1>Name: {profile.name}</h1>
            <p>
              <span>Capital: </span>
              {profile.capital}
            </p>
            <p>
              <span>Population: </span>
              {profile.population}
            </p>
            <span>Currencies: </span> <br />
            <ul>
              <li> Name: {profile.currencies[0]}</li>
              <li> Code: {profile.currencies[1]} </li>
              <li> Symbol: {profile.currencies[2]}</li>
            </ul>
            <span>Languages: </span>
            <ul>
              <li>{profile.languages}</li>
            </ul>
          </List>
          <Button type="submit" variant="contained" onClick={this.deleteData}>
            DELETE Country Profile
          </Button>
        </Box>
      );
    });
    return <div>{dashboard}</div>;
  }
}

export default Profile;
