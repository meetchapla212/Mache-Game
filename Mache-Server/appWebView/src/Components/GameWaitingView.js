import React from 'react';
import { Direction, gameLogic } from "./Constant";
import { Config } from '../Config';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse } from '../actions/roomActions'
const socket = socketIOClient(Config.ENDPOINT);
const url = Config.apiUrl;
let header = {
  'Access-Control-Allow-Origin': "*",
  'Content-Type': "application/json",
  'api_key': Config.api_key
}


class GameWaitingView extends React.Component {

  state = {
    timer: (1 * 60 * 1000),
    showTime: '01:00',
    defaultUsers: 6,
    positions: [],
    usersList: [],
    gameDirection: Direction.clockwise,
    loginUserDetail: {},
    roomUsers: [],
  }

  async componentDidMount() {

    await this.getLoginUserDetail(this.props.match.params);
    await this.props.getLoginUserDetails(this.props.match.params.token);
    await this.getUserPositions(this.state.defaultUsers);
    this.getCurrentUserIndex(this.state.usersList)
    let room_unique_id = this.props.match.params.room_id;
    let user_ID = !!this.state.loginUserDetail ? this.state.loginUserDetail.user_id : null;
    const screen = 'waiting';
    if (user_ID) {
      socket.emit('GETROOMMEMBERWEBVIEW_SEND', room_unique_id, user_ID, screen);
      await new Promise(resolve => {
        socket.on('GETROOMMEMBERWEBVIEW_RESPONSE', async (data) => {
          if (data.roomDelete === false) {
            if (data.status) {
              this.setState({ roomUsers: data.data });
              setTimeout(async () => {
                await this.setUsers(this.state.defaultUsers);
                this.setUsersPositions(this.state.usersList, this.state.positions, this.state.loginUserIndex);
              }, 2000);
            }
          } else {
            gameLogic.closeGame(this.state.loginUserDetail.user_id);
          }
          resolve(data);
        });
      });
    } else {
      console.log("not valid user")
    }
    this.setTimer();

    socket.on('GAME_START_RESPONSE', res => {
      console.log("res ===>", res)
      let roomUserList = this.state.roomUsers;
      let room_unique_id = res.room_id;
      let user_ID = !!this.state.loginUserDetail ? this.state.loginUserDetail.user_id : null;
      this.props.history.push(`/${roomUserList.length}`, { user_id: user_ID, room_unique_id: room_unique_id });

    });

    socket.on('LEAVEROOM_RESPONSE', res => {
      if (res.status) {
        socket.emit('GETROOMMEMBERWEBVIEW_SEND', room_unique_id, user_ID);
      }
    });
    console.log(this.state)
  }

  async componentDidCatch() {
    console.log("call catch");
  }

  async componentWillUnmount() {
    await socket.disconnect();
  }

  async componentDidUpdate() {
  }

  getRoomMembers = () => {
    let room_unique_id = this.props.match.params.room_id;
    let user_ID = !!this.state.loginUserDetail ? this.state.loginUserDetail.user_id : null;
    this.props.getRoomMemberWebViewSend(room_unique_id, user_ID);
    this.props.getRoomMemberWebViewResponse();
  }

  getLoginUserDetail = (params) => {
    return new Promise((resolve, reject) => {
      header.Authorization = `Bearer ${params.token}`;
      fetch(url + "profile", {
        "method": "GET",
        "headers": header
      })
        .then(response => response.json())
        .then(response => {
          console.log(JSON.stringify(response.data))
          this.setState({ loginUserDetail: response.data });
          resolve(response.status);
        },
          (error) => {
            alert(error);
          })
    })
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
      this.setState({ usersList: userArray })
      resolve(userArray);
    });
  }

  getCurrentUserIndex = (userListArray) => {
    let currentUserIndex = userListArray.findIndex(x => x.currentUser === 'you')
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
          left: '38%',
          top: '104%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 2:
        positionsValue = [{
          left: '38%',
          top: '104%',
        }, {
          left: '38%',
          top: '-32%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 3:
        positionsValue = [{
          left: '38%',
          top: '104%',
        }, {
          left: '-5%',
          top: '40%',
        },
        {
          left: '38%',
          top: '-32%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 4:
        positionsValue = [{
          left: '38%',
          top: '104%',
        }, {
          left: '-5%',
          top: '40%',
        },
        {
          left: '38%',
          top: '-32%',

        }, {
          left: '82%',
          top: '40%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 5:
        positionsValue = [{
          left: '38%',
          top: '104%',
        }, {
          left: '-5%',
          top: '62%',
        },
        {
          left: '-5%',
          top: '5%',
        },
        {
          left: '82%',
          top: '4%',

        }, {
          left: '82%',
          top: '62%',
        }]
        this.setState({ positions: positionsValue });
        break;
      case 6:
        positionsValue = [{
          left: '38%',
          top: '104%',
        }, {
          left: '-5%',
          top: '62%',
        },
        {
          left: '-5%',
          top: '5%',
        },
        {
          left: '38%',
          top: '-32%',
        },
        {
          left: '82%',
          top: '4%',

        }, {
          left: '82%',
          top: '62%',
        }]
        this.setState({ positions: positionsValue });
        break;
      default:
        console.log("call default")
        positionsValue = [{
          left: '38%',
          top: '104%',
        }]
        this.setState({ positions: positionsValue });
        break;
    }
  }

  checkJoinedUser = (countdown) => {
    let roomUserList = this.state.roomUsers;
    let room_unique_id = this.props.match.params.room_id;
    if (countdown === 0 && roomUserList.length >= 2) {
      socket.emit('GAME_START_SEND', room_unique_id);
    } else if (roomUserList.length === 6 && countdown <= (45 * 1000)) {
      socket.emit('GAME_START_SEND', room_unique_id);
    } else {
      this.setTimer();
    }
  }

  setTimer = () => {
    let countdown = this.state.timer;
    let roomUserList = this.state.roomUsers;
    let timerId = setInterval(() => {
      //console.log("countdown ==>", countdown);
      countdown -= 1000;
      var min = Math.floor(countdown / (60 * 1000));
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
      if (countdown <= 0) {
        clearInterval(timerId);
        this.setState({ showTime: "01 : 00" });
        this.checkJoinedUser(countdown);
        //this.setTimer();
      } else {
        //this.checkJoinedUser(countdown);
        if (roomUserList.length === 6 && countdown <= (45 * 1000)) {
          clearInterval(timerId);
          this.checkJoinedUser(countdown);
        }
        this.setState({ showTime: ("0" + min) + " : " + (sec < 10 ? "0" + sec : sec) });
      }
    }, 1000);
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
          </div>
          <div className="right_part right_button_part">
            <div className="btn_volume">
              <img src="/images/volume-mute.png" alt="image2" />
            </div>
            <div className="btn_close" onClick={(e) => gameLogic.onClose(e, 'waiting')}>
              <img src="/images/close.png" alt="image3" />
            </div>
          </div>
        </div>
        <div className="waiting_circle_part" >
          {
            this.state.usersList.length > 0 && this.state.usersList.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="waiting_user_part" id={"poker_" + index} style={user.style}>
                    <div className="waiting_user_box">
                      {user.image_url && <img className="waiting_user_userimage" src={user.image_url} alt={"user_image_" + index} />}
                      {!user.image_url && <img className="waiting_user_waitingimage" src="/images/waitinguser.gif" alt={"user_image_waiting"} />}
                    </div>
                    <div className="waiting_username">
                      {user.name && <span className="text">{user.name}</span>}
                      {!user.name && <span className="text">Waiting...</span>}
                    </div>
                  </div>
                </React.Fragment>
              )
            })
          }
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

export default connect(mapStateToProps, { getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse })(GameWaitingView)