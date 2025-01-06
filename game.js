const DIFFICULTY = { hard: 1.0, medium: 2.5, easy: 5.0 };

function generateRandomNumbers(count) {
  const randomNumberList = [];
  for (let n = 0; n < count; n++) {
    randomNumberList.push(Math.floor(Math.random() * 9) + 1);
  }
  return randomNumberList;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playGame(count, difficulty) {
  const randomNumberList = generateRandomNumbers(count);
  console.log(randomNumberList);

  let facit = `RANDOM NUMBER LIST: ${randomNumberList}\n`;
  let index = 1;

  while (randomNumberList.length > 0) {
    const a = randomNumberList.shift();
    await speak(a.toString());
    await sleep(DIFFICULTY[difficulty] * 1000);

    if (randomNumberList.length === 0) break;

    const b = randomNumberList[0];
    const sum = a + b;

    facit += `${index}. (${a}+${b}) = ${sum}\n`;
    index++;
  }

  console.log(facit);
  downloadFacit(facit);
}

function speak(text) {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = resolve;
    speechSynthesis.speak(utterance);
  });
}

function downloadFacit(content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "facit.txt";
  a.click();
  URL.revokeObjectURL(url);
}

// Example usage
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  const count = parseInt(document.getElementById("count").value);
  const difficulty = document.getElementById("difficulty").value;
  playGame(count, difficulty);
});
