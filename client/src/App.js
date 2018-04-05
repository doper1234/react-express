import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { users: [], picture: undefined };

  componentDidMount() {
    fetch('/users')
    .then(picture => picture);
    /*.then(res => res.json())
    .then(users => this.setState({ users }));*/
  }

  render() {
    console.log(this.state.users);
    return (
      <div className="App">
        <img src={this.state.picture}/>
        <h1>Users</h1>

        /*<ul>
        {this.state.users.map(user =>
          <li key={user.id}> {user.username} </li>
        )}
        </ul>*/
      </div>
    );
  }
}

export default App;
