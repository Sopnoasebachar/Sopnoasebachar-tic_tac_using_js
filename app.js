document.addEventListener('DOMContentLoaded', () => {
  let flag = Array(9).fill(false);
  const buttons = document.querySelectorAll('button');
  let currentPlayer = 'one';

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWin() {
    return winningCombinations.some(combination => {
      return combination.every(index => {
        if (buttons[index].innerText === currentPlayer) {
          return true;
        } else return false;
      });
    });
  }

  function checkDraw() {
    return flag.every(isClicked => isClicked === true);
  }

  function makeComputerMove() {
    let random = Math.floor(Math.random() * 9);

    while (flag[random]) {
      random = Math.floor(Math.random() * 9);
    }

    buttons[random].innerText = 'two';
    flag[random] = true;

    currentPlayer = 'two';
    if (checkWin()) {
      setTimeout(() => {
        alert('Player (one) wins!');
        highlightWinningCombination('one');
        resetGame();
      }, 100);
    } else if (checkDraw()) {
      alert("It's a draw!");
      resetGame();
    } else {
      currentPlayer = 'one';
    }
  }

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      if (!flag[i] && currentPlayer === 'one') {
        button.innerText = 'one'; // Player's move is set here
        flag[i] = true;

        // Check for win or draw
        if (checkWin()) {
          // Delay the alert to ensure the final button's innerText is displayed
          setTimeout(() => {
            alert('Player (one) wins!');
            highlightWinningCombination('one');
            resetGame();
          }, 100); // Small delay to allow the DOM to update
        } else if (checkDraw()) {
          setTimeout(() => {
            alert("It's a draw!");
            resetGame();
          }, 100); // Delay for draw as well
        } else {
          setTimeout(makeComputerMove, 500); // Computer's turn
        }
      }
    });
  });

  function highlightWinningCombination(player) {
    winningCombinations.forEach(combination => {
      if (combination.every(index => buttons[index].innerText === player)) {
        combination.forEach(index => {
          buttons[index].style.backgroundColor = 'lightgreen';
        });
      }
    });
  }

  function resetGame() {
    setTimeout(() => {
      flag.fill(false);
      buttons.forEach(button => {
        button.innerText = '';
        button.style.backgroundColor = '';
      });
      currentPlayer = 'one';
    }, 1000);
  }
});
