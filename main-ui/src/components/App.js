import React from 'react';
import './App.css';
import storageManager, {KEYS} from "../services/storage/local_storage";
import LoginScreen from "./pages/login/LoginScreen";
import RecordingScreen from "./pages/recording/RecordingScreen";
import {Container} from 'semantic-ui-react'
import {UI_ONLY} from "../variables/variables";


class App extends React.Component {
  constructor(props) {
    super(props);
    const isLoggedIn = !!storageManager.getFromStorage(KEYS.LOGIN_TOKEN);
    this.state = {loginSuccess: isLoggedIn};

    this.onLoginUpdate = this.onLoginUpdate.bind(this);
  }

  onLoginUpdate() {
    let loginSuccess = !!storageManager.getFromStorage(KEYS.LOGIN_TOKEN);
    this.setState(Object.assign({}, {loginSuccess}));
  }


  render() {
    const isLoggedIn = this.state.loginSuccess;
    return (
      <Container>
        {isLoggedIn || UI_ONLY ? <RecordingScreen/> : <LoginScreen onLoginUpdate={this.onLoginUpdate}/>}
      </Container>
    );
  }
}

export default App;
