import React from "react";
import styled from "styled-components";

const ActionLog = styled.div`
  font-weight: lighter;
  margin-top: 5px;
  border: none;
  color: ${props => props.color || null};
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const ChatMessageField = ({ ChatMessage}) => {
  return (
      ChatMessage.messageType == "CHAT" ? (<ActionLog color = "white">{ChatMessage.message}</ActionLog>) : (<ActionLog color = "red">{ChatMessage.message}</ActionLog>)
  );
};

export default ChatMessageField;
