import { Direction } from "../Components/Constant";

export default class GameLogic {
  static instance = null;

  static getInstance() {
    if (GameLogic.instance == null) {
      GameLogic.instance = new GameLogic();
    }
    return this.instance;
  }

  checkMatchCard(card1, card2) {
    let status = false;
    if (card2.key === "2") {
      if (card1.key === card2.key) {
        status = true;
      }
    } else {
      if (card1.shape === card2.shape) {
        status = true;
      } else if (card1.key === card2.key) {
        status = true;
      }
    }
    return status;
  }

  getGameDirection(card, isFirstCard) {
    if (isFirstCard === true) {
      if (card.color === "black") {
        return Direction.anticlosewise;
      } else {
        return Direction.clockwise;
      }
    } else {
      if (card.key === 8) {
        if (card.color === "black") {
          return Direction.anticlosewise;
        } else {
          return Direction.clockwise;
        }
      }
    }
  }

  immediateWin(card, cardArray) {
    let containCard = cardArray.filter((item) => {
      return item.cardValue < 9;
    });
    if (containCard.length === cardArray.length) {
      let count = 0;
      for (let i = 0; i < containCard.length; i++) {
        count += containCard[i].cardValue;
      }
      if (count === card.cardValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  onClose = (event, type) => {
    var obj = {
      action: 'closebutton',
      screen: type
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }

  onReact = (event) => {
    var obj = {
      action: 'reactbutton'
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }

  closeGame(userId) {
    var obj = {
      action: 'closegame',
      userId: userId
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }

  onUserWinGame = (activeUser, room_unique_id) => {
    var obj = {
      action: 'winner',
      room_unique_id: room_unique_id,
      user: activeUser
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }

  onInstantWin(action) {
    var obj = {
      action: action
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }
}
