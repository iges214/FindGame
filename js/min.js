

// const list = document.querySelectorAll(".item");
// const timeTag = document.getElementById("time");
// // console.log(list)

// let itemOne = itemTwo = "";
// let matcheditem = 0;
// let Blockitem = false;
// let timeLeft = 30;
// let timer;

// const flipedItem = (e) =>{
//     let clickeditem = e.target; //getting user item clicked
    
//     if(clickeditem !== itemOne && !Blockitem){
//     clickeditem.classList.add("flipped")

//     if(!itemOne){
//      return itemOne = clickeditem; //returning the itemone value to clickeditem
//     }
//     itemTwo = clickeditem;

//     Blockitem = true;
//     let itemOneimg = itemOne.querySelector("img").src
//     let itemTwoImg = itemTwo.querySelector("img").src
//     checkItems(itemOneimg, itemTwoImg);
//     // console.log(itemOne, itemTwo)
// }}
// const checkItems = (img1, img2) =>{
//     if(img1 === img2){ //if the two image are the same
//         // console.log("image matched")
//         matcheditem++; //increment matcjhed by value 1
//         if(matcheditem === 8){
//             setTimeout (() => {
//            return shuffleItems();
//             }, 1000)
//         }
//         itemOne.removeEventListener("click", flipedItem)
//         itemTwo.removeEventListener("click", flipedItem)
//         itemOne = itemTwo = ""; //setting both item value to empty
//         return Blockitem = false;
//     }
//     //if the two image are not the same
//     setTimeout(() =>{ //adding shaleclasses to both item after 500ms
//     itemOne.classList.add("shake");
//     itemTwo.classList.add("shake")
//     }, 500)

//     setTimeout(() =>{ //removing both shake and flipped classes after 1.5s
//         itemOne.classList.remove("shake", "flipped");
//         itemTwo.classList.remove("shake", "flipped");
//         itemOne = itemTwo = ""; //setting both card value to empty
//         Blockitem = false;
//         }, 1200)
// }
// const shuffleItems = () =>{
//     matcheditem = 0;
//     itemTwo = itemTwo = "";
//     Blockitem = false;
//     // return Blockitem = false;

//     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]//array items
//     arr.sort(() => Math.random() > 0.5 ? 1 : -1); // sortiing array item randomly
   
//     list.forEach((item, i) =>{ 
//         item.classList.remove("flipped")

//         let imageTag = item.querySelector("img");
//         imageTag.src = `image/img-${arr[i]}.png`;

//         item.addEventListener("click", flipedItem)
//     })
// }

// shuffleItems();

// list.forEach(item =>{ //adding click event to all the item
//     // console.log(item)
//     // item.classList.add("flipped")
//     item.addEventListener("click", flipedItem)
// })






// const list = document.querySelectorAll(".item");
// const timeTag = document.getElementById("time");


// let itemOne = itemTwo = "";
// let matcheditem = 0;
// let Blockitem = false;
// let timeLeft = 30;
// let timer;

// // Flip card function
// const flipedItem = (e) => {
//     let clickeditem = e.target;

//     if (clickeditem !== itemOne && !Blockitem && timeLeft > 0) {
//         clickeditem.classList.add("flipped");

//         if (!itemOne) return itemOne = clickeditem;

//         itemTwo = clickeditem;
//         Blockitem = true;

//         let itemOneimg = itemOne.querySelector("img").src;
//         let itemTwoImg = itemTwo.querySelector("img").src;

//         checkItems(itemOneimg, itemTwoImg);
//     }
// };

// // Check matched cards
// const checkItems = (img1, img2) => {
//     if (img1 === img2) {
//         matcheditem++;
//         if (matcheditem === 8) {
//             clearInterval(timer);
//             setTimeout(shuffleItems, 1000);
//         }
//         itemOne.removeEventListener("click", flipedItem);
//         itemTwo.removeEventListener("click", flipedItem);
//         itemOne = itemTwo = "";
//         Blockitem = false;
//     } else {
//         setTimeout(() => {
//             itemOne.classList.add("shake");
//             itemTwo.classList.add("shake");
//         }, 500);

//         setTimeout(() => {
//             itemOne.classList.remove("shake", "flipped");
//             itemTwo.classList.remove("shake", "flipped");
//             itemOne = itemTwo = "";
//             Blockitem = false;
//         }, 1200);
//     }
// };

// // Shuffle and reset game
// const shuffleItems = () => {
//     matcheditem = 0;
//     itemOne = itemTwo = "";
//     Blockitem = false;
//     timeLeft = 30;
//     clearInterval(timer);
//     startTimer();

//     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
//     arr.sort(() => Math.random() > 0.5 ? 1 : -1);

//     list.forEach((item, i) => {
//         item.classList.remove("flipped");
//         let imageTag = item.querySelector("img");
//         imageTag.src = `image/img-${arr[i]}.png`;
//         item.addEventListener("click", flipedItem);
//     });
// };

// // Timer function
// const startTimer = () => {
//     timeTag.innerText = timeLeft;
//     timer = setInterval(() => {
//         timeLeft--;
//         timeTag.innerText = timeLeft;

//         if (timeLeft === 0) {
//             clearInterval(timer);
//             list.forEach(item => item.classList.remove("flipped"));
//             setTimeout(() => {
//                 shuffleItems();
//             }, 500);
//         }
//     }, 1000);
// };

// shuffleItems();
// startTimer();

/*
const list = document.querySelectorAll(".item");
const timeTag = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const messageBox = document.getElementById("messageBox");
// modal ---------
const modal = document.getElementById("timesUpModal");
const modalRestartBtn = document.getElementById("modalRestart");
// you win modal
const winModal = document.getElementById("winModal");
const exitBtn = document.getElementById("exitBtn");
const winReplayBtn = document.getElementById("winReplayBtn");



let itemOne = itemTwo = "";
let matcheditem = 0;
let Blockitem = false;
let timeLeft = 60;
let timer;
let gameStarted = false;

//times-up modal function----SHOW
const showModal = () => {
    modal.style.display = "flex";
};
//times-up  modal function ---- HIDE
modalRestartBtn.addEventListener("click", () => {
    modal.style.display = "none";
    shuffleItems();
});

// you win modal function---
const showWinModal = () => {
    winModal.style.display = "flex";
    launchConfetti();
};

// confetti
const launchConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
};




const flipedItem = (e) => {
    let clickeditem = e.target;
    if (clickeditem !== itemOne && !Blockitem && gameStarted) {
        clickeditem.classList.add("flipped");
        if (!itemOne) return itemOne = clickeditem;
        itemTwo = clickeditem;
        Blockitem = true;

        let itemOneimg = itemOne.querySelector("img").src;
        let itemTwoImg = itemTwo.querySelector("img").src;
        checkItems(itemOneimg, itemTwoImg);
    }
};

const checkItems = (img1, img2) => {
    if (img1 === img2) {
        matcheditem++;

       if (matcheditem === 8) {
    clearInterval(timer); // stop the timer
    gameStarted = false;
    setTimeout(() => {
        showWinModal(); // show win modal
    }, 800);
  }

        itemOne.removeEventListener("click", flipedItem);
        itemTwo.removeEventListener("click", flipedItem);
        itemOne = itemTwo = "";
        Blockitem = false;
    } else {
        setTimeout(() => {
            itemOne.classList.add("shake");
            itemTwo.classList.add("shake");
        }, 500);

        setTimeout(() => {
            itemOne.classList.remove("shake", "flipped");
            itemTwo.classList.remove("shake", "flipped");
            itemOne = itemTwo = "";
            Blockitem = false;
        }, 1200);
    }
};

const shuffleItems = () => {
    matcheditem = 0;
    itemOne = itemTwo = "";
    Blockitem = false;
    gameStarted = true;
    timeLeft = 60;
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    showMessage(""); // clear message

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    list.forEach((item, i) => {
        item.classList.remove("flipped");
        let imageTag = item.querySelector("img");
        imageTag.src = `image/img-${arr[i]}.png`;
        item.addEventListener("click", flipedItem);
    });

    startTimer();
};

const startTimer = () => {
    timeTag.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeTag.innerText = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            gameStarted = false;
            list.forEach(item => item.removeEventListener("click", flipedItem));
            showModal(); // show the modal when time's up
        }
        
    }, 1000);
};

// hide modal on manual restart
restartBtn.addEventListener("click", () => {
    modal.style.display = "none";
    shuffleItems();
});


const showMessage = (msg, color = "red") => {
    messageBox.innerText = msg;
    messageBox.style.color = color;
};

// Event listeners
startBtn.addEventListener("click", () => {
    shuffleItems();
});

restartBtn.addEventListener("click", () => {
    shuffleItems();
});


exitBtn.addEventListener("click", () => {
    winModal.style.display = "none";
    // You can add more logic here, like going to homepage or showing a message
    document.querySelector(".container").style.display = "none";
});

winReplayBtn.addEventListener("click", () => {
    winModal.style.display = "none";
    shuffleItems();
});


// Optional: shuffle initially but don't start timer
list.forEach(item => item.addEventListener("click", flipedItem));
*/