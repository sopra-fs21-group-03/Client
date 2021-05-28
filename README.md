# Poker Game from Group 03, SoPra FS 21 Client


## Introduction 
The goal of this project was to create a Poker game with a lobby system, so that Users can register or login to our system, can chose a lobby where they want to play and, once 5 players are in a specific lobby and are ready, can play Poker. If the User does not have an account yet in our system, he must register to be considered as a valid User. Once he is registered, he can login again with his chosen username and password, if he was offline before. Our Poker game contains a Poker-Instructions page for User that do not know how to play Poker. When playing, a User can click on a button where the poker hands are shown. Therefore, a User can get guidance if he needs some. When playing and on turn, a User can raise, check, fold or call. A game session also contains a chat/log window, where Users can chat or see what events happened in the game. Once a game round is finished, the Server determines the winner(s) and organizes the next game round. A User can always, if he likes, leave a game session and chose in the lobby selection screen a different lobby where he wants to play. 


## Technologies 
Client (FrontEnd): 
-	React 
-	HTML 
-	JavaScript 
-	Spotify API 
-	[Luca cha do no Spotify zügs adde wo er brucht hed] 


## High-level Components 

- LoginScreen/RegistrationScreen:
This is where the user starts off when opening the application. The user can create a new profile, or log in in case he already has one. After that the user gets redirected to the lobbyScreen.

- LobbyScreen:
On the lobby screen the user can see 4 different games, with information like if the game is ongoing, or how many people are waiting in the lobby for the game to get started. He can join one, and then ready up. Once 5 people have joined a lobby and declared themselves ready, the game starts.

- GameScreen : 
This is where the users spend the majority of their time and where the game is played. Every user only has the information that they are allowed to have according to the rules of poker. Once a game is finished, the game screen transforms to either a “winner screen”, or a “looser screen”. Here the user can return to the LobbyScreen.

- InstructionScreen:
This is a simple feature we added. The instruction screen is accessible trough the LobbyScreen and contains simple instruction as to how the game Poker is played.
 
## Launch & Deployment: 

Read and go through those Tutorials, It will make your life easier!

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](http://localhost:3000) and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Once you have done all of this, in the template there are two main external dependencies that you should look at:

- [styled-components](https://www.styled-components.com/docs)
  It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) Declarative routing for React being a collection of navigational components that compose declaratively with your application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) Let's you access the state of the router and perform navigation from inside your components.



## Prerequisites and Installation

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into an 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Releases 

When you want to publish a release, create a tag on GitHub for the repository.


## Illustrations 
The User will start on the Login/Registration page. He can create a new account or login with an existing account. On the next screen he will see four lobbies and their details displayed. Now he has three options. He can logout and goes back to the login page, he can join a lobby by clicking on it or he can press the button “Poker Instructions”. On the Poker Instructions Page he is able to learn how a game of poker works. When a player joins a lobby he will be directed to the lobby screen. There his options are to press ready/unready or to leave the lobby and go back to the lobby selection screen. In the lobby a user can see the names of the other players and weather they are ready or not. If all players are ready they will all be directed to the game. If a user is not on turn he can use the chat and he also sees in the chat what the last actions of all the players were. If it is his turn he is able to check, fold, raise or call by pressing the respective buttons. During the showdown he is also able to decide if he wants to show his cards or not show his cards and fold. If a user folds he can’t raise, fold, check or call until the next round starts. He always has the option to leave the table and with this he will also leave the game. At the end of the whole poker game there will be a winner or looser screen where a player can only leave the game. When a player leaves a game he will get to the lobby selection screen and is able to select a new lobby or to logout. 

### Login/Registration:

![image](https://user-images.githubusercontent.com/71385679/120010905-fee48980-bfdd-11eb-92c4-6b791032128d.png)

 
 ### Lobby:
 
 ![image](https://user-images.githubusercontent.com/71385679/120011053-2a677400-bfde-11eb-8541-abdc49ba4cd1.png) ![image](https://user-images.githubusercontent.com/71385679/120011728-ea54c100-bfde-11eb-87dc-30668e34fdf5.png)

### Game:

![image](https://user-images.githubusercontent.com/71385679/120011910-1bcd8c80-bfdf-11eb-884a-6e9a1b25854a.png)



## Roadmap 
New developers could add: 
-	Functionality, such that a User can chose a picture from his Computer or the Internet, upload this picture to our Server and this picture will be set as his profile picture. 
-	A User overview and User search function: In a search dialog, a User can type in the username of another user to find him and communicate with him. Once the User found the User he was looking for, he can inspect the profile page of this User. A profile page might contain an overview of all the wins/losses a user has experienced. Also, the profile page could show the profile picture of a User. 
-	Chatting which is independent of a game session: Right now, chatting is bound to a game session. With this functionality, a user can have a chat window all the time (also in the lobby) and chat with a specific User or, if he created a chat group, can chat with multiple Users. 
 
## Authors and acknowledgment 

- Samuele Giunta / 
samuele.giunta@uzh.ch / 
19-742-667 / 
Github: Samy1101  

- Carlos Kirchdorfer / 
carlos.kirchdorfer@uzh.ch / 
19-720-002 /
Github: mr-carlitos

- Loris Keist / 
loris.keist@uzh.ch / 
19-752-898 / 
Github: sironitro  

- Luca Huber / 
luca.huber2@uzh.ch / 
19-753-615 / 
Github: cobankar 

- Jonas Graze / 
jonas.graze@uzh.ch / 
18-726-539 / 
(Leader) / 
Github: sanoj765 

## License 
MIT License

Copyright (c) [sopra-fs-21] [2021]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE




## External Links Images
First Background Picture: https://wallpaperaccess.com/full/1219582.png
Ingame Background Pictures: http://st.gde-fon.com/wallpapers_original/336962_korichnevyj_parket_fonovaya_1920x1080_www.Gde-Fon.com.jpg
Avatar-Pictures: https://i.pinimg.com/originals/77/ea/61/77ea618e1b9e4f43e95335af8dd0026b.jpg
Winner Picture: https://img.stickers.cloud/packs/9f1040cc-6481-4ae8-85b4-8b661b693958/webp/e5cd9b91-dbca-4653-8d9d-e4e4874831c0.webp
Looser Picture: https://i0.wp.com/firewireblog.com/wp-content/uploads/2013/10/tumblr_mqnn5ug9tv1snftoqo1_500.gif
Cards without hand: https://www.flaticon.com/svg/vstatic/svg/4330/4330439.svg?token=exp=1620903499~hmac=f1cd894f803e1054d0d19ab060831d6d
Cards with hand: https://www.flaticon.com/svg/vstatic/svg/4363/4363224.svg?token=exp=1620903485~hmac=0f94682c2e77c174419b61b61b747f48
Crown: https://www.flaticon.com/svg/vstatic/svg/1804/1804177.svg?token=exp=1620909398~hmac=f5cbed5bbf9be9043a1fb8ab4506078e
CardBackground: https://images.cdn2.stockunlimited.net/preview1300/playing-cards-background_1608080.jpg
Bottom Pixture: https://images4.alphacoders.com/184/thumb-1920-184506.jpg
White Volume Control Icon: https://www.iconsdb.com/white-icons/volume-control-8-icon.html
Card-Pictures: http://acbl.mybigcommerce.com/52-playing-cards/
Poker Hands: https://www.pokerharder.com/img/p/3/pokerhands_big.jpg

