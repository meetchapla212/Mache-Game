import React from 'react';
import Emoji from 'a11y-react-emoji';
import { Direction, gameLogic } from "./Constant";
import { Config } from '../Config';
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
    },
    {
      key: "2",
      title: "2 ♣",
      color: "black",
      image: "flower_2.png",
      cardValue: 2,
      pointValue: 2,
    },
    {
      key: "3",
      title: "3 ♣",
      color: "black",
      image: "flower_3.png",
      cardValue: 3,
      pointValue: 3,
    },
    {
      key: "4",
      title: "4 ♣",
      color: "black",
      image: "flower_4.png",
      cardValue: 4,
      pointValue: 4,
    },
    {
      key: "5",
      title: "5 ♣",
      color: "black",
      image: "flower_5.png",
      cardValue: 5,
      pointValue: 5,
    },
    {
      key: "6",
      title: "6 ♣",
      color: "black",
      image: "flower_6.png",
      cardValue: 6,
      pointValue: 6,
    },
    {
      key: "7",
      title: "7 ♣",
      color: "black",
      image: "flower_7.png",
      cardValue: 7,
      pointValue: 7,
    },
    {
      key: "8",
      title: "8 ♣",
      color: "black",
      image: "flower_8.png",
      cardValue: 8,
      pointValue: 20,
    },
    {
      key: "9",
      title: "9 ♣",
      color: "black",
      image: "flower_9.png",
      cardValue: 9,
      pointValue: 9,
    },
    {
      key: "10",
      title: "10 ♣",
      color: "black",
      image: "flower_10.png",
      cardValue: 10,
      pointValue: 10,
    },
    {
      key: "J",
      title: "J ♣",
      color: "black",
      image: "flower_11.png",
      cardValue: 11,
      pointValue: 11,
    },
    {
      key: "Q",
      title: "Q ♣",
      color: "black",
      image: "flower_12.png",
      cardValue: 12,
      pointValue: 12,
    },
    {
      key: "K",
      title: "K ♣",
      color: "black",
      image: "flower_13.png",
      cardValue: 13,
      pointValue: 13,
    },
    {
      key: "A",
      title: "A ♦",
      color: "red",
      image: "diamond_1.png",
      cardValue: 1,
      pointValue: 1,
    },
    {
      key: "2",
      title: "2 ♦",
      color: "red",
      image: "diamond_2.png",
      cardValue: 2,
      pointValue: 2,
    },
    {
      key: "3",
      title: "3 ♦",
      color: "red",
      image: "diamond_3.png",
      cardValue: 3,
      pointValue: 3,
    },
    {
      key: "4",
      title: "4 ♦",
      color: "red",
      image: "diamond_4.png",
      cardValue: 4,
      pointValue: 4,
    },
    {
      key: "5",
      title: "5 ♦",
      color: "red",
      image: "diamond_5.png",
      cardValue: 5,
      pointValue: 5,
    },
    {
      key: "6",
      title: "6 ♦",
      color: "red",
      image: "diamond_6.png",
      cardValue: 6,
      pointValue: 6,
    },
    {
      key: "7",
      title: "7 ♦",
      color: "red",
      image: "diamond_7.png",
      cardValue: 7,
      pointValue: 7,
    },
    {
      key: "8",
      title: "8 ♦",
      color: "red",
      image: "diamond_8.png",
      cardValue: 8,
      pointValue: 20,
    },
    {
      key: "9",
      title: "9 ♦",
      color: "red",
      image: "diamond_9.png",
      cardValue: 9,
      pointValue: 9,
    },
    {
      key: "10",
      title: "10 ♦",
      color: "red",
      image: "diamond_10.png",
      cardValue: 10,
      pointValue: 10,
    },
    {
      key: "J",
      title: "J ♦",
      color: "red",
      image: "diamond_11.png",
      cardValue: 11,
      pointValue: 11,
    },
    {
      key: "Q",
      title: "Q ♦",
      color: "red",
      image: "diamond_12.png",
      cardValue: 12,
      pointValue: 12,
    },
    {
      key: "K",
      title: "K ♦",
      color: "red",
      image: "diamond_13.png",
      cardValue: 13,
      pointValue: 13,
    },
    {
      key: "A",
      title: "A ♥",
      color: "red",
      image: "heart_1.png",
      cardValue: 1,
      pointValue: 1,
    },
    {
      key: "2",
      title: "2 ♥",
      color: "red",
      image: "heart_2.png",
      cardValue: 2,
      pointValue: 2,
    },
    {
      key: "3",
      title: "3 ♥",
      color: "red",
      image: "heart_3.png",
      cardValue: 3,
      pointValue: 3,
    },
    {
      key: "4",
      title: "4 ♥",
      color: "red",
      image: "heart_4.png",
      cardValue: 4,
      pointValue: 4,
    },
    {
      key: "5",
      title: "5 ♥",
      color: "red",
      image: "heart_5.png",
      cardValue: 5,
      pointValue: 5,
    },
    {
      key: "6",
      title: "6 ♥",
      color: "red",
      image: "heart_6.png",
      cardValue: 6,
      pointValue: 6,
    },
    {
      key: "7",
      title: "7 ♥",
      color: "red",
      image: "heart_7.png",
      cardValue: 7,
      pointValue: 7,
    },
    {
      key: "8",
      title: "8 ♥",
      color: "red",
      image: "heart_8.png",
      cardValue: 8,
      pointValue: 20,
    },
    {
      key: "9",
      title: "9 ♥",
      color: "red",
      image: "heart_9.png",
      cardValue: 9,
      pointValue: 9,
    },
    {
      key: "10",
      title: "10 ♥",
      color: "red",
      image: "heart_10.png",
      cardValue: 10,
      pointValue: 10,
    },
    {
      key: "J",
      title: "J ♥",
      color: "red",
      image: "heart_11.png",
      cardValue: 11,
      pointValue: 11,
    },
    {
      key: "Q",
      title: "Q ♥",
      color: "red",
      image: "heart_12.png",
      cardValue: 12,
      pointValue: 12,
    },
    {
      key: "K",
      title: "K ♥",
      color: "red",
      image: "heart_13.png",
      cardValue: 13,
      pointValue: 13,
    },
    {
      key: "A",
      title: "A ♠",
      color: "black",
      image: "black_1.png",
      cardValue: 1,
      pointValue: 1,
    },
    {
      key: "2",
      title: "2 ♠",
      color: "black",
      image: "black_2.png",
      cardValue: 2,
      pointValue: 2,
    },
    {
      key: "3",
      title: "3 ♠",
      color: "black",
      image: "black_3.png",
      cardValue: 3,
      pointValue: 3,
    },
    {
      key: "4",
      title: "4 ♠",
      color: "black",
      image: "black_4.png",
      cardValue: 4,
      pointValue: 4,
    },
    {
      key: "5",
      title: "5 ♠",
      color: "black",
      image: "black_5.png",
      cardValue: 5,
      pointValue: 5,
    },
    {
      key: "6",
      title: "6 ♠",
      color: "black",
      image: "black_6.png",
      cardValue: 6,
      pointValue: 6,
    },
    {
      key: "7",
      title: "7 ♠",
      color: "black",
      image: "black_7.png",
      cardValue: 7,
      pointValue: 7,
    },
    {
      key: "8",
      title: "8 ♠",
      color: "black",
      image: "black_8.png",
      cardValue: 8,
      pointValue: 20,
    },
    {
      key: "9",
      title: "9 ♠",
      color: "black",
      image: "black_9.png",
      cardValue: 9,
      pointValue: 9,
    },
    {
      key: "10",
      title: "10 ♠",
      color: "black",
      image: "black_10.png",
      cardValue: 10,
      pointValue: 10,
    },
    {
      key: "J",
      title: "J ♠",
      color: "black",
      image: "black_11.png",
      cardValue: 11,
      pointValue: 11,
    },
    {
      key: "Q",
      title: "Q ♠",
      color: "black",
      image: "black_12.png",
      cardValue: 12,
      pointValue: 12,
    },
    {
      key: "K",
      title: "K ♠",
      color: "black",
      image: "black_13.png",
      cardValue: 13,
      pointValue: 13,
    },
  ];

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
  }

  async componentDidMount() {
    // let room_unique_id = !!this.props.location.state ? this.props.location.state.room_unique_id : null;
    // let user_ID = !!this.props.location.state ?  this.props.location.state.user_id : null;
    // if (user_ID && room_unique_id) {
    //   socket.emit('GETROOMMEMBER_SEND',room_unique_id, user_ID);
    //   await socket.on('GETROOMMEMBER_RESPONSE', data => {
    //     console.log('In Room Data waiting', data);
    //     if (data.status) {
    //       this.setState({ roomUsers: data.data });
    //       setTimeout(() => {
    //         this.setUsers(this.state.defaultUsers);
    //         this.setUsersPositions(this.state.usersList, this.state.positions, this.state.loginUserIndex);
    //         this.cardDistributionAnimation(this.state.usersList,this.state.cardPack,this.state.perUserCard);
    //         this.cardDistribution(this.state.usersList,this.state.cardPack,this.state.perUserCard);
    //         //this.setAssignedCardPosition(this.state.usersList);
    //       });
    //     }
    //   });
    // } else {
    //   console.log("not valid user")
    // }
    console.log("endpoint", socket)
    console.log("this.props.match.params.users ==>", this.props)
    await this.getLoginUser()
    await this.setState({ defaultUsers: this.props.match.params.users ? this.props.match.params.users : 6  });
    await this.setState({ cardPack: this.cards });
    await this.getUserPositions(this.state.defaultUsers);
    await this.setTimer();
    await this.setUsers(this.state.defaultUsers);
    await this.getCurrentUserIndex (this.state.usersList)
    await this.setUsersPositions(this.state.usersList, this.state.positions, this.state.loginUserIndex);
    await this.suffleCards(this.state.cardPack);
    await this.setCardOnDesk(this.state.cardPack);
    await this.cardDistributionAnimation(this.state.usersList,this.state.cardPack,this.state.perUserCard);
    await this.cardDistribution(this.state.usersList,this.state.cardPack,this.state.perUserCard);
    await this.setAssignedCardPosition(this.state.usersList);
    console.log(this.state);


    

    let card = {
      key: "9",
      title: "9 ♠",
      color: "black",
      image: "black_9.png",
      cardValue: 9,
      pointValue: 9,
    };
    let cardArray = [
      {
        key: "5",
        title: "5 ♥",
        color: "red",
        image: "heart_5.png",
        cardValue: 5,
        pointValue: 5,
      },
      {
        key: "5",
        title: "5 ♥",
        color: "red",
        image: "heart_5.png",
        cardValue: 5,
        pointValue: 5,
      },
    ];
    console.log("immidiate win", gameLogic.immediateWin(card, cardArray));
  }

  async componentDidCatch() {

  }

  async componentWillUnmount() {

    await socket.disconnect();
  }

  async componentDidUpdate() {

  }

  changeDirection = (card) => {

  };

  getLoginUser = () => {
    var senddata ={
      email: 'tom123@yopmail.com',
      password: 'test123'
    }

    socket.emit("LOGIN_SEND", senddata , (data) => {
      socket.on("LOGIN_RESPONSE",(data) => {
        console.log("data 123555==>>", data)
      })
    });
    
  }

  setAssignedCardPosition = (usersListArray) => {
    console.log("usersListArray setAssignedCardPosition", usersListArray) 
    for (let i = 0; i < usersListArray.length; i++) {
      for (let j = 0; j < usersListArray[i].cards.length; j++) {
        let cardId = "user_"+ i + "_card_" + j + "_" + usersListArray.length;
        let opeCardClass = "opencard_"+j;
        let closeCardClass = "closecard_"+j;
        if (usersListArray[i].currentUser === "you" ) {
          document.getElementById(cardId).classList.add(opeCardClass);
        } else {
          document.getElementById(cardId).classList.add(closeCardClass);
        }
      }
    }
  }

  cardDistributionAnimation = (usersListArray, cardArray, perUserCard) => {
    console.log("usersListArray cardDistributionAnimation ==>", usersListArray);
    let cardLength = cardArray.length - 1;
    let card_i = 0;
    let delayTime = 0;
    //let cal = 0;
    let timeOutValue =  ((1000 * (usersListArray.length * perUserCard ))/2)+500;
    for (let i = 0; i < usersListArray.length * perUserCard ; i++) {
      let cardId = "card_"+cardLength;
      delayTime += 0.5;
      if (cardLength > 0){
        document.getElementById(cardId).setAttribute("style","animation-name: card_"+i+"_"+usersListArray.length+";animation-duration: 2s;animation-timing-function: ease;animation-fill-mode: both;animation-delay:"+delayTime+"s;z-index:"+cardLength)
      }
      if(card_i === this.state.loginUserIndex){
        //let left = cal*5;
        setTimeout(()=>{
          document.getElementById(cardId).classList.add("opened");
        },delayTime*1080);
        setTimeout(()=>{
         // document.getElementById(cardId).style.left=left +"px";
          //document.getElementById(cardId).classList.add("opened");
        },timeOutValue);
        //cal++;
      }
      cardLength--;
      card_i++;
      if (card_i === usersListArray.length) {
        card_i = 0;
      }
    }
  }

  cardDistribution = (usersListArray, cardArray, perUserCard) => {
    console.log("usersListArray cardDistribution ==>", usersListArray)
    console.log("cardArray cardDistribution ==>", cardArray)
    console.log("perUserCard cardDistribution ==>", perUserCard);
    let usersListValues = usersListArray;
    let timeOutValue =  ((1000 * (usersListValues.length * perUserCard ))/2)+800;
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        let cardLength = cardArray.length - 1;
        let cardArrayList = cardArray;
        let card_i = 0;
        for (let i = 0; i < usersListValues.length * perUserCard ; i++) {
            if (cardLength > 0){
              usersListValues[card_i].cards.push(cardArrayList[cardLength])
              cardArrayList.splice(cardLength, 1);
            }
            cardLength--;
            card_i++;
            if (card_i === usersListValues.length) {
              card_i = 0;
            }
        }
        this.setState({cardPack : cardArrayList, usersList: usersListValues })
        resolve(usersListValues);
      },timeOutValue);
    });
  }

  setCardOnDesk = (cardArray) => {
    let cardArrayList = cardArray;
    for (let i = 0; i < cardArrayList.length; i++) {
      let cardId = 'card_' + i;
      document.getElementById(cardId).style.zIndex = i;
      cardArrayList[i].style = { 'z-index': i };
      cardArrayList[i].cardId = i;
    }
    this.setState({cardPack : cardArrayList})
  } 

  suffleCards = (cardArray) => {
    let shuffled = cardArray
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    this.setState({ cardPack: shuffled });
  }

  setUsers = (users) => {
    let roomUser = this.state.roomUsers;
    console.log("roomUser==>", roomUser);
    let count = parseInt(users);
    let userArray = []
    // for (let index = 0; index < count; index++) {
    //   userArray[index] = {
    //     "user_id":roomUser && roomUser[index] && !!roomUser[index].user_id ? roomUser[index].user_id : null,
    //     "name": roomUser && roomUser[index] && !!roomUser[index].name ? roomUser[index].name : null ,
    //     "image_url": roomUser && roomUser[index] && !!roomUser[index].user_image ? roomUser[index].user_image : null,
    //     "currentUser": roomUser && roomUser[index] && !!roomUser[index].user_id ? ((roomUser[index].user_id === this.props.loginUser.user_id) ? 'you' : 'notyou'): "notyou",
    //     "style": {
    //       "animationDuration": "2s",
    //       "opacity": 1,
    //       "animationTimingFunction": "ease",
    //       "animationFillMode": "both"
    //     },
    //     "cards": []
    //   }
    // }
    for (let index = 0; index < count; index++) {
      userArray[index] = {
        "name": "Poker " + (index + 1),
        "image_url": "/images/user_img" + index + ".png",
        "currentUser": index === this.state.loginUserIndex ? "you" : "notyou",
        "style": {
          "animationDuration": "2s",
          "opacity": 1,
          "animationTimingFunction": "ease",
          "animationFillMode": "both"
        },
        "cards": []
      }
    }
    console.log("userArray ==>", userArray);
    this.setState({ usersList: userArray })
  }

  getCurrentUserIndex = (userListArray) => {
    let currentUserIndex = userListArray.findIndex( x => x.currentUser === 'you')
    this.setState({loginUserIndex:(currentUserIndex === -1) ? 0: currentUserIndex})
  }

  setUsersPositions = (userListArray, positionArray, currentUserIndex) => {
    for (let i = 0; i < userListArray.length; i++) {
      let userId = "poker_" + currentUserIndex;
      document.getElementById(userId).style.left = positionArray[i].left;
      document.getElementById(userId).style.top = positionArray[i].top;
      currentUserIndex++;
      if (currentUserIndex === userListArray.length) {
        currentUserIndex = 0;
      }
    }
  }

  getUserPositions = (users) => {
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
        console.log("call default")
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
    console.log("countdown", countdown);
    let timerId = setInterval(() => {
      //console.log("In SetInterval Time", countdown);
      countdown += 1000;
      //console.log("countdown", countdown);
      //console.log("-------------------------------------------");
      var min = Math.floor(countdown / (60 * 1000));
      // //var sec = Math.floor(countdown - (min * 60 * 1000));  // wrong
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
      if (countdown >= (5 * 60 * 1000)) {
        //alert("5 min!");
        clearInterval(timerId);
        // this.setTimer();
        this.setState({ showTime: "05 : 00" });
        //doSomething();
      } else {
        //$("#countTime").html(min + " : " + sec);
        //this.setTimer();
        this.setState({ showTime: ("0" + min) + " : " + (sec < 10 ? "0" + sec : sec) });
      }
    }, 1000);
  }

  openCard = (card, itemIndex, userIndex) => {
    /*console.log("==========================================");
    console.log(card);
    console.log("------------------------------------------");
    console.log(itemIndex);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(userIndex);*/
    var element = document.getElementById("user_" + userIndex + "_card_" + itemIndex +'_'+ this.state.defaultUsers);
    let splitData = element.classList.value.split(" ");
    console.log("splitData ==>", splitData)
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
    //element.toggleClass('open');
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
            <div className="btn_close" onClick={(e) => gameLogic.onClose(e)}>
              <img src="/images/close.png" alt="image3" />
            </div>
          </div>
        </div>
        <div className="circle_part" >
          {/*<div className="patti_open_part">
            <img className="patti_open_1" src="/images/middel_card1.png" alt="image4" />
            <img className="patti_open_2" src="/images/middel_card2.png" alt="image5" />
          </div>*/}
          <div className="patti_bundle_part" >
            {/*<img className="patti_img" src="/images/card_frame.png" /> */}
            {
              this.state.cardPack.length > 0 && this.state.cardPack.map((card, index) => {
                return (
                  <div key={"card_pack_" + index} className={card.color === 'red' ? 'card red' : 'card'} id={"card_" + index}>
                    <span data-value={card.key} data-title={card.title}>
                      <img src={"/images/" + card.image} alt={card.image} style={{"height":"80px"}} />
                    </span>
                  </div>
                )
              }
              )
            }
          </div>
          {
            this.state.usersList.length > 0 && this.state.usersList.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="user_part" id={"poker_" + index} style={user.style}>
                    <div className={user.currentUser === "you" ? "user_box user_yellow" : "user_box user_grey"}>
                      <img src={user.image_url} alt={"user_image_" + index} /> <span className="text">{user.name}</span>
                    </div>
                    <div className="patti_top_part">
                      {
                        user.cards.length > 0 && user.cards.map((card, cardindex) => {
                          return (
                            <React.Fragment key={"card_" + index + "_key_" + cardindex}>
                              <div style={{ "opacity": 1 }} onClick={user.currentUser === "you" ? () => this.openCard(card, cardindex, index) : null} className={card.color === 'red' ? `card red ${user.currentUser === "you" ? "open opened card_" + cardindex : null}` : `${user.currentUser === "you" ? 'card open opened card_' + cardindex : 'card'}`} id={"user_" + index + "_card_" + cardindex + '_'+ this.state.usersList.length} >
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
              <div className="btn_react btn_last_card">Last card</div>
            </div>
            <div className="row btn_right">
              <div className="btn_react btn_instant_win">Instant win</div>
            </div>
          </div>
        </div>
        <div className="add_bottom_part">
          <img src="/images/ad.png" alt="ad" />
        </div>
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
export default connect(mapStateToProps, {getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse })(Gameviewtest)
//export default Gameviewtest;
