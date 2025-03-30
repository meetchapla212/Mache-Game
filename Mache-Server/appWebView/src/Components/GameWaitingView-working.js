import React from 'react';
import { Direction, gameLogic } from "./Constant";
import { Config } from '../Config';
import socketIOClient from "socket.io-client";
import {userApiService } from '../services/userApiService';
import { connect } from 'react-redux';
import { getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse } from '../actions/roomActions'
const socket = socketIOClient(Config.ENDPOINT);


class GameWaitingView extends React.Component {

  state = {
    timer: 0,
    showTime: '00:00',
    defaultUsers: 6,
    positions: [],
    usersList: [],
    gameDirection: Direction.clockwise,
    loginUserDetail:{},
    roomUsers:[],
  }

  async componentDidMount() {
    
    await this.setTimer();
    await this.getLoginUserDetail(this.props.match.params);
    //await this.getRoomMembers();
    await this.props.getLoginUserDetails(this.props.match.params.token);
    await this.getUserPositions(this.state.defaultUsers);
    await this.setUsers(this.state.defaultUsers);
    await this.getCurrentUserIndex (this.state.usersList)
    await this.setUsersPositions(this.state.usersList, this.state.positions, this.state.loginUserIndex);
    let room_unique_id = this.props.match.params.room_id;
    let user_ID = !!this.state.loginUserDetail ?  this.state.loginUserDetail.user_id : null;
    if (user_ID) {
      socket.emit('GETROOMMEMBERWEBVIEW_SEND',room_unique_id, user_ID);
      socket.on('GETROOMMEMBERWEBVIEW_RESPONSE', data => {
        console.log('In Room Data waiting', data);
        if (data.status) {
          this.setState({ roomUsers: data.data });
          setTimeout(() => {
            this.setUsers(this.state.defaultUsers);
            this.setUsersPositions(this.state.usersList, this.state.positions, this.state.loginUserIndex);
          }, 500);
        }
      });
    } else {
      console.log("not valid user")
    }
    console.log(this.state)
  }

  async componentDidCatch() {
    console.log("call catche");
  }

  async componentWillUnmount() {
    await socket.disconnect();
  }

  async componentDidUpdate() {
    console.log("call update");
    //console.log("login==>", this.props.loginUser)
  }

  getRoomMembers = () => {
    let room_unique_id = this.props.match.params.room_id;
    let user_ID = !!this.state.loginUserDetail ?  this.state.loginUserDetail.user_id : null;
    this.props.getRoomMemberWebViewSend(room_unique_id, user_ID);
    this.props.getRoomMemberWebViewResponse();
    // let room_unique_id = params.room_id;
    // socket.emit('GETROOMMEMBER_SEND',room_unique_id);
    // socket.on('GETROOMMEMBER_RESPONSE', data => {
    //   console.log('In Room Data', data);
    //   if (data.status) {
    //     return this.setState({ roomUsers: data.data })
    //   }
    // });
  }

  getLoginUserDetail = (params) => {
    return userApiService.getLoginUserDetail(params).then(response =>{
      this.setState({loginUserDetail: response.data});
    })
  }
  
  setUsers = (users) => {
      let roomUser = this.state.roomUsers;
      let count = parseInt(users);
      let userArray = []
      for (let index = 0; index < count; index++) {
        userArray[index] = {
          "user_id":roomUser && roomUser[index] && !!roomUser[index].user_id ? roomUser[index].user_id : null,
          "name": roomUser && roomUser[index] && !!roomUser[index].name ? roomUser[index].name : null ,
          "image_url": roomUser && roomUser[index] && !!roomUser[index].user_image ? roomUser[index].user_image : null,
          "currentUser": roomUser && roomUser[index] && !!roomUser[index].user_id ? ((roomUser[index].user_id === this.props.loginUser.user_id) ? 'you' : 'notyou'): null
        }
      }
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
    let roomUserList =  this.state.roomUsers;
    let room_unique_id = this.props.match.params.room_id;
    let user_ID = !!this.state.loginUserDetail ?  this.state.loginUserDetail.user_id : null;
    if (countdown ===  (59 * 1000) && roomUserList.length >= 2 ) {
      this.props.history.push(`/${roomUserList.length}`, { user_id: user_ID, room_unique_id: room_unique_id });
    }
  }

  setTimer = () => {
    let countdown = this.state.timer;
    let timerId = setInterval(() => {
      countdown += 1000;
      var min = Math.floor(countdown / (60 * 1000));
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
      if (countdown >= (1 * 60 * 1000)) {
        //alert("3 min!");
        clearInterval(timerId);
        this.setState({ showTime: "03 : 00" });
        this.setTimer();
      } else {
        this.checkJoinedUser(countdown);
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
            {/* <div className="scores_btn">Scores</div> */}
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
        <div className="waiting_circle_part" >
          {
            this.state.usersList.length > 0 && this.state.usersList.map((user, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="waiting_user_part" id={"poker_" + index} style={user.style}>
                    <div className="waiting_user_box">
                    { user.image_url && <img className="waiting_user_userimage" src={user.image_url} alt={"user_image_" + index} />}
                    { !user.image_url && <img className="waiting_user_waitingimage" src="/images/waitinguser.gif" alt={"user_image_waiting"} />}
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

// const mapStateToProps = (state) => {
//   console.log("state ==>", state.rooms.loginUser)
// }

//export default GameWaitingView;
export default connect(mapStateToProps, {getLoginUserDetails, getRoomMemberWebViewSend, getRoomMemberWebViewResponse })(GameWaitingView)
