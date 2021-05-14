import styled from 'styled-components';
import { RedButton } from '../../views/design/RedButton';
import {BlackButton} from "../../views/design/BlackButton";

export const ProfileCircle = styled.div`
  position: absolute;
  width: 150px; 
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  color: red;
  height: 150px; 
  border-radius: 75px;  
  text-align: center;
  vertical-align: middle;
  line-height: 40px; 
  transform: ${props => props.transform || null};   
  background: ${props => props.background || null} center;  
  border: solid;
  border-color: ${props => props.bordercolor || null};
  overflow: hidden;
`;

export const BigBlind = styled.div`
  position: absolute;
  width: 40px; 
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  color: red;
  background-color: black;
  height: 40px; 
  border-radius: 20px;  
  text-align: center;
  vertical-align: middle;
  line-height: 40px;  
  transform: ${props => props.transform || null};   
`;

export const SmallBlind = styled.div`
  position: absolute;
  width: 40px; 
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  color: black;
  background-color: red;
  height: 40px; 
  border-radius: 20px;  
  text-align: center;
  vertical-align: middle;
  line-height: 40px;   
  transform: ${props => props.transform || null};   
`;

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

export const LeaveTableButtonEndScreen = styled(BlackButton)`
  position: absolute;
  top: 80%;
  left: 30%;
  height: 10%;
  width: 20%;
  font-size: 24pt;
  font-weight: 200;
  background: ${props => props.background || null}; 
  color: ${props => props.color || null}; 
  border-color: ${props => props.bordercolor || null}; 
`;

export const DisplayUserInfo = styled.p`
  padding: 0;
  margin: 0;
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
`;

export const InnerTextChatContainer = styled.div`
  background: rgb(0,0,0,0.8);
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
  id: ${props => props.id || null}; 
`;

export const ChatInputField = styled.input`
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
  }
  width: 75%;
  height: 10%;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255);
  position: absolute;
  top: 87.5%;
  id: ${props => props.id || null}; 
  value: ${props => props.value || null}; 
`;

export const ChatSendButton = styled.button`
  &:hover {
    transform: scale(1.1);
  }
  position: absolute;
  top: 87.5%;
  left: 80%;
  width: 12%;
  height: 10%;
  border: none;
  border-radius: 10px;
  color: black;
  background-color: red;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  transition: all 0.3s ease;
  id: ${props => props.id || null}; 
  type: submit;
`

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
  background-image: url('http://st.gde-fon.com/wallpapers_original/336962_korichnevyj_parket_fonovaya_1920x1080_www.Gde-Fon.com.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const WinnerContainer = styled.div`
  background-color: black;
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
  max-height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const LooserContainer = styled.div`
  background-color: white;
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
  max-height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const WinnerPicture = styled.div`
  position: absolute;
  width: 512px; 
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  color: red;
  height: 512px; 
  -webkit-animation: halfSpin 4s linear infinite; 
  animation: halfSpin 4s linear infinite;
  background-image: url('https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/Winner_Picture.png');
`;

export const LooserPicture = styled.div`
  position: absolute;
  width: 450px; 
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  color: red;
  height: 450px; 
  background-image: url('https://i0.wp.com/firewireblog.com/wp-content/uploads/2013/10/tumblr_mqnn5ug9tv1snftoqo1_500.gif');
`;

export const WinnerSlogan = styled.div`
  color: ${props => props.left || null}; 
  font-size: 64pt;
  position: absolute;
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  transform: translate(-50%, -50%);
  width: ${props => props.width || null}; 
  height: ${props => props.height || null}; 
  text-shadow: 3px 3px 0 red;
`;

export const LoadingGameContainer = styled.div`
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
  text-align: center;
  vertical-align: middle;
  line-height: 800px; 
  font-size: 32pt;
  color: white;
`;

export const Loader = styled.div`
  border: 10px solid #f3f3f3;
  border-radius: 50%;
  border-top: 10px solid #dd1630;
  border-bottom: 10px solid #dd1630;
  width: 80px;
  height: 80px;
  -webkit-animation: spin 2s linear infinite; 
  animation: spin 2s linear infinite;
  left: ${props => props.left || null}; 
  top: ${props => props.top || null}; 
  position: absolute;
  color: white;
  background-color:#dd1630;
  text-align: center;
  vertical-align: middle;
  line-height: 60px; 
  font-size: 20pt
  `

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
background-color: transparent;
  margin: 0;
  position: absolute;
  top: 95%;
  left: 50%;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 10%;
  margin-left: auto;
  margin-right: auto;
  border-top: solid ${props => props.bordercolor || null}; 
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
  background: url('https://raw.githubusercontent.com/sopra-fs21-group-03/Client/master/src/cardBackground.png');
  background-size: cover;
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
  border-radius: 5px;
  transform: ${props => props.transform || null}; 
`;

export const PlayerInfoContainer = styled.div`
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  top: ${props => props.top || null};
  left: ${props => props.left || null};
  padding: ${props => props.padding || null};
  margin: 0;
  position: absolute;
  margin-right: 0%;
  transform: translate(-50%, -50%);
  margin-left: auto;
  margin-right: auto;
  font-size: 18pt;
  font-size: ${props => props.fontsize || null};
  color: ${props => props.color || null};
  background: ${props => props.background || null};
  border-radius: ${props => props.borderradius || null};
  overflow: auto;
  word-wrap:break-word;
  border: ${props => props.border || null};
`;

export const FrontCardBox = styled.div`
  width: 100%;
  height: 100%;  
`;