import { Board } from "./components/Board/Board";
import { Button } from "./components/Button/Button";
import { useState } from "react";
import styles from "./App.module.css";

const emojisList = ["🏈", "🏀", "🎯", "🎮", "🎲", "🥊", "🥅", "🏒"];

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function createEmojisItems() {
  let shuffledEmojisList = emojisList.concat(emojisList);
  console.log("unshuffled", shuffledEmojisList);

  shuffle(shuffledEmojisList);

  console.log("shuffled", shuffledEmojisList);

  const itemsList = [];
  shuffledEmojisList.forEach((emoji, index) =>
    itemsList.push({
      emoji: emoji,
      isPaired: false,
      isClicked: false,
      id: index + 1,
    })
  );
  console.log("shuffledObjects", itemsList);
  return itemsList;
}

function App() {
  const [itemsEmojis, setItemsEmojis] = useState(createEmojisItems);
  const [reset, setReset] = useState(false);
  const [win, setWin] = useState(false);

  function handleReset() {
    setItemsEmojis(() => createEmojisItems());
    setReset((prevReset) => !prevReset);
    setWin(false);
  }

  return (
    <main>
      <header className={styles.header}>Memory Game</header>
      <div className={styles.container}>
        <Board
          itemsEmojis={itemsEmojis}
          setItemsEmojis={setItemsEmojis}
          reset={reset}
          setWin={setWin}
        />
        <Button onClick={handleReset}>Reset</Button>
      </div>
      <h1 className={styles.info}>{win && <span>You are winning!!</span>}</h1>
    </main>
  );
}

export default App;
