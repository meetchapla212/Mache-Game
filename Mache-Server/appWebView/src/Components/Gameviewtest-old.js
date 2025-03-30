import React, { useState, useEffect, useRef } from 'react';
import Emoji from 'a11y-react-emoji';

const Gameviewtest = (props) => {
  const [timer, setTimer] = useState(5 * 60 * 1000);
  const [showTime, setShowTime] = useState('05 : 00');
  const itemsRef = useRef([]);

  let cardList = [
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
  ];

  const suffleCards = (cardArray) =>{
    let shuffled = cardArray
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    return shuffled;
  }

  // eslint-disable-next-line
  const [cardPack, setCardPackLists] = useState(suffleCards(cardList));

  
  // set number of pocker
  const [poker,setPoker]= useState(6);

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
      },
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

  // set central card z-index
  useEffect(() => {
    cardPack.map((card,index) => {
      let idName = "card_"+index;
      document.getElementById(idName).style.zIndex = index;
    })
    let users = [];
    for (let index = 0; index < poker; index++) {
      users[index] = {
        "name": "Poker "+ (index+1),
        "image_url": "/images/user_img"+index+".png",
        "currentUser": index === 3 ? "you": "notyou",
      }
      users[index].cards = []
      let cardLength =  cardPack.length;
      for (let i = 0; i < 5; i++) {
        for (let j = cardLength - 1; j > cardLength - 6; j--) {
          console.log("j ==>", j);
          users[index].cards[i] = cardPack[j];
        }
        cardLength =  cardLength - 5; 
      }
    }
    console.log("users ==>", users)
    setUsersList(users);
  },[cardPack,usersList])

  //set poker detail
  // useEffect(() => {
  //   let users = [];
  //   for (let index = 0; index < poker; index++) {
  //     users[index] = {
  //       "name": "Poker "+ (index+1),
  //       "image_url": "/images/user_img"+index+".png",
  //       "currentUser": index === 3 ? "you": "notyou",
  //     }
  //   }
  //   setUsersList(users);
  // }, [usersList]); 

  // set card ref
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, usersList.length);
  }, [usersList]);

  
  useEffect(() => {
    itemsRef.current.map((userDiv, index) => {
      if (userDiv.id === 'user_0') {
        userDiv.setAttribute("style","animation-name: user_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both;")
        
      }
      if (userDiv.id === 'user_1') {
        userDiv.setAttribute("style","animation-name: user_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both;")
        
      }
      if (userDiv.id === 'user_2') {
        userDiv.setAttribute("style","animation-name: user_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both;")
        
      }
      if (userDiv.id === 'user_3') {
        userDiv.setAttribute("style","animation-name: user_3;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both;")
        
      }
      if (userDiv.id === 'user_4') {
        userDiv.setAttribute("style","animation-name: user_4;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both;")
        
      }
      if (userDiv.id === 'user_5') {
        userDiv.setAttribute("style","animation-name: user_5;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both;")
        
      }
    })
  }, []);

  

  

  useEffect(() => {
    if (document.getElementById('user_0_card_0')) {
      document.getElementById('user_0_card_0').setAttribute("style","animation-name: user_0_card_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 1s;")
    }

    if (document.getElementById('user_1_card_0')) {
      document.getElementById('user_1_card_0').setAttribute("style","animation-name: user_1_card_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 1.5s;")
    }

    if (document.getElementById('user_2_card_0')) {
      document.getElementById('user_2_card_0').setAttribute("style","animation-name: user_2_card_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 2s;")
    }

    if (document.getElementById('user_3_card_0')) {
      document.getElementById('user_3_card_0').setAttribute("style","animation-name: user_3_card_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 2.5s;")
    }


    if (document.getElementById('user_4_card_0')) {
      document.getElementById('user_4_card_0').setAttribute("style","animation-name: user_4_card_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 3s;")
    }

    if (document.getElementById('user_5_card_0')) {
      document.getElementById('user_5_card_0').setAttribute("style","animation-name: user_5_card_0;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 3.5s;")
    }

    if (document.getElementById('user_0_card_1')) {
      document.getElementById('user_0_card_1').setAttribute("style","animation-name: user_0_card_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 4s;left: 10px;")
    }

    if (document.getElementById('user_1_card_1')) {
      document.getElementById('user_1_card_1').setAttribute("style","animation-name: user_1_card_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 4.5s;left: 10px;")
    }

    if (document.getElementById('user_2_card_1')) {
      document.getElementById('user_2_card_1').setAttribute("style","animation-name: user_2_card_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 5s;left: 10px;")
    }

    if (document.getElementById('user_3_card_1')) {
      document.getElementById('user_3_card_1').setAttribute("style","animation-name: user_3_card_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 5.5s;left: 10px;")
    }

    if (document.getElementById('user_4_card_1')) {
      document.getElementById('user_4_card_1').setAttribute("style","animation-name: user_4_card_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 6s;left: 10px;")
    }

    if (document.getElementById('user_5_card_1')) {
      document.getElementById('user_5_card_1').setAttribute("style","animation-name: user_5_card_1;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 6.5s;left: 10px;")
    }


    if (document.getElementById('user_0_card_2')) {
      document.getElementById('user_0_card_2').setAttribute("style","animation-name: user_0_card_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 7s;left: 20px;")
    }

    if (document.getElementById('user_1_card_2')) {
      document.getElementById('user_1_card_2').setAttribute("style","animation-name: user_1_card_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 7.5s;left: 20px;")
    }

    if (document.getElementById('user_2_card_2')) {
      document.getElementById('user_2_card_2').setAttribute("style","animation-name: user_2_card_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 8s;left: 20px;")
    }

    if (document.getElementById('user_3_card_2')) {
      document.getElementById('user_3_card_2').setAttribute("style","animation-name: user_3_card_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 8.5s;left: 20px;")
    }

    if (document.getElementById('user_4_card_2')) {
      document.getElementById('user_4_card_2').setAttribute("style","animation-name: user_4_card_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 9s;left: 20px;")
    }

    if (document.getElementById('user_5_card_2')) {
      document.getElementById('user_5_card_2').setAttribute("style","animation-name: user_5_card_2;animation-duration: 2s;opacity:1;animation-timing-function: ease;animation-fill-mode: both; animation-delay: 9.5s;left: 20px;")
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
                <div key={"card_pack_" + index} className={card.color === 'red' ? 'card red' : 'card'} id={"card_" + index}>
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
                <div className="user_part" id={"user_" + index} ref={el => itemsRef.current[index] = el} >
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

export default Gameviewtest;
