import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { RedButton } from '../../views/design/RedButton';
import { BlackButton } from '../../views/design/BlackButton';


const WelcomeTitleBig = styled.h1`
  font: club;
  float: left;
  font-weight: bold;
  font-size: 48pt;
  color: red;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  max-width: 50em;
  margin: 0;
  position: absolute;
`;

const WelcomeTitleSmall = styled.h1`
  font-weight: bold;
  font-size: 24pt;
  color: black;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  max-width: 50em;
  margin: 0;
  position: absolute;
  margin-top: 90px;
  text-shadow: 2px 1px 2px black;
`;

const WelcomeTitlesContainer = styled.div`
  height: 30%;
  width: 100%;
  position: absolute;
`;

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  width: 45%;
  height: 90%;
  float: right;
  margin-left: 50%;
  position: absolute;
`;

const WelcomeLogoContainer = styled.div`
  margin-top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  width: 45%;
  height: 80%;
  float: left;
  position: absolute;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background-color: rgb(0, 0, 0, 0.8);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
  height: 50px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255);
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Register extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      username: null,
      password: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the localStorage.
   */
  async register() {
    try {
      const requestBody = JSON.stringify({
        username: this.state.username,
        password: this.state.password
      });
      const responseToken = await api.post('/users', requestBody);

      // Store the token into the local storage.
      localStorage.setItem('token', responseToken);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/gamescreen`);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  /**
   * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
   * Initialization that requires DOM nodes should go here.
   * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
   * You may call setState() immediately in componentDidMount().
   * It will trigger an extra rendering, but it will happen before the browser updates the screen.
   */
  componentDidMount() {}

  render() {
    return (
      <BaseContainer>
        <WelcomeLogoContainer>
          <WelcomeTitlesContainer>
            <WelcomeTitleBig>Sopra Poker</WelcomeTitleBig>
            <WelcomeTitleSmall>Join,Play and WIN!</WelcomeTitleSmall>
          </WelcomeTitlesContainer>
        </WelcomeLogoContainer>
        <FormContainer>
          <Form>
            <InputField
              placeholder="Username"
              onChange={e => {
                this.handleInputChange('username', e.target.value);
              }}
            />
            <InputField
              placeholder="Password"
              onChange={e => {
                this.handleInputChange('password', e.target.value);
              }}
            />
            <ButtonContainer>
              <RedButton
                disabled={!this.state.username || !this.state.password}
                width="100%"
                style={{color: "black"}}
                onClick={() => {
                  this.register();
                }}
              >
                Register
              </RedButton>
              <BlackButton
                width="80%"
                onClick={() => {
                  this.props.history.push(`/login`);
                }}
            >
              Get back to Login
            </BlackButton>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Register);
