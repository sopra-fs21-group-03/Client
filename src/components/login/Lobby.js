import React from 'react';
import {withRouter} from "react-router-dom";
import {BaseContainer} from "../../helpers/layout";
import styled from "styled-components";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
  width: 45%;
  height: 100%;
  margin-left: 25%;
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
  background-color: rgb(0, 0, 0, 0.92);
  transition: opacity 0.5s ease, transform 0.5s ease;
`;


class Lobby extends React.Component{

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>

                    </Form>
                </FormContainer>
            </BaseContainer>)}
}
export default withRouter(Lobby);