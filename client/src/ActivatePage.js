import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import config from "./config";
import { Redirect } from "react-router-dom";

class Activate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.match.params.username,
      token: props.match.params.token
    };
    this.activate();
  }

  activate = () => {
    let self = this;
    axios.post(`${config.backEndServer}/user/activate`, {
      token: self.state.token,
      username: self.state.username
    })
    .then((res) => {
      if ((res.status == 200 || res.status == 204 )) {
        if(res.data.success) {
          localStorage.setItem('user', JSON.stringify({
              token: res.data.token
          }))
          self.setState({redirect: true});
        }
      }
    })
    .catch(e => {

    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/notes?welcome=true'/>;
    }
    return (
      <div>
        Activating
      </div>
    )
  }
}

export default Activate;
