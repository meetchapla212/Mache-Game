import React, { useState, useEffect } from 'react';
import Emoji from 'a11y-react-emoji';

const Gameview = (props) => {
  const [timer, setTimer] = useState(5 * 60 * 1000);
  const [showTime, setShowTime] = useState('05 : 00');

  // eslint-disable-next-line
  const [usersList, setUsersList] = useState([
    {
      "name": "Poker 1",
      "image_url": "/images/user_img0.png",
      "cards": [{
        "key": 'A', "title": 'A ♣', "color": 'black', "image": 'flower_1.png'
      }, {
        "key": '7', "title": '7 ♦', "color": 'red', "image": 'diamond_7.png'
      }, {
        "key": '3', "title": '3 ♠', "color": 'black', "image": 'black_3.png'
      }
      ],
      "currentUser": "notyou"
    },
    {
      "name": "Poker 2",
      "image_url": "/images/user_img1.png",
      "cards": [{
        "key": 'A', "title": 'A ♦', "color": 'red', "image": 'diamond_1.png'
      }, {
        "key": '3', "title": '3 ♦', "color": 'red', "image": 'diamond_3.png'
      }, {
        "key": '7', "title": '7 ♠', "color": 'black', "image": 'black_7.png'
      }
      ],
      "currentUser": "notyou"
    },
    {
      "name": "Poker 3",
      "image_url": "/images/user_img2.png",
      "cards": [{
        "key": 'Q', "title": 'Q ♣', "color": 'black', "image": 'flower_12.png'
      }, {
        "key": '4', "title": '4 ♦', "color": 'red', "image": 'diamond_4.png'
      }, {
        "key": '9', "title": '9 ♠', "color": 'black', "image": 'black_9.png'
      }
      ],
      "currentUser": "notyou"
    },
    {
      "name": "Poker 4",
      "image_url": "/images/user_img3.png",
      "cards": [{
        "key": 'J', "title": 'J ♣', "color": 'black', "image": 'flower_11.png'
      }, {
        "key": '2', "title": '2 ♦', "color": 'red', "image": 'diamond_2.png'
      }, {
        "key": '6', "title": '6 ♠', "color": 'black', "image": 'black_6.png'
      }
      ],
      "currentUser": "you"
    },
    {
      "name": "Poker 5",
      "image_url": "/images/user_img3.png",
      "cards": [{
        "key": 'K', "title": 'K ♣', "color": 'black', "image": 'flower_13.png'
      }, {
        "key": '3', "title": '3 ♦', "color": 'red', "image": 'diamond_3.png'
      }, {
        "key": '8', "title": '8 ♠', "color": 'black', "image": 'flower_1.png'
      }
      ],
      "currentUser": "notyou"
    },
    {
      "name": "Poker 6",
      "image_url": "/images/user_img3.png",
      "cards": [{
        "key": 'K', "title": 'K ♣', "color": 'black', "image": 'flower_13.png'
      }, {
        "key": '5', "title": '5 ♦', "color": 'red', "image": 'diamond_5.png'
      }, {
        "key": '8', "title": '8 ♠', "color": 'black', "image": 'black_8.png'
      }
      ],
      "currentUser": "notyou"
    },
  ]);
  // eslint-disable-next-line
  const [cardPack, setCardPackLists] = useState([
    { "key": 'A', "title": 'A ♣', "color": 'black', "image": 'flower_1.png' },
    { "key": '2', "title": '2 ♣', "color": 'black', "image": 'flower_2.png' },
    { "key": '3', "title": '3 ♣', "color": 'black', "image": 'flower_3.png' },
    { "key": '4', "title": '4 ♣', "color": 'black', "image": 'flower_4.png' },
    { "key": '5', "title": '5 ♣', "color": 'black', "image": 'flower_5.png' },
    { "key": '6', "title": '6 ♣', "color": 'black', "image": 'flower_6.png' },
    { "key": '7', "title": '7 ♣', "color": 'black', "image": 'flower_7.png' },
    { "key": '8', "title": '8 ♣', "color": 'black', "image": 'flower_8.png' },
    { "key": '9', "title": '9 ♣', "color": 'black', "image": 'flower_9.png' },
    { "key": '10', "title": '10 ♣', "color": 'black', "image": 'flower_10.png' },
    { "key": 'J', "title": 'J ♣', "color": 'black', "image": 'flower_11.png' },
    { "key": 'Q', "title": 'Q ♣', "color": 'black', "image": 'flower_12.png' },
    { "key": 'K', "title": 'K ♣', "color": 'black', "image": 'flower_13.png' },
    { "key": 'A', "title": 'A ♦', "color": 'red', "image": 'diamond_1.png' },
    { "key": '2', "title": '2 ♦', "color": 'red', "image": 'diamond_2.png' },
    { "key": '3', "title": '3 ♦', "color": 'red', "image": 'diamond_3.png' },
    { "key": '4', "title": '4 ♦', "color": 'red', "image": 'diamond_4.png' },
    { "key": '5', "title": '5 ♦', "color": 'red', "image": 'diamond_5.png' },
    { "key": '6', "title": '6 ♦', "color": 'red', "image": 'diamond_6.png' },
    { "key": '7', "title": '7 ♦', "color": 'red', "image": 'diamond_7.png' },
    { "key": '8', "title": '8 ♦', "color": 'red', "image": 'diamond_8.png' },
    { "key": '9', "title": '9 ♦', "color": 'red', "image": 'diamond_9.png' },
    { "key": '10', "title": '10 ♦', "color": 'red', "image": 'diamond_10.png' },
    { "key": 'J', "title": 'J ♦', "color": 'red', "image": 'diamond_11.png' },
    { "key": 'Q', "title": 'Q ♦', "color": 'red', "image": 'diamond_12.png' },
    { "key": 'K', "title": 'K ♦', "color": 'red', "image": 'diamond_13.png' },
    { "key": 'A', "title": 'A ♥', "color": 'red', "image": 'heart_1.png' },
    { "key": '2', "title": '2 ♥', "color": 'red', "image": 'heart_2.png' },
    { "key": '3', "title": '3 ♥', "color": 'red', "image": 'heart_3.png' },
    { "key": '4', "title": '4 ♥', "color": 'red', "image": 'heart_4.png' },
    { "key": '5', "title": '5 ♥', "color": 'red', "image": 'heart_5.png' },
    { "key": '6', "title": '6 ♥', "color": 'red', "image": 'heart_6.png' },
    { "key": '7', "title": '7 ♥', "color": 'red', "image": 'heart_7.png' },
    { "key": '8', "title": '8 ♥', "color": 'red', "image": 'heart_8.png' },
    { "key": '9', "title": '9 ♥', "color": 'red', "image": 'heart_9.png' },
    { "key": '10', "title": '10 ♥', "color": 'red', "image": 'heart_10.png' },
    { "key": 'J', "title": 'J ♥', "color": 'red', "image": 'heart_11.png' },
    { "key": 'Q', "title": 'Q ♥', "color": 'red', "image": 'heart_12.png' },
    { "key": 'K', "title": 'K ♥', "color": 'red', "image": 'heart_13.png' },
    { "key": 'A', "title": 'A ♠', "color": 'black', "image": 'black_1.png' },
    { "key": '2', "title": '2 ♠', "color": 'black', "image": 'black_2.png' },
    { "key": '3', "title": '3 ♠', "color": 'black', "image": 'black_3.png' },
    { "key": '4', "title": '4 ♠', "color": 'black', "image": 'black_4.png' },
    { "key": '5', "title": '5 ♠', "color": 'black', "image": 'black_5.png' },
    { "key": '6', "title": '6 ♠', "color": 'black', "image": 'black_6.png' },
    { "key": '7', "title": '7 ♠', "color": 'black', "image": 'black_7.png' },
    { "key": '8', "title": '8 ♠', "color": 'black', "image": 'black_8.png' },
    { "key": '9', "title": '9 ♠', "color": 'black', "image": 'black_9.png' },
    { "key": '10', "title": '10 ♠', "color": 'black', "image": 'black_10.png' },
    { "key": 'J', "title": 'J ♠', "color": 'black', "image": 'black_11.png' },
    { "key": 'Q', "title": 'Q ♠', "color": 'black', "image": 'black_12.png' },
    { "key": 'K', "title": 'K ♠', "color": 'black', "image": 'black_13.png' }
  ]);

  useEffect(() => {
    if (document.getElementById('user_0')) {
     let data = document.getElementById('user_0').animate(
        [
          { transform: 'translateX(-0%)' },
          { transform: 'translateX(-50%)' },
          { opacity: 1 }
        ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both'
      });
    }

    if (document.getElementById('user_1')) {
      document.getElementById('user_1').animate(
        [
          { transform: 'translateX(50%)' },
          { transform: 'translateX(20%)' },
          { opacity: 1 }
        ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both'
      });
    }

    if (document.getElementById('user_2')) {
      document.getElementById('user_2').animate(
        [
          { transform: 'translateX(50%)' },
          { transform: 'translateX(20%)' },
          { opacity: 1 }
        ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both'
      });
    }

    if (document.getElementById('user_3')) {
      document.getElementById('user_3').animate(
        [
          { transform: 'translateX(0%)' },
          { transform: 'translateX(-50%)' },
          { opacity: 1 }
        ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both'
      });
    }

    if (document.getElementById('user_4')) {
      document.getElementById('user_4').animate(
        [
          { transform: 'translateX(30%)' },
          { transform: 'translateX(0%)' },
          { opacity: 1 }
        ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both'
      });
    }

    if (document.getElementById('user_5')) {
      document.getElementById('user_5').animate(
        [
          { transform: 'translateX(0%)' },
          { transform: 'translateX(-50%)' },
          { opacity: 1 }
        ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both'
      });
    }

  }, []);

  useEffect(() => {
    if (document.getElementById('user_0_card_0')) {
      document.getElementById('user_0_card_0').animate([
        { transform: 'translate(20%, 280%)' },
        { transform: 'translate(20%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 1000
      });
      document.getElementById('user_0_card_0').style = 'opacity: 1;';
    }

    if (document.getElementById('user_1_card_0')) {
      document.getElementById('user_1_card_0').animate([
        { transform: 'translate(-115%, 135%)' },
        { transform: 'translate(-115%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 1500
      });
    }

    if (document.getElementById('user_2_card_0')) {
      document.getElementById('user_2_card_0').animate([
        { transform: 'translate(-85%, -85%)' },
        { transform: 'translate(-85%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 2000
      });
    }

    if (document.getElementById('user_3_card_0')) {
      document.getElementById('user_3_card_0').animate([
        { transform: 'translate(-20%, -115%)' },
        { transform: 'translate(-20%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 2500
      });
    }


    if (document.getElementById('user_4_card_0')) {
      document.getElementById('user_4_card_0').animate([
        { transform: 'translate(105%, -85%)' },
        { transform: 'translate(105%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 3000
      });
    }

    if (document.getElementById('user_5_card_0')) {
      document.getElementById('user_5_card_0').animate([
        { transform: 'translate(105%, 150%)' },
        { transform: 'translate(105%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 3500
      });
    }

    if (document.getElementById('user_0_card_1')) {
      document.getElementById('user_0_card_1').animate([
        { transform: 'translate(5%, 280%)' },
        { transform: 'translate(5%, 0%)' },
        { left: '10px' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 4000
      });
      document.getElementById('user_0_card_1').style = 'left: 10px; opacity: 1;';
    }

    if (document.getElementById('user_1_card_1')) {
      document.getElementById('user_1_card_1').animate([
        { transform: 'translate(-130%, 135%)' },
        { transform: 'translate(-130%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 4500
      });
      document.getElementById('user_1_card_1').style = 'left: 10px;opacity: 1;';
    }

    if (document.getElementById('user_2_card_1')) {
      document.getElementById('user_2_card_1').animate([
        { transform: 'translate(-127%, -75%)' },
        { transform: 'translate(-127%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 5000
      });
      document.getElementById('user_2_card_1').style = 'left: 10px; opacity: 1;';
    }

    if (document.getElementById('user_3_card_1')) {
      document.getElementById('user_3_card_1').animate([
        { transform: 'translate(8%, -200%)' },
        { transform: 'translate(8%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 5500
      });
      document.getElementById('user_3_card_1').style = 'left: 10px; opacity: 1;';
    }


    if (document.getElementById('user_4_card_1')) {
      document.getElementById('user_4_card_1').animate([
        { transform: 'translate(145%, -75%)' },
        { transform: 'translate(145%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 6000
      });
      document.getElementById('user_4_card_1').style = 'left: 10px';
    }

    if (document.getElementById('user_5_card_1')) {
      document.getElementById('user_5_card_1').animate([
        { transform: 'translate(152%, 138%)' },
        { transform: 'translate(152%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 6500
      });
      document.getElementById('user_5_card_1').style = 'left: 10px';
    }


    if (document.getElementById('user_0_card_2')) {
      document.getElementById('user_0_card_2').animate([
        { transform: 'translate(0%, 275%)' },
        { transform: 'translate(0%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 7000
      });
      document.getElementById('user_0_card_2').style = 'left: 20px';
    }

    if (document.getElementById('user_1_card_2')) {
      document.getElementById('user_1_card_2').animate([
        { transform: 'translate(-137%, 135%)' },
        { transform: 'translate(-137%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 7500
      });
      document.getElementById('user_1_card_2').style = 'left: 20px';
    }

    if (document.getElementById('user_2_card_2')) {
      document.getElementById('user_2_card_2').animate([
        { transform: 'translate(-138%, -75%)' },
        { transform: 'translate(-138%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 8000
      });
      document.getElementById('user_2_card_2').style = 'left: 20px';
    }

    if (document.getElementById('user_3_card_2')) {
      document.getElementById('user_3_card_2').animate([
        { transform: 'translate(1%, -200%)' },
        { transform: 'translate(1%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 8500
      });
      document.getElementById('user_3_card_2').style = 'left: 20px';
    }


    if (document.getElementById('user_4_card_2')) {
      document.getElementById('user_4_card_2').animate([
        { transform: 'translate(133%, -75%)' },
        { transform: 'translate(133%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 9000
      });
      document.getElementById('user_4_card_2').style = 'left: 20px';
    }

    if (document.getElementById('user_5_card_2')) {
      document.getElementById('user_5_card_2').animate([
        { transform: 'translate(138%, 138%)' },
        { transform: 'translate(138%, 0%)' },
        { opacity: 1 }
      ], {
        duration: 2000,
        easing: 'ease',
        fill: 'both',
        delay: 9500
      });
      document.getElementById('user_5_card_2').style = 'left: 20px';
    }

  }, []);


  useEffect(() => {
    //console.log("In Third UseEffect Function");
    /*setTimeout(() => {
      
    }, 10000)*/
    let countdown = timer;
    let timerId = setInterval(() => {
      //console.log("In SetInterval Time", countdown);

      countdown -= 1000;
      //console.log("countdown", countdown);
      //console.log("-------------------------------------------");
      var min = Math.floor(countdown / (60 * 1000));
      //var sec = Math.floor(countdown - (min * 60 * 1000));  // wrong
      var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
      if (countdown <= 0) {
        //alert("5 min!");
        clearInterval(timerId);
        setTimer(countdown);
        setShowTime("00 : 00");
        //doSomething();
      } else {
        //$("#countTime").html(min + " : " + sec);
        setTimer(countdown);
        setShowTime(("0" + min) + " : " + (sec < 10 ? "0" + sec : sec));
      }

    }, 1000);

  }, [timer, showTime]);

  const openCard = (card, itemIndex, userIndex) => {
    /*console.log("==========================================");
    console.log(card);
    console.log("------------------------------------------");
    console.log(itemIndex);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(userIndex);*/
    var element = document.getElementById("user_" + userIndex + "_card_" + itemIndex);
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
    //element.toggleClass('open');
  }

  const onClose = (event) => {
    var obj = {
      action: 'closebutton'
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }

  const onReact = (event) => {
    var obj = {
      action: 'reactbutton'
    };
    var message = JSON.stringify(obj)
    if (window.ReactNativeWebView !== undefined) {
      window.ReactNativeWebView.postMessage(message);
    }
    console.log(message)
  }

  return (
    <div className="game_screen">
      <div className="top_part_button">
        <div className="left_button_part">
          <div className="clock-btn">
            <div className="in_spaceclock">
              <span className="icon_clock"><img src="images/time-sharp.png" alt="image1" /></span>
              {showTime}
            </div>
          </div>
          <div className="scores_btn">Scores</div>
        </div>
        <div className="right_part right_button_part">
          <div className="btn_volume">
            <img src="images/volume-mute.png" alt="image2" />
          </div>
          <div className="btn_close" onClick={onClose}>
            <img src="images/close.png" alt="image3" />
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
            cardPack.length > 0 && cardPack.map((card, index) => {
              return (
                <div key={"card_pack_" + index} className={card.color === 'red' ? 'card red' : 'card'} id={"card_" + index} style={{"width":"90px"}}>
                  <span data-value={card.key} data-title={card.title}></span>
                </div>
              )
            }
            )
          }
        </div>
        {
          usersList.length > 0 && usersList.map((user, index) => {
            return (
              <React.Fragment key={index}>
                <div className="user_part" id={"user_" + index}>
                  <div className={user.currentUser === "you" ? "user_box user_yellow" : "user_box user_grey"}>
                    <img src={user.image_url} alt={"user_image_" + index} /> <span className="text">{user.name}</span>
                  </div>
                  <div className="patti_top_part">
                    {
                      user.cards.length > 0 && user.cards.map((card, cardindex) => {
                        return (
                          <React.Fragment key={"card_" + index + "_key_" + cardindex}>
                            <div style={{ opacity: 0 }} onClick={user.currentUser === "you" ? () => openCard(card, cardindex, index) : null} className={card.color === 'red' ? `card red ${user.currentUser === "you" ? "open opened card_" + cardindex : null}` : `${user.currentUser === "you" ? 'card open opened card_' + cardindex : 'card'}`} id={"user_" + index + "_card_" + cardindex} >
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
            <div className="btn_react" onClick={onReact}>REACT&nbsp;  <Emoji symbol="😝" label="react" /></div>
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
        <img src="images/ad.png" alt="ad" />
      </div>
    </div>
  );
}

export default Gameview;
