import React from 'react';
import Emoji from 'a11y-react-emoji';
import { Direction, gameLogic } from "./Constant";
import { Config } from './../Config';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse } from '../actions/roomActions'
const socket = socketIOClient(Config.ENDPOINT);

class Gameviewtest extends React.Component {
  cards = [
    {
      key: "A",
      title: "A ♣",
      color: "black",
      image: "flower_1.png",
      cardValue: 1,
      pointValue: 1,
      shape: "club",
    },
    {
      key: "2",
      title: "2 ♣",
      color: "black",
      image: "flower_2.png",
      cardValue: 2,
      pointValue: 2,
      shape: "club",
    },
    {
      key: "3",
      title: "3 ♣",
      color: "black",
      image: "flower_3.png",
      cardValue: 3,
      pointValue: 3,
      shape: "club",
    },
    {
      key: "4",
      title: "4 ♣",
      color: "black",
      image: "flower_4.png",
      cardValue: 4,
      pointValue: 4,
      shape: "club",
    },
    {
      key: "5",
      title: "5 ♣",
      color: "black",
      image: "flower_5.png",
      cardValue: 5,
      pointValue: 5,
      shape: "club",
    },
    {
      key: "6",
      title: "6 ♣",
      color: "black",
      image: "flower_6.png",
      cardValue: 6,
      pointValue: 6,
      shape: "club",
    },
    {
      key: "7",
      title: "7 ♣",
      color: "black",
      image: "flower_7.png",
      cardValue: 7,
      pointValue: 7,
      shape: "club",
    },
    {
      key: "8",
      title: "8 ♣",
      color: "black",
      image: "flower_8.png",
      cardValue: 8,
      pointValue: 20,
      shape: "club",
    },
    {
      key: "9",
      title: "9 ♣",
      color: "black",
      image: "flower_9.png",
      cardValue: 9,
      pointValue: 9,
      shape: "club",
    },
    {
      key: "10",
      title: "10 ♣",
      color: "black",
      image: "flower_10.png",
      cardValue: 10,
      pointValue: 10,
      shape: "club",
    },
    {
      key: "J",
      title: "J ♣",
      color: "black",
      image: "flower_11.png",
      cardValue: 11,
      pointValue: 11,
      shape: "club",
    },
    {
      key: "Q",
      title: "Q ♣",
      color: "black",
      image: "flower_12.png",
      cardValue: 12,
      pointValue: 12,
      shape: "club",
    },
    {
      key: "K",
      title: "K ♣",
      color: "black",
      image: "flower_13.png",
      cardValue: 13,
      pointValue: 13,
      shape: "club",
    },
    {
      key: "A",
      title: "A ♦",
      color: "red",
      image: "diamond_1.png",
      cardValue: 1,
      pointValue: 1,
      shape: "diamond",
    },
    {
      key: "2",
      title: "2 ♦",
      color: "red",
      image: "diamond_2.png",
      cardValue: 2,
      pointValue: 2,
      shape: "diamond",
    },
    {
      key: "3",
      title: "3 ♦",
      color: "red",
      image: "diamond_3.png",
      cardValue: 3,
      pointValue: 3,
      shape: "diamond",
    },
    {
      key: "4",
      title: "4 ♦",
      color: "red",
      image: "diamond_4.png",
      cardValue: 4,
      pointValue: 4,
      shape: "diamond",
    },
    {
      key: "5",
      title: "5 ♦",
      color: "red",
      image: "diamond_5.png",
      cardValue: 5,
      pointValue: 5,
      shape: "diamond",
    },
    {
      key: "6",
      title: "6 ♦",
      color: "red",
      image: "diamond_6.png",
      cardValue: 6,
      pointValue: 6,
      shape: "diamond",
    },
    {
      key: "7",
      title: "7 ♦",
      color: "red",
      image: "diamond_7.png",
      cardValue: 7,
      pointValue: 7,
      shape: "diamond",
    },
    {
      key: "8",
      title: "8 ♦",
      color: "red",
      image: "diamond_8.png",
      cardValue: 8,
      pointValue: 20,
      shape: "diamond",
    },
    {
      key: "9",
      title: "9 ♦",
      color: "red",
      image: "diamond_9.png",
      cardValue: 9,
      pointValue: 9,
      shape: "diamond",
    },
    {
      key: "10",
      title: "10 ♦",
      color: "red",
      image: "diamond_10.png",
      cardValue: 10,
      pointValue: 10,
      shape: "diamond",
    },
    {
      key: "J",
      title: "J ♦",
      color: "red",
      image: "diamond_11.png",
      cardValue: 11,
      pointValue: 11,
      shape: "diamond",
    },
    {
      key: "Q",
      title: "Q ♦",
      color: "red",
      image: "diamond_12.png",
      cardValue: 12,
      pointValue: 12,
      shape: "diamond",
    },
    {
      key: "K",
      title: "K ♦",
      color: "red",
      image: "diamond_13.png",
      cardValue: 13,
      pointValue: 13,
      shape: "diamond",
    },
    {
      key: "A",
      title: "A ♥",
      color: "red",
      image: "heart_1.png",
      cardValue: 1,
      pointValue: 1,
      shape: "heart",
    },
    {
      key: "2",
      title: "2 ♥",
      color: "red",
      image: "heart_2.png",
      cardValue: 2,
      pointValue: 2,
      shape: "heart",
    },
    {
      key: "3",
      title: "3 ♥",
      color: "red",
      image: "heart_3.png",
      cardValue: 3,
      pointValue: 3,
      shape: "heart",
    },
    {
      key: "4",
      title: "4 ♥",
      color: "red",
      image: "heart_4.png",
      cardValue: 4,
      pointValue: 4,
      shape: "heart",
    },
    {
      key: "5",
      title: "5 ♥",
      color: "red",
      image: "heart_5.png",
      cardValue: 5,
      pointValue: 5,
      shape: "heart",
    },
    {
      key: "6",
      title: "6 ♥",
      color: "red",
      image: "heart_6.png",
      cardValue: 6,
      pointValue: 6,
      shape: "heart",
    },
    {
      key: "7",
      title: "7 ♥",
      color: "red",
      image: "heart_7.png",
      cardValue: 7,
      pointValue: 7,
      shape: "heart",
    },
    {
      key: "8",
      title: "8 ♥",
      color: "red",
      image: "heart_8.png",
      cardValue: 8,
      pointValue: 20,
      shape: "heart",
    },
    {
      key: "9",
      title: "9 ♥",
      color: "red",
      image: "heart_9.png",
      cardValue: 9,
      pointValue: 9,
      shape: "heart",
    },
    {
      key: "10",
      title: "10 ♥",
      color: "red",
      image: "heart_10.png",
      cardValue: 10,
      pointValue: 10,
      shape: "heart",
    },
    {
      key: "J",
      title: "J ♥",
      color: "red",
      image: "heart_11.png",
      cardValue: 11,
      pointValue: 11,
      shape: "heart",
    },
    {
      key: "Q",
      title: "Q ♥",
      color: "red",
      image: "heart_12.png",
      cardValue: 12,
      pointValue: 12,
      shape: "heart",
    },
    {
      key: "K",
      title: "K ♥",
      color: "red",
      image: "heart_13.png",
      cardValue: 13,
      pointValue: 13,
      shape: "heart",
    },
    {
      key: "A",
      title: "A ♠",
      color: "black",
      image: "black_1.png",
      cardValue: 1,
      pointValue: 1,
      shape: "spade",
    },
    {
      key: "2",
      title: "2 ♠",
      color: "black",
      image: "black_2.png",
      cardValue: 2,
      pointValue: 2,
      shape: "spade",
    },
    {
      key: "3",
      title: "3 ♠",
      color: "black",
      image: "black_3.png",
      cardValue: 3,
      pointValue: 3,
      shape: "spade",
    },
    {
      key: "4",
      title: "4 ♠",
      color: "black",
      image: "black_4.png",
      cardValue: 4,
      pointValue: 4,
      shape: "spade",
    },
    {
      key: "5",
      title: "5 ♠",
      color: "black",
      image: "black_5.png",
      cardValue: 5,
      pointValue: 5,
      shape: "spade",
    },
    {
      key: "6",
      title: "6 ♠",
      color: "black",
      image: "black_6.png",
      cardValue: 6,
      pointValue: 6,
      shape: "spade",
    },
    {
      key: "7",
      title: "7 ♠",
      color: "black",
      image: "black_7.png",
      cardValue: 7,
      pointValue: 7,
      shape: "spade",
    },
    {
      key: "8",
      title: "8 ♠",
      color: "black",
      image: "black_8.png",
      cardValue: 8,
      pointValue: 20,
      shape: "spade",
    },
    {
      key: "9",
      title: "9 ♠",
      color: "black",
      image: "black_9.png",
      cardValue: 9,
      pointValue: 9,
      shape: "spade",
    },
    {
      key: "10",
      title: "10 ♠",
      color: "black",
      image: "black_10.png",
      cardValue: 10,
      pointValue: 10,
      shape: "spade",
    },
    {
      key: "J",
      title: "J ♠",
      color: "black",
      image: "black_11.png",
      cardValue: 11,
      pointValue: 11,
      shape: "spade",
    },
    {
      key: "Q",
      title: "Q ♠",
      color: "black",
      image: "black_12.png",
      cardValue: 12,
      pointValue: 12,
      shape: "spade",
    },
    {
      key: "K",
      title: "K ♠",
      color: "black",
      image: "black_13.png",
      cardValue: 13,
      pointValue: 13,
      shape: "spade",
    },
  ];

  activeUsertimerId

  state = {
    timer: 0,
    showTime: '00:00',
    defaultUsers: 0,
    positions: [],
    cardPack: [],
    usersList: [],
    loginUserIndex: 0,
    perUserCard: 5,
    gameDirection: Direction.clockwise,
    roomUsers: [],
    roomDetails: {},
    logInUserId: 0,
    cardPackOpen: [],
    currentActiveUserInGame: {},
    activeUserTime: '00:20',
    activeUserTimerDefault: (20 * 1000),
    currentActiveUserInGamePositionIndex: null,
    isNotMache: false,
    drawCard: 1,
    isKey2: false,
    activeUserDrawCardCount: 0,
    clickOnCard: false,
    lastCardUserName: ''
  }

  async componentDidMount() {
    let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
    let user_ID = !!this.props.location.state ? this.props.location.state.user_id : 0;
    this.setState({ logInUserId: user_ID, defaultUsers: this.props.match.params.users ? this.props.match.params.users : 6, cardPack: this.cards });
    await this.getUserPositions(this.props.match.params.users ? this.props.match.params.users : 6);
    const screen = 'game';
    if (user_ID && room_unique_id) {
      socket.emit('GETROOMMEMBERWEBVIEW_SEND', room_unique_id, user_ID, screen);
      await new Promise(resolve => {
        socket.on('GETROOMMEMBERWEBVIEW_RESPONSE', async (data) => {
          if (data.status) {
            this.setState({ roomUsers: data.data });
            await this.setUsers(this.state.defaultUsers);
            await this.getCurrentUserIndex(this.state.usersList)
            this.setUsersPositions(this.state.usersList, this.state.positions, this.state.loginUserIndex);
          }
          resolve(data);
        });
      });
      socket.emit('GETROOMDETAILS_SEND', room_unique_id);
      await new Promise(resolve => {
        socket.on('GETROOMDETAILS_RESPONSE', async (res) => {
          if (res.status) {
            this.setState({ roomDetails: res.data, currentActiveUserInGame: res.user });
            if (res.data._user_id === user_ID) {
              await this.suffleCards(this.state.cardPack);
              setTimeout(() => {
                this.setCurrentActiveUserInGame(res.user, room_unique_id)
              }, this.props.match.params.users * 150);
            }
          }
          resolve(res);
        });
      });
    } else {
      console.log("not valid user")
    }

    this.setTimer();

    if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
      setTimeout(() => {
        socket.emit('CARDPACK_FOR_ALL_USERS_SEND', this.state.cardPack, room_unique_id);
      }, this.props.match.params.users * 600);
    }

    socket.on('LEAVEROOMMEMBERWEBVIEW_RESPONSE', async (data) => {
      if (data.status) {
        this.setState({ roomUsers: data.data, usersList: data.data });
      }
    });

    socket.on('CURRENT_ACTIVE_USER_IN_GAME_RESPONSE', async (res) => {
      await this.setState({ currentActiveUserInGame: res.currentActiveUserInGame });
      const { usersList, cardPackOpen, logInUserId, isKey2 } = this.state
      let loginUserIndex = this.state.loginUserIndex
      let userList = usersList;
      for (let index = 0; index < userList.length; index++) {
        if (userList[loginUserIndex].user_id === res.currentActiveUserInGame.user_id) {
          this.setState({ currentActiveUserInGamePositionIndex: index });
        }
        loginUserIndex++;
        if (loginUserIndex >= userList.length) {
          loginUserIndex = 0;
        }
      }
      // auto draw when card 2 not available
      let key2CardCount = 0;
      let currentActiveUserInGameIndex = userList.findIndex(x => x.user_id === res.currentActiveUserInGame.user_id);
      let openCardOndesk = cardPackOpen[cardPackOpen.length - 1];
      let cardPackLength = (cardPackOpen.length - 1);
      let isavailableCard = !!userList[currentActiveUserInGameIndex] && userList[currentActiveUserInGameIndex].cards !== undefined && !!userList[currentActiveUserInGameIndex].cards ? userList[currentActiveUserInGameIndex].cards.some(x => x.key === '2') : true;
      if (!!cardPackOpen && !!openCardOndesk && openCardOndesk.key === "2" && !isavailableCard && !isKey2) {
        for (let i = 0; i < 4; i++) {
          if (!!cardPackOpen[cardPackLength].key && cardPackOpen[cardPackLength].key === "2") {
            key2CardCount += 1;
          }
          cardPackLength--;
          if (cardPackLength < 0) {
            cardPackLength = 0;
            break;
          }
        }

        this.setState({ isKey2: true })
        let drawCardCount = 1;
        if (isKey2 && key2CardCount >= 1) {
          for (let i = 0; i < key2CardCount; i++) {
            drawCardCount = drawCardCount * 2;
          }
          if (logInUserId === res.currentActiveUserInGame.user_id) {
            socket.emit('DARW_CARDS_WHEN_CARD_2_NOT_AVAILABLE_SEND', drawCardCount, room_unique_id);
          } else {
            if (res.currentActiveUserInGame.isAvailable === false) {
              socket.emit('DARW_COMPUTER_CARDS_WHEN_CARD_2_NOT_AVAILABLE_SEND', drawCardCount, room_unique_id)
            }
          }
        }
      } else {
        if (res.currentActiveUserInGame.isAvailable === false) {
          this.computerPlay(res.roomUniqueId);
        }
      }
    });

    socket.on('CARDPACK_FOR_ALL_USERS_RESPONSE', async (res) => {
      await this.setCardOnDesk(res);
      this.cardDistributionAnimation(this.state.usersList, this.state.cardPack, this.state.perUserCard);
      if (this.state.roomDetails._user_id === user_ID) {
        await this.cardDistribution(this.state.usersList, this.state.cardPack, this.state.perUserCard, room_unique_id);
      }
    });

    socket.on('CARD_DISTRIBUTION_RESPONSE', res => {
      this.setState({ cardPack: res.cardArrayList, usersList: res.usersListValues })
      this.setAssignedCardPosition(res.usersListValues);
      if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
        this.startGameFirstcardOpen(this.state.cardPack, room_unique_id)
      }
    });

    socket.on('FIRST_CARD_OPEN_RESPONSE', res => {
      let cardPack = res.cardPack
      cardPack.splice((cardPack.length - 1), 1);
      this.setState({ cardPack: cardPack, cardPackOpen: res.cardPackOpen });
      this.openCardOndeskSetOndesk()
      if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
        socket.emit('START_ACTIVE_USER_TIMER_SEND', room_unique_id)
      }
    });

    socket.on('GAME_START_DIRECTION_RESPONSE', res => {
      this.setState({ gameDirection: res.gemeStartDirection });
    });

    socket.on('SKIP_COMPUTER_TURN_RESPONSE', res => {
      if (res.status) {
        this.setState({ usersList: res.usersList, cardPack: res.cardPack, isNotMache: false });
        if (res.cardPack.length === 0) {
          this.addCardsInCardPackFromOpenCard();
        }
        this.setAssignedCardPosition(res.usersList);
      }
    });

    socket.on('SKIP_USER_TURN_RESPONSE', res => {
      var resetInterval;
      if (res.status) {
        this.setState({ usersList: res.usersList, cardPack: res.cardPack, isNotMache: false });
        if (res.cardPack.length === 0) {
          this.addCardsInCardPackFromOpenCard();
        }
        this.setAssignedCardPosition(res.usersList);
        resetInterval = setTimeout(() => {
          this.setNewActiveUser();
          clearInterval(resetInterval)
        }, 500);
      }
    })

    socket.on('START_ACTIVE_USER_TIMER_RESPONSE', res => {
      if (res.status) {
        clearInterval(this.activeUsertimerId);
        this.setActiveUserTimer(res.roomUniqueId);
      }
    })

    socket.on('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_RESPONSE', res => {
      const { cardPackOpen, currentActiveUserInGame, defaultUsers } = this.state;
      if (currentActiveUserInGame.isAvailable === false) {
        let cardPackOpenData = cardPackOpen;
        let macheCard = res.card;
        let currentActiveUserInGameIndex = res.usersList.findIndex(x => x.user_id === currentActiveUserInGame.user_id);
        //let userPositionIndex = currentActiveUserInGamePositionIndex;
        let macheCardIndex = res.usersList[currentActiveUserInGameIndex].cards.findIndex(x => x.title === macheCard.title);
        let userClickcardId = "user_" + currentActiveUserInGameIndex + "_card_" + macheCardIndex + "_" + defaultUsers;

        /*
        if (macheCardIndex > 10) {
          macheCardIndex = 10;
        } */

        //let userClickAnimation = "user_" + userPositionIndex + "_card_" + macheCardIndex + "_" + defaultUsers;
        //document.getElementById(userClickcardId).setAttribute("style", "animation-name: send_card_" + userClickAnimation + ";animation-duration: 1s;animation-timing-function: ease;animation-fill-mode: both;animation-delay:0.5s;");
        if (document.getElementById(userClickcardId) != null) {
          if (this.state.logInUserId === currentActiveUserInGame.user_id) {
            document.getElementById(userClickcardId).classList.add("opened");
          }
          if (document.getElementById(userClickcardId) !== null) {
            document.getElementById(userClickcardId).setAttribute("style", "animation: none");
          }
        }
        cardPackOpenData.push(macheCard);
        res.usersList[currentActiveUserInGameIndex].cards.splice(macheCardIndex, 1);
        if (!!res.usersList[currentActiveUserInGameIndex].hasCardsCount && res.usersList[currentActiveUserInGameIndex].hasCardsCount >= 1) {
          res.usersList[currentActiveUserInGameIndex].hasCardsCount -= 1
        } else {
          res.usersList[currentActiveUserInGameIndex].hasCardsCount = 0
        }
        if (this.state.currentActiveUserInGame.isAvailable === false) {
          socket.emit('CARD_PICK_BY_COMPUTER_SEND', cardPackOpenData, res.usersList, currentActiveUserInGameIndex, macheCardIndex, room_unique_id)
        }
        this.setAssignedCardPosition(res.usersList);
      }

    });

    socket.on('ACTIVE_USER_CARD_SEND_MACHE_CARD_RESPONSE', res => {
      if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
        setTimeout(() => {

          const { currentActiveUserInGamePositionIndex, cardPackOpen, currentActiveUserInGame, defaultUsers } = this.state;
          let cardPackOpenData = cardPackOpen;
          let macheCard = res.card;
          let currentActiveUserInGameIndex = res.usersList.findIndex(x => x.user_id === currentActiveUserInGame.user_id);
          let userPositionIndex = currentActiveUserInGamePositionIndex;
          let macheCardIndex = res.usersList[currentActiveUserInGameIndex].cards.findIndex(x => x.title === macheCard.title);
          let userClickcardId = "user_" + currentActiveUserInGameIndex + "_card_" + macheCardIndex + "_" + defaultUsers;
          /*
          if (macheCardIndex > 10) {
            macheCardIndex = 10;
          } */
          //alert("userClickcardId ===>" + userClickcardId);
          let userClickAnimation = "user_" + userPositionIndex + "_card_" + macheCardIndex + "_" + defaultUsers;
          if (document.getElementById(userClickcardId) != null) {
            if (this.state.logInUserId === currentActiveUserInGame.user_id) {
              document.getElementById(userClickcardId).classList.add("opened");
            }
            document.getElementById(userClickcardId).setAttribute("style", "animation-name: send_card_" + userClickAnimation + ";animation-duration: 1s;animation-timing-function: ease;animation-fill-mode: both;animation-delay:0.5s;");

            if (document.getElementById(userClickcardId) !== null) {
              document.getElementById(userClickcardId).setAttribute("style", "animation: none");
            }
          }
          cardPackOpenData.push(macheCard);
          res.usersList[currentActiveUserInGameIndex].cards.splice(macheCardIndex, 1);
          if (!!res.usersList[currentActiveUserInGameIndex].hasCardsCount && res.usersList[currentActiveUserInGameIndex].hasCardsCount >= 1) {
            res.usersList[currentActiveUserInGameIndex].hasCardsCount -= 1
          } else {
            res.usersList[currentActiveUserInGameIndex].hasCardsCount = 0
          }

          socket.emit('CARD_PICK_BY_USER_SEND', cardPackOpenData, res.usersList, currentActiveUserInGameIndex, macheCardIndex, room_unique_id)
          this.setAssignedCardPosition(res.usersList);
        }, 500);

      }

    })

    socket.on('ACTIVE_COMPUTER_USER_CARD_NOT_MACHE_RESPONSE', res => {
      // 2 -> Draw 2 Logic
      const { cardPackOpen, drawCard, currentActiveUserInGame } = this.state;
      this.setState({ isNotMache: true });
      let cardPackLength = (cardPackOpen.length - 1);
      let openCardOndesk = cardPackOpen[cardPackLength];
      let key2CardCount = 0;
      let key2 = false;
      if (openCardOndesk.key === "2" && res.status) {
        for (let i = 0; i < 4; i++) {
          if (!!cardPackOpen[cardPackLength].key && cardPackOpen[cardPackLength].key === "2") {
            key2CardCount += 1;
          }
          cardPackLength--;
          if (cardPackLength < 0) {
            cardPackLength = 0;
            break;
          }
        }
      }
      if (res.status) {
        let drawCardCount = 1;
        if (openCardOndesk.key === "2") {
          key2 = true;
          this.setState({ isKey2: true })
        } else {
          this.setState({ drawCard: 1, clickOnCard: false })
        }

        if (key2 && key2CardCount >= 1) {
          for (let i = 0; i < key2CardCount; i++) {
            drawCardCount = drawCardCount * 2;
          }
          if (currentActiveUserInGame.isAvailable === false) {
            socket.emit('DARW_COMPUTER_CARDS_WHEN_CARD_2_NOT_AVAILABLE_SEND', drawCardCount, room_unique_id);
          }
        }
        if (drawCard === 16) {
          this.setState({ isNotMache: false, isKey2: false, drawCard: 1, clickOnCard: false });
        }
      }
    })

    socket.on('ACTIVE_USER_CARD_NOT_MACHE_RESPONSE', res => {
      // 2 -> Draw 2 Logic
      const { cardPackOpen, drawCard, logInUserId, currentActiveUserInGame } = this.state;
      this.setState({ isNotMache: true });
      let cardPackLength = (cardPackOpen.length - 1);
      let openCardOndesk = cardPackOpen[cardPackLength];
      let key2CardCount = 0;
      let key2 = false;
      if (openCardOndesk.key === "2" && res.status) {
        for (let i = 0; i < 4; i++) {
          if (!!cardPackOpen[cardPackLength].key && cardPackOpen[cardPackLength].key === "2") {
            key2CardCount += 1;
          }
          cardPackLength--;
          if (cardPackLength < 0) {
            cardPackLength = 0;
            break;
          }
        }
      }
      if (res.status) {
        let drawCardCount = 1;
        if (openCardOndesk.key === "2") {
          key2 = true;
          this.setState({ isKey2: true })
        } else {
          this.setState({ drawCard: 1, clickOnCard: false })
        }

        if (key2 && key2CardCount >= 1) {
          for (let i = 0; i < key2CardCount; i++) {
            drawCardCount = drawCardCount * 2;
          }
          if (logInUserId === currentActiveUserInGame.user_id) {
            socket.emit('DARW_CARDS_WHEN_CARD_2_NOT_AVAILABLE_SEND', drawCardCount, room_unique_id);
          }

        }
        if (drawCard === 16) {
          this.setState({ isNotMache: false, isKey2: false, drawCard: 1, clickOnCard: false });
        }
      }
    })

    socket.on('DARW_COMPUTER_CARDS_WHEN_CARD_2_NOT_AVAILABLE_RESPONSE', res => {
      const { cardPack, usersList, currentActiveUserInGame } = this.state;
      let cardPackData = cardPack;
      let cardPackLength = cardPack.length - 1;
      let usersListData = usersList
      let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === currentActiveUserInGame.user_id);
      if (res.status) {
        let drawCardCount = res.drawCardCount;
        for (let i = 0; i < drawCardCount; i++) {
          usersListData[currentActiveUserInGameIndex].cards.push(cardPack[cardPackLength])
          usersListData[currentActiveUserInGameIndex].hasCardsCount += 1;
          cardPackData.splice(cardPackLength, 1);
          cardPackLength--;
          if (cardPackLength === 0) {
            break;
          }
        }
        this.setState({ isNotMache: false, drawCard: 1, clickOnCard: false });
        // this is only for update cardpack and userslist 
        socket.emit('IMMIDIATE_WIN_GAME_PENALTY_SEND', cardPack, usersListData, room_unique_id);
      }
    });

    socket.on('DARW_CARDS_WHEN_CARD_2_NOT_AVAILABLE_RESPONSE', res => {
      const { cardPack, usersList, currentActiveUserInGame, logInUserId } = this.state;
      let cardPackData = cardPack;
      let cardPackLength = cardPack.length - 1;
      let usersListData = usersList
      let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === currentActiveUserInGame.user_id);
      if (res.status) {
        let drawCardCount = res.drawCardCount;
        for (let i = 0; i < drawCardCount; i++) {
          usersListData[currentActiveUserInGameIndex].cards.push(cardPack[cardPackLength])
          usersListData[currentActiveUserInGameIndex].hasCardsCount += 1;
          cardPackData.splice(cardPackLength, 1);
          cardPackLength--;
          if (cardPackLength === 0) {
            break;
          }
        }
        this.setState({ isNotMache: false, drawCard: 1, clickOnCard: false });
        if (logInUserId === currentActiveUserInGame.user_id) {
          // this is only for update cardpack and userslist 
          socket.emit('IMMIDIATE_WIN_GAME_PENALTY_SEND', cardPack, usersListData, room_unique_id);
        }
      }
    })

    socket.on('CARD_PICK_BY_COMPUTER_RESPONSE', res => {
      this.setState({ cardPackOpen: res.cardPackOpen, usersList: res.usersList });
      if (this.state.currentActiveUserInGame.isAvailable === false) {
        this.setAssignedCardPosition(res.usersList);
        this.openCardOndeskSetOndesk();
        let currentActiveUserInGameIndex = res.usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
        if (res.usersList[currentActiveUserInGameIndex].hasCardsCount === 0 && res.usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
          clearInterval(this.activeUsertimerId);
          gameLogic.onUserWinGame(this.state.currentActiveUserInGame, this.props.location.state.room_unique_id);
        } else if (res.usersList[currentActiveUserInGameIndex].hasCardsCount === 1 && !res.usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
          if (res.usersList[currentActiveUserInGameIndex].cards.length === 1 && res.usersList[currentActiveUserInGameIndex].isAvailable === false) {
            this.setLastCardInComputerUser(res.roomUniqueId);
            this.setNewActiveUser('leave');
          }
          this.setAssignedCardPosition(res.usersList)
        } else {
          this.setState({ clickOnCard: false, isNotMache: false });
          if (!res.usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
            this.setNewActiveUser('leave');
          }
          this.setAssignedCardPosition(res.usersList)
        }
      }

    })

    socket.on('CARD_PICK_BY_USER_RESPONSE', res => {
      this.setState({ cardPackOpen: res.cardPackOpen, usersList: res.usersList });
      this.setAssignedCardPosition(res.usersList);
      this.openCardOndeskSetOndesk();
      let currentActiveUserInGameIndex = res.usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
      if (res.usersList[currentActiveUserInGameIndex].hasCardsCount === 0 && res.usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
        clearInterval(this.activeUsertimerId);
        gameLogic.onUserWinGame(this.state.currentActiveUserInGame, this.props.location.state.room_unique_id);
      } else if (res.usersList[currentActiveUserInGameIndex].hasCardsCount === 1 && !res.usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
        //console.log("5 card draw ==>", this.state.currentActiveUserInGame.name)
      } else {
        this.setState({ clickOnCard: false, isNotMache: false });
        if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
          if (!res.usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
            this.setNewActiveUser();
          }
        }
        this.setAssignedCardPosition(res.usersList)
      }
    })

    socket.on('ACTIVE_USER_CARD_CATCH_FROM_CARDPACK_RESPONSE', res => {
      setTimeout(() => {
        const { usersList, cardPack, currentActiveUserInGamePositionIndex, currentActiveUserInGame, logInUserId } = this.state;
        let cardIndex = res.cardIndex;
        let card = res.card
        let userListData = usersList
        let currentActiveUserInGameIndex = userListData.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
        let cardPackData = cardPack;
        let cardId = 'card_' + cardIndex;
        let userPositionIndex = currentActiveUserInGamePositionIndex;
        let activeUserDrawCardCount = this.state.activeUserDrawCardCount;
        //alert("cardId ==>" + cardId);
        if (document.getElementById(cardId) != null) {
          if (logInUserId === currentActiveUserInGame.user_id) {
            document.getElementById(cardId).classList.add("opened");
          }
          if (document.getElementById(cardId) != null) {
            document.getElementById(cardId).setAttribute("style", "animation-name: user_" + userPositionIndex + "_card_" + 2 + "_" + this.state.defaultUsers + ";animation-duration: 1s;animation-timing-function: ease;animation-fill-mode: both;animation-delay:1s;z-index:" + cardIndex)
          }
        }
        if (logInUserId === currentActiveUserInGame.user_id) {
          activeUserDrawCardCount += 1;
          this.setState({ activeUserDrawCardCount: activeUserDrawCardCount })
          setTimeout(() => {
            cardPackData.splice(cardIndex, 1);
            userListData[currentActiveUserInGameIndex].cards.push(card)
            if (!!userListData[currentActiveUserInGameIndex].hasCardsCount && userListData[currentActiveUserInGameIndex].hasCardsCount >= 0) {
              userListData[currentActiveUserInGameIndex].hasCardsCount += 1
            } else {
              userListData[currentActiveUserInGameIndex].hasCardsCount = 0
            }
            if (userListData[currentActiveUserInGameIndex].hasCardsCount >= 2) {
              userListData[currentActiveUserInGameIndex].isPlayedLastCard = false;
            }
            socket.emit('CARD_PACK_UPDATE_SEND', cardPackData, userListData, room_unique_id)
          }, 1500);
        }
      }, 300);
    })

    socket.on('CARD_PACK_UPDATE_RESPONSE', res => {
      if (res.status) {
        this.setState({ cardPack: res.cardPack, usersList: res.usersList, isNotMache: false })
        this.setAssignedCardPosition(res.usersList);
        if (res.cardPack.length === 0) {
          this.addCardsInCardPackFromOpenCard();
        } else {
          this.setNewActiveUser();
          this.setState({ activeUserDrawCardCount: 0 })
        }
      }
    })

    socket.on('SET_LAST_CARD_IN_COMPUTER_USER_RESPONSE', res => {
      if (res.status) {
        this.setState({ usersList: res.usersList });
      }
    });

    socket.on('EMOJI_REACT_RESPONSE', res => {
      if (res.status) {
        console.log("In Emoji Response");
      }
    });

    socket.on('SET_LAST_CARD_IN_CURRENT_USER_RESPONSE', res => {
      if (res.status) {
        let currentActiveUserInGameIndex = res.usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
        this.setState({ usersList: res.usersList, lastCardUserName: res.usersList[currentActiveUserInGameIndex].name });
        setTimeout(() => {
          this.setState({ lastCardUserName: '' })
        }, 2000);
        setTimeout(() => {
          this.setNewActiveUser();
        }, 100);
      }
    })

    socket.on('IMMIDIATE_WIN_GAME_PENALTY_RESPONSE', res => {
      const { currentActiveUserInGame } = this.state;
      if (res.status) {
        this.setState({ cardPack: res.cardPack, usersList: res.usersList });
        setTimeout(() => {
          this.setAssignedCardPosition(res.usersList);
        }, 50);
        setTimeout(() => {
          if (currentActiveUserInGame.isAvailable === false) {
            this.setNewActiveUser('leave');
          } else {
            this.setNewActiveUser();
          }
        }, 100);
      }
    })

    socket.on('ADD_CARDS_IN_CARDPACK_FROM_OPENCARDPACK_RESPONSE', async (res) => {
      if (res.status) {
        this.setState({ cardPack: res.cardPack, cardPackOpen: res.cardPackOpen });
        await this.setCardOnDesk(res.cardPack);
        this.setNewActiveUser();
      }
    })

    socket.on('RESTART_GAME_RESPONSE', res => {
      //console.log("RESTART_GAME_RESPONSE", res)
      if (res.status) {
        //this.startNewGame();
      }
    })

    socket.on('IMMIDIATE_WIN_GAME_RESPONSE', res => {
      if (res.status) {
        clearInterval(this.activeUsertimerId);
        gameLogic.onUserWinGame(this.state.currentActiveUserInGame, this.props.location.state.room_unique_id);
      }
    })

    socket.on('LEAVEROOM_RESPONSE', async (res) => {
      //alert('logInUserId ==>' + this.state.logInUserId + "currentActiveUserInGame==> " + this.state.currentActiveUserInGame.user_id + "Screen ==>" + res.screen + "res.gameScreen ==>" + res.gameScreen);
      if (res.status) {
        this.setState({ roomUsers: res.usersList, usersList: res.usersList });
        if (this.state.currentActiveUserInGame.isAvailable === false) {
          if (res.screen === 'internet') {
            alert('call leave')
          }
          this.setNewActiveUser('leave');
        } else {
          if (res.screen === 'internet') {
            this.setNewActiveUser('leave');
          } else {
            this.setNewActiveUser();
          }
        }
        // if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id && res.screen !== 'internet') {
        //   if (this.state.currentActiveUserInGame.isAvailable === false) {
        //     this.setNewActiveUser('leave');
        //   } else {
        //     this.setNewActiveUser();
        //   }
        //   socket.emit('LEAVEROOMMEMBERVIEW_SEND', room_unique_id, user_ID, res.gameScreen);
        // }
        // if (res.status && res.screen === 'internet') {
        //   //alert('internet loss')
        //   //alert("isAvailable  ==>" + this.state.currentActiveUserInGame.isAvailable)
        //   if (this.state.currentActiveUserInGame.isAvailable === false) {
        //     this.setNewActiveUser('leave');
        //   } else {
        //     this.setNewActiveUser();
        //   }
        //   socket.emit('LEAVEROOMMEMBERVIEW_SEND', room_unique_id, user_ID, res.screen);
        // }

      }

    })
  }

  /*
  async componentWillUnmount() {
    socket.disconnect();
  } */

  addCardsInCardPackFromOpenCard = () => {
    let cardPack = this.state.cardPack;
    var cardPackOpen = this.state.cardPackOpen;
    let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
    if (cardPack.length === 0) {
      if (cardPackOpen.length > 1) {
        for (let i = 0; i < (cardPackOpen.length - 1); i++) {
          cardPack.push(cardPackOpen[i]);
        }
        this.suffleCards(cardPack);
        cardPack = this.state.cardPack;
        cardPackOpen = [cardPackOpen[cardPackOpen.length - 1]]
        if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
          socket.emit('ADD_CARDS_IN_CARDPACK_FROM_OPENCARDPACK_SEND', cardPack, cardPackOpen, room_unique_id);
        }
      } else {
        //console.log("no extra card available in open card pack ")
      }
    }
  }

  setInstantWin = () => {
    if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
      let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
      let usersList = this.state.usersList
      let cardPack = this.state.cardPack;
      let cardPackLength = cardPack.length - 1;
      let cardPackOpen = this.state.cardPackOpen;
      let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
      let card = cardPackOpen[cardPackOpen.length - 1];
      let cardArray = usersList[currentActiveUserInGameIndex].cards;

      let immediateWin = gameLogic.immediateWin(card, cardArray);
      if (immediateWin) {
        if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
          socket.emit('IMMIDIATE_WIN_GAME_SEND', room_unique_id);
        }
      } else {
        if (cardPackLength > 5) {
          for (let i = 0; i < 5; i++) {
            usersList[currentActiveUserInGameIndex].cards.push(cardPack[cardPackLength])
            usersList[currentActiveUserInGameIndex].hasCardsCount += 1;
            cardPack.splice(cardPackLength, 1);
            cardPackLength--;
            if (cardPackLength === 0) {
              break;
            }
          }
          if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
            socket.emit('IMMIDIATE_WIN_GAME_PENALTY_SEND', cardPack, usersList, room_unique_id);
          }
        } else {
          gameLogic.onInstantWin('penalty')
          //alert("Not enough cards for penalty")
        }
      }
    } else {
      gameLogic.onInstantWin('waitYourTurn')
      //alert("Please wait till your turn comes")
    }
  }

  setLastCardInComputerUser = (roomUniqueId) => {
    const { currentActiveUserInGame, usersList } = this.state;
    if (currentActiveUserInGame.isAvailable === false) {
      let room_unique_id = roomUniqueId;
      let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === currentActiveUserInGame.user_id);
      if (usersList[currentActiveUserInGameIndex].cards.length <= 1) {
        usersList[currentActiveUserInGameIndex].isPlayedLastCard = true;
        socket.emit('SET_LAST_CARD_IN_COMPUTER_USER_SEND', usersList, room_unique_id);
      }
    }
  }

  setLastCardInCurrentUser = () => {
    if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
      let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
      let usersList = this.state.usersList
      let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
      if (usersList[currentActiveUserInGameIndex].cards.length <= 2 && usersList[currentActiveUserInGameIndex].isAvailable === true) {
        usersList[currentActiveUserInGameIndex].isPlayedLastCard = true;
        socket.emit('SET_LAST_CARD_IN_CURRENT_USER_SEND', usersList, room_unique_id);
      }
    }
  }

  startNewGameClick = () => {
    let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
    if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
      socket.emit('RESTART_GAME_SEND', room_unique_id);
    }
  }

  openCardOndeskSetOndesk = () => {
    let cardPackOpen = this.state.cardPackOpen;
    for (let i = 0; i < cardPackOpen.length; i++) {
      let cardId = 'open_card_' + i;
      if (document.getElementById(cardId)) {
        document.getElementById(cardId).style.zIndex = i;
      }
      cardPackOpen[i].style = { 'z-index': i };
    }
  }

  setNewActiveUser = (type = '') => {
    const { roomUsers, currentActiveUserInGame } = this.state;
    let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
    let currentActiveUserInGameIndex = roomUsers.findIndex(x => x.user_id === currentActiveUserInGame.user_id);
    let usersLists = roomUsers.filter(x => x.isAvailable === true);
    let newCurrentActiveUserInGame = {};

    if (usersLists.length === 0) {
      gameLogic.closeGame(this.state.currentActiveUserInGame.user_id);
    } else {
      //alert("Old Current Active User Index  ===> " + currentActiveUserInGameIndex);
      if (this.state.gameDirection === Direction.anticlosewise) {
        // anticlockwise
        if (currentActiveUserInGameIndex === 0) {
          currentActiveUserInGameIndex = (roomUsers.length - 1);
        } else {
          currentActiveUserInGameIndex -= 1;
        }
        newCurrentActiveUserInGame = roomUsers[currentActiveUserInGameIndex];
      } else {
        // clockwise
        if (currentActiveUserInGameIndex === (roomUsers.length - 1)) {
          currentActiveUserInGameIndex = 0;
        } else {
          currentActiveUserInGameIndex += 1;
        }
        newCurrentActiveUserInGame = roomUsers[currentActiveUserInGameIndex];
      }
      //alert("New Current Active User Index  ===> " + currentActiveUserInGameIndex);

      if (type === 'leave') {
        this.setCurrentActiveUserInGame(newCurrentActiveUserInGame, room_unique_id)
        setTimeout(() => {
          socket.emit('START_ACTIVE_USER_TIMER_SEND', room_unique_id);
        }, 2000);
      } else {
        if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
          this.setCurrentActiveUserInGame(newCurrentActiveUserInGame, room_unique_id)
          setTimeout(() => {
            //alert("call when time set")
            socket.emit('START_ACTIVE_USER_TIMER_SEND', room_unique_id);
          }, 2000);
        }
      }
    }
  }

  skipComputerTurn = (roomUniqueId) => {
    let usersList = this.state.usersList;
    let cardPack = this.state.cardPack;
    let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
    if (!!usersList[currentActiveUserInGameIndex].skipTurn) {
      usersList[currentActiveUserInGameIndex].skipTurn += 1;
    } else {
      usersList[currentActiveUserInGameIndex].skipTurn = 1;
    }
    let room_unique_id = roomUniqueId;
    if (usersList[currentActiveUserInGameIndex].hasCardsCount === 1 && !usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
      if (!!usersList[currentActiveUserInGameIndex].skipTurn && usersList[currentActiveUserInGameIndex].skipTurn > 1) {
        usersList[currentActiveUserInGameIndex].skipTurn -= 1;
      } else {
        usersList[currentActiveUserInGameIndex].skipTurn = 0;
      }

      // Add five card penalty in current user when active user has one card and not click on last card button
      let cardPackLength = cardPack.length - 1;
      for (let i = 0; i < 5; i++) {
        usersList[currentActiveUserInGameIndex].cards.push(cardPack[cardPackLength])
        usersList[currentActiveUserInGameIndex].hasCardsCount += 1;
        cardPack.splice(cardPackLength, 1);
        cardPackLength--;
        if (cardPackLength === 0) {
          break;
        }
      }
    }

    setTimeout(() => {
      this.setNewActiveUser('leave');
    }, 500);

    socket.emit('SKIP_COMPUTER_TURN_SEND', usersList, cardPack, room_unique_id);
  }

  skipUserTurn = () => {
    let usersList = this.state.usersList;
    let cardPack = this.state.cardPack;
    let currentActiveUserInGameIndex = usersList.findIndex(x => x.user_id === this.state.currentActiveUserInGame.user_id);
    if (!!usersList[currentActiveUserInGameIndex].skipTurn) {
      usersList[currentActiveUserInGameIndex].skipTurn += 1;
    } else {
      usersList[currentActiveUserInGameIndex].skipTurn = 1;
    }
    let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
    if (usersList[currentActiveUserInGameIndex].hasCardsCount === 1 && !usersList[currentActiveUserInGameIndex].isPlayedLastCard) {
      if (!!usersList[currentActiveUserInGameIndex].skipTurn && usersList[currentActiveUserInGameIndex].skipTurn > 1) {
        usersList[currentActiveUserInGameIndex].skipTurn -= 1;
      } else {
        usersList[currentActiveUserInGameIndex].skipTurn = 0;
      }

      // Add five card penalty in current user when active huser has one card and not click on last card button
      let cardPackLength = cardPack.length - 1;
      for (let i = 0; i < 5; i++) {
        usersList[currentActiveUserInGameIndex].cards.push(cardPack[cardPackLength])
        usersList[currentActiveUserInGameIndex].hasCardsCount += 1;
        cardPack.splice(cardPackLength, 1);
        cardPackLength--;
        if (cardPackLength === 0) {
          break;
        }
      }
    }

    if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
      socket.emit('SKIP_USER_TURN_SEND', usersList, cardPack, room_unique_id);
    }
  }

  setActiveUserTimer = (roomUniqueId) => {
    const { currentActiveUserInGame, activeUserTimerDefault } = this.state;
    let countdown = activeUserTimerDefault;
    let currentUser = currentActiveUserInGame;
    this.activeUsertimerId = setInterval(() => {
      countdown -= 1000;
      var min = Math.floor(countdown / (60 * 1000));
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
      if (countdown <= 0) {
        clearInterval(this.activeUsertimerId);
        this.setState({ activeUserTime: "00 : 20" });
        if (currentUser.isAvailable === false) {
          this.skipComputerTurn(roomUniqueId);
        } else {
          this.skipUserTurn();
        }
      } else {
        this.setState({ activeUserTime: ("0" + min) + " : " + (sec < 10 ? "0" + sec : sec) });
      }
    }, 1000);
  }

  setCurrentActiveUserInGame = (currentActiveUser, room_unique_id) => {
    socket.emit('CURRENT_ACTIVE_USER_IN_GAME_SEND', currentActiveUser, room_unique_id);
  }

  startGameFirstcardOpen = (cardPack, room_unique_id) => {
    let cardPackOpen = [];
    let topCardID = "card_" + (cardPack.length - 1);
    if (document.getElementById(topCardID) != null) {
      document.getElementById(topCardID).setAttribute("style", "animation-name: first_card_move;animation-duration: 1s;animation-timing-function: ease;animation-fill-mode: both;animation-delay:1s;z-index:0")
      setTimeout(() => {
        document.getElementById(topCardID).classList.add("opened");
      }, 1);
    }
    setTimeout(() => {
      let firstOpenCard = cardPack[cardPack.length - 1];
      let gemeStartDirection = gameLogic.getGameDirection(firstOpenCard, true);
      socket.emit('GAME_START_DIRECTION_SEND', gemeStartDirection, room_unique_id);
      cardPackOpen.push(firstOpenCard);
      socket.emit('FIRST_CARD_OPEN_SEND', cardPack, cardPackOpen, room_unique_id);
    }, 2500);
  }


  setAssignedCardPosition = (usersListArray) => {
    for (let i = 0; i < usersListArray.length; i++) {
      if (usersListArray[i].cards.length > 0) {
        for (let j = 0; j < usersListArray[i].cards.length; j++) {
          let cardId = "user_" + i + "_card_" + j + "_" + usersListArray.length;
          let openCardClass = "opencard_" + j;
          let closeCardClass = "closecard_" + j;
          if (document.getElementById(cardId) != null) {
            if (usersListArray[i].user_id === this.state.logInUserId && usersListArray[i].isAvailable === true) {
              document.getElementById(cardId).classList.add(openCardClass);
              document.getElementById(cardId).style.zIndex = j;
            } else {
              if (usersListArray[i].isAvailable === true) {
                document.getElementById(cardId).classList.add(closeCardClass);
                document.getElementById(cardId).style.zIndex = j;
              } else {
                document.getElementById(cardId).classList.add(closeCardClass);
                document.getElementById(cardId).style.zIndex = j;
              }

            }
          }
        }
      }
    }
  }

  cardDistributionAnimation = async (usersListArray, cardArray, perUserCard) => {
    let cardLength = cardArray.length - 1;
    let card_i = 0;
    let delayTime = 0;
    let user_i = this.state.currentActiveUserInGamePositionIndex;
    let card_j = 0;
    //alert('user_i ==>' + user_i)
    for (let i = 0; i < usersListArray.length * perUserCard; i++) {
      let cardId = "card_" + cardLength;
      delayTime += 0.5;
      if (document.getElementById(cardId) != null) {
        if (cardLength > 0) {
          document.getElementById(cardId).setAttribute("style", "animation-name: user_" + user_i + "_card_" + card_j + "_" + usersListArray.length + ";animation-duration: 2s;animation-timing-function: ease;animation-fill-mode: both;animation-delay:" + delayTime + "s;z-index:" + cardLength)
        }
        if (card_i === this.state.loginUserIndex) {
          setTimeout(() => {
            if (!!document.getElementById(cardId)) {
              document.getElementById(cardId).classList.add("opened");
            }
          }, (delayTime * 1120));
        }
      }
      cardLength--;
      card_i++;
      user_i++;
      if (user_i === usersListArray.length) {
        user_i = 0;
      }
      if (card_i === usersListArray.length) {
        card_i = 0;
        card_j++;
      }
    }
  }

  cardDistribution = (usersListArray, cardArray, perUserCard, room_unique_id) => {
    let usersListValues = usersListArray;
    let timeOutValue = ((1000 * (usersListValues.length * perUserCard)) / 2) + 800;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let cardLength = cardArray.length - 1;
        let cardArrayList = cardArray;
        let card_i = 0;
        for (let i = 0; i < usersListValues.length * perUserCard; i++) {
          if (cardLength > 0) {
            usersListValues[card_i].cards.push(cardArrayList[cardLength])
            if (!!usersListValues[card_i].hasCardsCount) {
              usersListValues[card_i].hasCardsCount += 1
            } else {
              usersListValues[card_i].hasCardsCount = 1
            }
            cardArrayList.splice(cardLength, 1);
          }
          cardLength--;
          card_i++;
          if (card_i === usersListValues.length) {
            card_i = 0;
          }
        }
        this.setState({ cardPack: cardArrayList, usersList: usersListValues });
        socket.emit('CARD_DISTRIBUTION_SEND', this.state.cardPack, this.state.usersList, room_unique_id)
        resolve(usersListValues);
      }, timeOutValue);
    });
  }

  setCardOnDesk = async (cardArray) => {
    let cardArrayList = cardArray;
    for (let i = 0; i < cardArrayList.length; i++) {
      let cardId = 'card_' + i;
      if (document.getElementById(cardId) != null) {
        document.getElementById(cardId).style.zIndex = i;
      }
      cardArrayList[i].style = { 'z-index': i };
      cardArrayList[i].cardId = i;
    }
    this.setState({ cardPack: cardArrayList })
  }

  suffleCards = (cardArray) => {
    let shuffled = cardArray
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    this.setState({ cardPack: shuffled });
  }

  setUsers = (users) => {
    let roomUser = this.state.roomUsers;
    let count = parseInt(users);
    let userArray = []
    return new Promise((resolve, reject) => {
      for (let index = 0; index < count; index++) {
        userArray[index] = {
          "user_id": roomUser && roomUser[index] && !!roomUser[index].user_id ? roomUser[index].user_id : null,
          "name": roomUser && roomUser[index] && !!roomUser[index].name ? roomUser[index].name : null,
          "image_url": roomUser && roomUser[index] && !!roomUser[index].user_image ? roomUser[index].user_image : null,
          "style": {
            "animationDuration": "2s",
            "opacity": 1,
            "animationTimingFunction": "ease",
            "animationFillMode": "both"
          },
          "cards": roomUser && roomUser[index] && !!roomUser[index].cards ? roomUser[index].cards : [],
          "isPlayedLastCard": false,
          "isAvailable": roomUser && roomUser[index] && !!roomUser[index].isAvailable ? roomUser[index].isAvailable : true
        }
      }
      this.setState({ usersList: userArray, roomUsers: userArray })
      resolve(userArray);
    });
  }

  getCurrentUserIndex = (userListArray) => {
    let currentUserIndex = userListArray.findIndex(x => x.user_id === this.state.logInUserId)
    this.setState({ loginUserIndex: (currentUserIndex === -1) ? 0 : currentUserIndex })
  }

  setUsersPositions = (userListArray, positionArray, currentUserIndex) => {
    for (let i = 0; i < userListArray.length; i++) {
      let userId = "poker_" + currentUserIndex;
      if (document.getElementById(userId) != null) {
        document.getElementById(userId).style.left = positionArray[i].left;
        document.getElementById(userId).style.top = positionArray[i].top;
      }
      currentUserIndex++;
      if (currentUserIndex === userListArray.length) {
        currentUserIndex = 0;
      }
    }
  }

  getUserPositions = async (users) => {
    let positionsValue;
    switch (parseInt(users)) {
      case 1:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 2:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }, {
          left: '36%',
          top: '-32%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 3:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }, {
          left: '-5%',
          top: '40%',
        },
        {
          left: '36%',
          top: '-32%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 4:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }, {
          left: '-5%',
          top: '40%',
        },
        {
          left: '36%',
          top: '-32%',

        }, {
          left: '75%',
          top: '40%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 5:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }, {
          left: '-5%',
          top: '62%',
        },
        {
          left: '-5%',
          top: '5%',
        },
        {
          left: '75%',
          top: '4%',

        }, {
          left: '75%',
          top: '62%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 6:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }, {
          left: '-5%',
          top: '62%',
        },
        {
          left: '-5%',
          top: '5%',
        },
        {
          left: '36%',
          top: '-32%',
        },
        {
          left: '75%',
          top: '4%',

        }, {
          left: '75%',
          top: '62%',
        }]
        this.setState({ positions: positionsValue });
        break;
      default:
        positionsValue = [{
          left: '36%',
          top: '118%',
        }]
        this.setState({ positions: positionsValue });
        break;
    }
  }

  setTimer = () => {
    let countdown = this.state.timer;
    let timerId = setInterval(() => {
      countdown += 1000;
      var min = Math.floor(countdown / (60 * 1000));
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
      if (countdown >= (60 * 60 * 1000)) {
        clearInterval(timerId);
        this.setState({ showTime: "60 : 00" });
        this.setTimer();
      } else {
        this.setState({ showTime: (min < 10 ? "0" + min : min) + " : " + (sec < 10 ? "0" + sec : sec) });
      }
    }, 1000);
  }

  clickOnCardPack = (card, cardIndex) => {
    const { logInUserId, currentActiveUserInGame } = this.state;
    if (logInUserId === currentActiveUserInGame.user_id) {
      let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
      socket.emit('ACTIVE_USER_CARD_CATCH_FROM_CARDPACK_SEND', card, cardIndex, room_unique_id);
    }
  }

  computerPlay = (roomUniqueId) => {
    const { currentActiveUserInGame, cardPackOpen, usersList } = this.state;
    if (currentActiveUserInGame.isAvailable === false) {
      let openCardLength = (cardPackOpen.length - 1);
      let openCardData = cardPackOpen[openCardLength];
      let openCardShape = openCardData.shape;
      let usersData = usersList.find((item) => item.user_id === currentActiveUserInGame.user_id)
      let currentUsersCards = usersData.cards;
      let filterCards = currentUsersCards.filter((item) => item.shape === openCardShape);
      var clearTimeInterval;
      if (usersData.cards.length === 0) {
        gameLogic.onUserWinGame(currentActiveUserInGame, this.props.location.state.room_unique_id);
      } else {
        if (filterCards.length > 0) {
          //this.setLastCardInComputerUser(roomUniqueId);
          if (filterCards.length === 1) {
            clearTimeInterval = setTimeout(() => {
              this.computerClickOnCard(filterCards[0], roomUniqueId, currentActiveUserInGame.user_id);
              clearInterval(clearTimeInterval)
            }, 6000);
          } else {
            const card = filterCards.reduce(function (prev, current) {
              return (prev.cardValue > current.cardValue) ? prev : current
            }) //returns object
            clearTimeInterval = setTimeout(() => {
              this.computerClickOnCard(card, roomUniqueId, currentActiveUserInGame.user_id);
              clearInterval(clearTimeInterval)
            }, 6000);
          }
        } else {
          clearTimeInterval = setTimeout(() => {
            this.skipComputerTurn(roomUniqueId)
            clearInterval(clearTimeInterval)
          }, 6000);
          //this.setLastCardInComputerUser(roomUniqueId);
        }
      }
    }
  }

  computerClickOnCard = (card, roomUniqueId, userId) => {
    if (this.state.currentActiveUserInGame.isAvailable === false) {
      this.setState({ clickOnCard: true })
      let room_unique_id = roomUniqueId;
      let cardPackOpen = this.state.cardPackOpen;
      let openCardOndesk = cardPackOpen[cardPackOpen.length - 1];
      let isCardMache = gameLogic.checkMatchCard(card, openCardOndesk)
      if (card.key === "8" && isCardMache) {
        let gemeStartDirection = gameLogic.getGameDirection(card, true);
        socket.emit('GAME_START_DIRECTION_SEND', gemeStartDirection, room_unique_id);
        setTimeout(() => {
          socket.emit('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id, userId);
        }, 500);

      } else {
        if (isCardMache) {
          socket.emit('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id, userId);
        } else {
          if (!isCardMache && this.state.isKey2) {
            this.setState({ isKey2: false })
            if (card.shape === openCardOndesk.shape) {
              socket.emit('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id, userId);
            } else if (card.key === openCardOndesk.key) {
              socket.emit('ACTIVE_COMPUTER_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id, userId);
            }
          } else {
            socket.emit('ACTIVE_COMPUTER_USER_CARD_NOT_MACHE_SEND', card, room_unique_id);
          }
        }
      }
      setTimeout(() => {
        this.setState({ clickOnCard: false })
      }, 2000);
    }

  }

  clickOnCard = (event, card, itemIndex, userIndex) => {
    if (this.state.logInUserId === this.state.currentActiveUserInGame.user_id) {
      this.setState({ clickOnCard: true })
      let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
      let cardPackOpen = this.state.cardPackOpen;
      let openCardOndesk = cardPackOpen[cardPackOpen.length - 1];
      let isCardMache = gameLogic.checkMatchCard(card, openCardOndesk)
      if (card.key === "8" && isCardMache) {
        let gemeStartDirection = gameLogic.getGameDirection(card, true);
        socket.emit('GAME_START_DIRECTION_SEND', gemeStartDirection, room_unique_id);
        setTimeout(() => {
          socket.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id);
        }, 500);

      } else {
        if (isCardMache) {
          socket.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id);
        } else {
          if (!isCardMache && this.state.isKey2) {
            this.setState({ isKey2: false })
            if (card.shape === openCardOndesk.shape) {
              socket.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id);
            } else if (card.key === openCardOndesk.key) {
              socket.emit('ACTIVE_USER_CARD_SEND_MACHE_CARD_SEND', card, room_unique_id);
            }
          } else {
            socket.emit('ACTIVE_USER_CARD_NOT_MACHE_SEND', card, room_unique_id);
          }
        }
      }
      setTimeout(() => {
        this.setState({ clickOnCard: false })
      }, 2000);
    }
  }


  openCard = (card, itemIndex, userIndex) => {
    var element = document.getElementById("user_" + userIndex + "_card_" + itemIndex + '_' + this.state.defaultUsers);
    if (element != null) {
      let splitData = element.classList.value.split(" ");
      if (splitData.includes("open")) {
        if (itemIndex === 2) {
          element.classList.remove("open");
          element.classList.remove("card_2");
        } else if (itemIndex === 1) {
          element.classList.remove("open");
          element.classList.remove("card_1");
        } else {
          element.classList.remove("open");
          element.classList.remove("card_0");
        }
        setTimeout(function () {
          element.classList.remove('opened');
        }, 300);
      } else {
        if (itemIndex === 2) {
          element.classList.add("open");
          element.classList.add("card_2");
        } else if (itemIndex === 1) {
          element.classList.add("open");
          element.classList.add("card_1");
        } else {
          element.classList.add("open");
          element.classList.add("card_0");
        }
        setTimeout(function () {
          element.classList.add('opened');
        }, 300);
      }
    }
  }

  render() {
    return (
      <div className="game_screen">
        <div className="top_part_button">
          <div className="left_button_part">
            <div className="clock-btn">
              <div className="in_spaceclock">
                <span className="icon_clock"><img src="/images/time-sharp.png" alt="image1" /></span>
                {this.state.showTime}
              </div>
            </div>
            <div className="scores_btn">Scores</div>
          </div>
          <div className="right_part right_button_part">
            <div className="btn_volume">
              <img src="/images/volume-mute.png" alt="image2" />
            </div>
            <div className="btn_close" onClick={(e) => gameLogic.onClose(e, 'game')}>
              <img src="/images/close.png" alt="image3" />
            </div>
          </div>
        </div>
        <div className="circle_part" >
          <div className="patti_bundle_part_open" >
            {
              this.state.cardPackOpen.length > 0 && this.state.cardPackOpen.map((card, index) => {
                return (
                  <div key={"card_pack_" + index} className={card.color === 'red' ? 'card red opened' : 'card opened'} id={"open_card_" + index}>
                    <span data-value={card.key} data-title={card.title}>
                      <img src={"/images/" + card.image} alt={card.image} style={{ "height": "80px" }} />
                    </span>
                  </div>
                )
              })
            }
          </div>
          <div className="patti_bundle_part" >
            {
              this.state.cardPack.length > 0 && this.state.cardPack.map((card, index) => {
                return (
                  <div key={"card_pack_" + index} className={card.color === 'red' ? 'card red' : 'card'} id={"card_" + index} onClick={() => this.clickOnCardPack(card, index)}>
                    <span data-value={card.key} data-title={card.title}>
                      <img src={"/images/" + card.image} alt={card.image} style={{ "height": "80px" }} />
                    </span>
                  </div>
                )
              })
            }
          </div>
          {this.state.isNotMache &&
            <div style={{ backgroundColor: "yellow", width: "320px", color: "black", fontSize: "14px" }} >
              {this.state.isKey2 && `you must either play a 2 as well or draw ${this.state.drawCard} cards`}
              {!this.state.isKey2 && `you must either play same suit as well or draw ${this.state.drawCard} card`}

            </div>
          }
          {!!this.state.lastCardUserName && this.state.lastCardUserName !== '' &&
            <div style={{ backgroundColor: "yellow", width: "320px", color: "black", fontSize: "14px", textAlign: "center" }} >
              {`${this.state.lastCardUserName} played last card`}
            </div>
          }
          {
            this.state.usersList.length > 0 && this.state.usersList.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={"user_part"} id={"poker_" + index} style={user.style}>
                    <div className={user.user_id === this.state.currentActiveUserInGame.user_id ? "user_box user_yellow" : "user_box user_grey"}>
                      <img src={user.image_url} alt={"user_image_" + index} />
                      <span className="text">
                        {user.user_id !== this.state.currentActiveUserInGame.user_id && user.name}
                        {user.user_id === this.state.currentActiveUserInGame.user_id && this.state.activeUserTime}
                      </span>
                    </div>
                    <div className="patti_top_part">
                      {
                        !!user.cards && user.cards.length > 0 && user.cards.map((card, cardindex) => {
                          return (
                            <React.Fragment key={"card_" + index + "_key_" + cardindex}>
                              <div style={{ "opacity": 1 }} onClick={user.user_id === this.state.logInUserId && !this.state.clickOnCard ? (e) => this.clickOnCard(e, card, cardindex, index) : null} className={card.color === 'red' ? `card red ${user.user_id === this.state.logInUserId ? "open opened card_" + cardindex : null}` : `${user.user_id === this.state.logInUserId ? 'card open opened card_' + cardindex : 'card'}`} id={"user_" + index + "_card_" + cardindex + '_' + this.state.usersList.length} >
                                <span data-value={card.key} data-title={card.title}>
                                  <img src={"/images/" + card.image} alt={card.image} />
                                </span>
                              </div>
                            </React.Fragment>
                          )
                        })
                      }
                    </div>
                  </div>
                </React.Fragment>
              )
            })
          }
        </div>


        <div className="bottom_part_buttons">
          <div className="left_button_part">
            <div className="row">
              <div className="btn_react" onClick={(e) => gameLogic.onReact(e)}>REACT&nbsp;  <Emoji symbol="😝" label="react" /></div>
            </div>
            <div className="row">
              <div className="btn_react btn_power_up">POWER-UP <Emoji symbol="💡" label="power" /></div>
            </div>
          </div>
          <div className="right_button_part">
            <div className="row btn_right">
              <div className="btn_react btn_last_card" onClick={this.setLastCardInCurrentUser}>Last card</div>
            </div>
            <div className="row btn_right">
              <div className="btn_react btn_instant_win" onClick={this.setInstantWin} >Instant win</div>
            </div>
          </div>
        </div>
        <div className="add_bottom_part">
          <img src="/images/ad.png" alt="ad" />
        </div>

        {/* <button id="openModal" style={{ display: "none" }}>Open Modal</button>
        <div id="myModal" class="modal">
          <div class="modal-content">
            <span id="closeModal" class="close">&times;</span>
            <p>{this.state.currentActiveUserInGame.name} Wins!!!</p>
            <button className="btn_react btn_start_game" onClick={this.startNewGameClick}>Start a new game !</button>
          </div>
        </div> */}
      </div>
    )
  }

}

const mapStateToProps = (state = {}) => {
  return ({
    loginUser: state.rooms.loginUser,
    roomUsers: state.rooms.roomUsers
  })
}
export default connect(mapStateToProps, { getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse })(Gameviewtest)