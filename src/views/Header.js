import React from "react";
import styled from "styled-components";
import { ReactLogo } from "./ReactLogo";

/**
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/
 */

const Container = styled.div`
  height: 100px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//${props => props.height}px
//default height

const Container2 = styled.div`
    height: 100%;
    width: 40%;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 36pt;
  color: red;
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
