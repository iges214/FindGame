const list = document.querySelectorAll(".item");
const timeTag = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const messageBox = document.getElementById("messageBox");
//times up modal ---------
const modal = document.getElementById("timesUpModal");
const modalRestartBtn = document.getElementById("modalRestart");
// you win modal
const winModal = document.getElementById("winModal");
const exitBtn = document.getElementById("exitBtn");
const winReplayBtn = document.getElementById("winReplayBtn");

const userSetupModal = document.getElementById("userSetupModal");
const usernameInput = document.getElementById("usernameInput");
const avatarOptions = document.querySelectorAll(".avatar-option");
const saveUserBtn = document.getElementById("saveUserBtn");
const closebtn = document.getElementById("exitprofilebtn");
const welcomeMessage = document.getElementById("welcomeMessage");
const playerAvatar = document.getElementById("playerAvatar");
const leaderboardModal = document.getElementById("leaderboardModal");
const leaderboardList = document.getElementById("leaderboardList");

let itemOne = (itemTwo = "");
let matcheditem = 0;
let Blockitem = false;
let timeLeft = 60;
let timer;
let gameStarted = false;

// Avatar Selection
let selectedAvatar = "";

avatarOptions.forEach((avatar) => {
  avatar.addEventListener("click", () => {
    avatarOptions.forEach((a) => a.classList.remove("selected"));
    avatar.classList.add("selected");
    selectedAvatar = avatar.src;
  });
});

// Saving User Info from user input form/modal
saveUserBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (!username || !selectedAvatar) return alert("Fill out all fields");
  localStorage.setItem("username", username);
  localStorage.setItem("avatar", selectedAvatar);
  setWelcome(username, selectedAvatar);
  userSetupModal.style.display = "none";
});
closebtn.addEventListener("click", () => {
  userSetupModal.style.display = "none";
});

function setWelcome(name, avatar) {
  document.getElementById(
    "welcomeMessage"
  ).innerText = `Welcome back, ${name}!`;
  // playerAvatar.src = localStorage.getItem("avatar");
  playerAvatar.src = avatar;
}

// Load User Info
window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  if (!name || !avatar) {
    userSetupModal.style.display = "flex";
  } else {
    setWelcome(name, avatar);
  }
});

// On page load or when showing username input form, check username
const savedUsername = localStorage.getItem("username");
const savedAvatar = localStorage.getItem("avatar");
if (savedUsername && savedAvatar) {
  document.getElementById(
    "welcomeMessage"
  ).innerText = `Welcome back, ${savedUsername}!`;
  showBestTime();
} else {
  userSetupModal.style.display = "block";
}

// Change User
document.getElementById("changeUserBtn").addEventListener("click", () => {
  userSetupModal.style.display = "flex";
});

// Track Best Time
// let bestTime = localStorage.getItem("bestTime") || null;

// Helper to get best time key for current user
function getBestTimeKey(username) {
  return `bestTime_${username}`;
}

// Show best time in the UI
function showBestTime() {
  const username = localStorage.getItem("username");
  if (!username) {
    document.getElementById("bestTimeDisplay").innerText = "Best time: N/A";
    return;
  }
  const bestTime = localStorage.getItem(getBestTimeKey(username));
  if (bestTime) {
    document.getElementById(
      "bestTimeDisplay"
    ).innerText = `Best time: ${bestTime} seconds`;
  } else {
    document.getElementById("bestTimeDisplay").innerText = "Best time: N/A";
  }
}

// Update best time if current time is better (lower)
function updateBestTime(secondsUsed) {
  const username = localStorage.getItem("username");
  if (!username) return;
  const key = getBestTimeKey(username);
  const prevBest = localStorage.getItem(key);

  if (!prevBest || secondsUsed < prevBest) {
    localStorage.setItem(key, secondsUsed);
    showBestTime(); // update display immediately
    alert(`Congrats ${username}! New best time: ${secondsUsed} seconds!`);
  }
}

// Call showBestTime() once on page load or username set
showBestTime();

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
    origin: { y: 0.6 },
  });
};

const flipedItem = (e) => {
  console.log(e.target);
  let clickeditem = e.target;
  if (clickeditem !== itemOne && !Blockitem && gameStarted) {
    clickeditem.classList.add("flipped");
    if (!itemOne) return (itemOne = clickeditem);
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
      let timeUsed = 60 - timeLeft;
      updateBestTime(timeUsed);
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
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

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
      list.forEach((item) => item.removeEventListener("click", flipedItem));
      showModal(); // show the modal when time's up
    }
  }, 1000);
};

// hide modal on manual restart
restartBtn.addEventListener("click", () => {
  modal.style.display = "none";
  userSetupModal.style.display = "none";
  shuffleItems();
});

const showMessage = (msg, color = "red") => {
  messageBox.innerText = msg;
  messageBox.style.color = color;
};

// Event listeners
startBtn.addEventListener("click", () => {
  let listItems = document.getElementById("gameicons");
  listItems.classList.remove("dnone");
  startBtn.style.display = "none";
  setTimeout(() => {
    listItems.classList.add("show");
  }, 10);
  shuffleItems();
});

exitBtn.addEventListener("click", () => {
  // winModal.style.display = "none";

  // You can add more logic here, like going to homepage or showing a message
  document.querySelector("html").style.display = "none";
});

winReplayBtn.addEventListener("click", () => {
  winModal.style.display = "none";
  shuffleItems();
});

// shuffle initially but don't start timer
list.forEach((item) => item.addEventListener("click", flipedItem));
