import React from "react";
import styled from "styled-components";
import Spotify from "../components/music/Spotify"

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */

const Container = styled.div`
  height: 100px;
  background: url('https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/BottomPicture.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: solid white;
`;
//${props => props.height}px
//default height

const Container2 = styled.div`
    height: 100%;
    width: 40%;
    align-items: center;
    position: absolute;
    margin-left: 20%;
`;

const SpotifyLogo = styled.div`
    width: 40%;
    position: absolute;
    margin-top: 3em;
    left: 75%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 36pt;
  color: white;
  width: 100%;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  max-width: 50em;
`;
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = props => {
    return (
        <Container /**height={props.height}**/>
            <SpotifyLogo>
                <Spotify setSpotifyPlayer={props.setSpotifyPlayer}/>
            </SpotifyLogo>
            <Container2>
                <Title>Sopra Poker</Title>
            </Container2>
        </Container>
    );
};

/**
 * Don't forget to export your component!
 */
export default Header;
