import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import Player from '../../views/Player';
import { Spinner } from '../../views/design/Spinner';
import { RedButton } from '../../views/design/RedButton';
import { withRouter } from 'react-router-dom';
import User from '../../components/shared/models/User';
import Card from "../../components/shared/models/Card";
import Deck from "../../components/shared/models/Deck";
import {BlackButton} from "../../views/design/BlackButton";
import Game from "../../components/shared/models/Game";

export const Writen = styled.p`
    margin-top: 0;
    margin-bottom: 2px;
    padding-top: 0;
    padding-bottom: 0;
`;

export const LeaveTableButton = styled(BlackButton)`
  position: absolute;
  top: 60%;
  left: 25%;
  background: rgb(0,0,0,0.8);
  height: 25%;
  width: 60%;
  font-size: 24pt;
  font-weight: 200;
`;

export const CheckButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 8%;
  color: white;
  display: ${props => props.display || null}; 
  id: ${props => props.id || null}; 
`;

export const CallButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 25%;
  color: white;
  display: ${props => props.display || null}; 
  id: ${props => props.id || null}; 
`;

export const RaiseButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 50%;
  left: 10%;
  top: 25%;
  color: white;
  border-radius: 10px 0 0 10px;
  display: ${props => props.display || null}; 
  id: ${props => props.id || null}; 
`;

export const RaiseInput = styled.input`
  transition: all 2s ease;
  position: absolute;
  width: 30%;
  left: 60%;
  top: 25%;
  color: red;
  height: 50px;
  border-radius: 0 10px 10px 0;
  border: solid red;
  type: number;
  padding-left: 15px;
  display: ${props => props.display || null}; 
  id: ${props => props.id || null}; 
`;

export const FoldButton = styled(RedButton)`
  &:hover {
    transform: translateY(0px);
    background: white;
    border: solid 3px;
    border-color: red;
    color: red;
  }
  transition: all 2s ease;
  position: absolute;
  width: 80%;
  left: 10%;
  top: 8%;
  color: white;
  display: ${props => props.display || null}; 
  id: ${props => props.id || null}; 
`;

export const InnerTextChatContainer = styled.div`
  background: rgb(0,0,0,0.7);
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 100%;
  margin-left: auto;
  padding: 15px;
  margin-right: auto;
  border-radius: 10px;
`;

export const TextBacklogChatContainer = styled.div`
  margin: 0;
  margin-top:5px;
  position: absolute;
  left: 50%;
  top: 42.5%;
  transform: translate(-50%, -50%);
  width: 98%;
  height: 85%;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  overflow: auto;
  color: white;
  word-wrap:break-word;
`;

export const ChatInputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
  width: 90%;
  height: 10%;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255);
  position: absolute;
  top: 87.5%;
`;

export const Tablesquare = styled.div`
background-color: green;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 65%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-top: solid;
  border-bottom: solid;
  border-color: brown;
  border-width: 15px;
`;

export const TableCircleLeft = styled.span`
background-color: green;
  margin: 0;
  position: absolute;
  left: 20%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  height: 65%;
  width: 20%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-top: solid;
  border-bottom: solid;
  border-left: solid;
  border-color: brown;
  border-width: 15px;
  border-radius: 50%;
`;

export const TableCircleRight = styled.span`
background-color: green;
  margin: 0;
  position: absolute;
  left: 80%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  height: 65%;
  width: 20%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  border-right: solid;
  border-top: solid;
  border-bottom: solid;
  border-color: brown;
  border-width: 15px;
  border-radius: 50%;
`;

export const GameContainer = styled.div`
  background-color: rgb(169,170,172);
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  max-width: 100%;
`;

export const UpperContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 50%;
  top: 10%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 25%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const MiddleContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 50%;
  top: 40%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 40%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const LowerContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 75%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 30%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const BottomContainer = styled.div`
background-color: black;
  margin: 0;
  position: absolute;
  top: 95%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 10%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const ChatContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 12.5%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const LeaveTableContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 87.5%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const CheckContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 31.25%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 12.5%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const FoldContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 68.75%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 12.5%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const OwnCardsContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const PlayerLeftContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 10%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const PlayerRightContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 90%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const PlayerCardsContainer = styled.div`
  margin: 0;
  position: absolute;
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const TableComponentsContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const TotalPotContainer = styled.div`
  background: rgb(0,0,0,0.7);
  border-radius: 15px;
  margin: 0;
  position: absolute;
  left: 45%;
  top: 15%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 12%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  text-align: center;
  font-size: 24pt;
  color: red;
`;

export const MiddleCardsContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 50%;
  top: 45%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 50%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const CallContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 25%;
  top: 85%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const RaiseContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 75%;
  top: 85%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 30%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const TopLeftPlayerContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 25%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const TopRightPlayerContainer = styled.div`
  margin: 0;
  position: absolute;
  left: 75%;
  top: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
`;

export const CardBox = styled.div`
  border: solid;
  border-color: white;
  background-color: red;
  margin: 0;
  position: absolute;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  margin-left: auto;
  padding-left: auto;
  margin-right: auto;
  padding-right: auto;
  transform: ${props => props.transform || null};
  display: ${props => props.display || null}; 
  id: ${props => props.id || null}; 
`;

export const PlayerInfoContainer = styled.div`
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  margin: 0;
  position: absolute;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  margin-left: auto;
  margin-right: auto;
  padding-left: 5px;
  font-size: 18pt;
  color: ${props => props.color || null};
  padding-top: 10px;
  overflow: auto;
  word-wrap:break-word;
  id: ${props => props.id || null};
`;

export const FrontCardBox = styled.div`
  width: 100%;
  height: 100%;
  display: ${props => props.display || null};  
`;