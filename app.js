let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newBtn = document.querySelector("#new-btn");

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      msg.innerText = `Game is a Draw.`;
      msgContainer.classList.remove("hide");
      disableBoxes();
    }
  });
});

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations the winner is ${winner}`;
  msgContainer.classList.remove("hide");
};

const checkWinner = () => {
  for (let patt of winPatterns) {
    let pos1val = boxes[patt[0]].innerText;
    let pos2val = boxes[patt[1]].innerText;
    let pos3val = boxes[patt[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        disableBoxes();
        return true;
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
