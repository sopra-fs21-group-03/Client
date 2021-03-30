import styled from "styled-components";

export const BlackButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: red;
  width: ${props => props.width || null};
  height: 50px;
  border-radius: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: black;
  transition: all 0.3s ease;
  border: solid;
  border-color: red;
  margin-left: 10%;
`;
