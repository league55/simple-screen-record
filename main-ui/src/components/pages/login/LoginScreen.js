import React from 'react';

import {login} from "../../../services/api/login_api";
import storageManager, {KEYS} from "../../../services/storage/local_storage";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginValue: undefined
    }

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleLoginChange(e) {
    this.setState(Object.assign({}, {loginValue: e.target.value}));
  }

  submit(e) {
    e.preventDefault();
    login(this.state.loginValue)
      .then(value => storageManager.addToStorage(KEYS.LOGIN_TOKEN, value))
      .then(this.props.onLoginUpdate);
  }

  render() {
    return (
      <div>
        Welcome, please log in to continue:
        <div>
          <input type="text" onChange={this.handleLoginChange}/>
          <button onClick={this.submit} disabled={!this.state.loginValue}>Submit</button>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
