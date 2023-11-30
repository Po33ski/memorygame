import { useState, useEffect } from "react";
import { Item } from "../Item/Item";
import styles from "./Board.module.css";

export function Board({ itemsEmojis, setItemsEmojis, reset, setWin }) {
  const [checkedEmojis, setCheckedEmojis] = useState([]);
  const [LastItems, setLastItems] = useState({ first: null, second: null });
  const [specState, setSpecState] = useState(false);

  useEffect(() => {
    if (specState) {
      if (
        LastItems.first.emoji === LastItems.second.emoji &&
        LastItems.first.id !== LastItems.second.id
      ) {
        setCheckedEmojis((prevChecked) => [
          LastItems.first.emoji,
          ...prevChecked,
        ]);
        setItemsEmojis((prevEmojis) =>
          prevEmojis.map((item) => {
            if (
              checkedEmojis.includes(item.emoji) ||
              item.emoji === LastItems.second.emoji
            ) {
              return {
                ...item,
                isPaired: true,
                isClicked: false,
              };
            }
            return {
              ...item,
              isClicked: false,
            };
          })
        );
        setSpecState(false);
      } else if (
        LastItems.first.emoji !== LastItems.second.emoji &&
        LastItems.first.id !== LastItems.second.id
      ) {
        setTimeout(() => {
          setItemsEmojis((prevEmojis) =>
            prevEmojis.map((item) => {
              if (checkedEmojis.includes(item.emoji)) {
                return {
                  ...item,
                  isPaired: true,
                  isClicked: false,
                };
              }
              return {
                ...item,
                isClicked: false,
              };
            })
          );
          setSpecState(false); // it has to be here because it sync displaying of items
        }, 1000);
      }
    }
    if (checkedEmojis.length === 8) {
      setWin(true);
    }
    console.log("CheckedEmojis:", checkedEmojis);
    console.log("SpecState:", specState);
    //setSpecState(false);
    setLastItems({ first: null, second: null });
  }, [specState]);

  useEffect(() => {
    setCheckedEmojis([]);
    setLastItems({ first: null, second: null });
    setSpecState(false);
  }, [reset]);

  function handleOnClickItem({ id, emoji, isPaired, isClicked }) {
    !specState &&
      setItemsEmojis((prevEmojis) =>
        prevEmojis.map((prevItem) => {
          if (prevItem.id !== id) {
            return prevItem;
          }
          if (LastItems.first === null) {
            setLastItems({
              first: { id, emoji, isPaired, isClicked },
              second: null,
            });
          } else if (
            LastItems.first !== null &&
            LastItems.second === null &&
            LastItems.first.id !== id
          ) {
            const tempLastItem = {
              first: LastItems.first,
              second: { id, emoji, isPaired, isClicked },
            };
            setLastItems(tempLastItem);
            setSpecState(true);
          }
          return {
            ...prevItem,
            isClicked: true,
          };
        })
      );
  }

  return (
    <div className={styles.table}>
      {itemsEmojis.map(({ id, emoji, isPaired, isClicked }) => (
        <Item
          key={id}
          emoji={emoji}
          isPaired={isPaired}
          isClicked={isClicked}
          onClickItem={() =>
            handleOnClickItem({ id, emoji, isPaired, isClicked })
          }
        />
      ))}
    </div>
  );
}

/*
import { useState, useEffect } from "react";
import { Item } from "../Item/Item";
import styles from "./Board.module.css";

export function Board({ itemsEmojis, setItemsEmojis, reset, setWin, win }) {
  const [checkedEmojis, setCheckedEmojis] = useState([]);
  const [LastItems, setLastItems] = useState({ first: null, second: null });
  const [specState, setSpecState] = useState(false);

  useEffect(() => {
    if (specState) {
      if (
        LastItems.first.emoji === LastItems.second.emoji &&
        LastItems.first.id !== LastItems.second.id
      ) {
        setCheckedEmojis((prevChecked) => [
          LastItems.first.emoji,
          ...prevChecked,
        ]);
        setItemsEmojis((prevEmojis) =>
          prevEmojis.map((item) => {
            if (
              checkedEmojis.includes(item.emoji) ||
              item.emoji === LastItems.second.emoji
            ) {
              return {
                ...item,
                isPaired: true,
                isClicked: false,
              };
            }
            return {
              ...item,
              isClicked: false,
            };
          })
        );
        setSpecState(false);
      } else if (
        LastItems.first.emoji !== LastItems.second.emoji &&
        LastItems.first.id !== LastItems.second.id
      ) {
        setTimeout(() => {
          setItemsEmojis((prevEmojis) =>
            prevEmojis.map((item) => {
              if (checkedEmojis.includes(item.emoji)) {
                return {
                  ...item,
                  isPaired: true,
                  isClicked: false,
                };
              }
              return {
                ...item,
                isClicked: false,
              };
            })
          );
          setSpecState(false); // it has to be here because it sync displaying of items
        }, 1000);
      }
    }
    if (checkedEmojis.length === 8) {
      setWin(true);
    }
    console.log("CheckedEmojis:", checkedEmojis);
    console.log("SpecState:", specState);
    console.log("win:", win);
    //setSpecState(false);
    setLastItems({ first: null, second: null });
  }, [specState]);

  useEffect(() => {
    setCheckedEmojis([]);
    setLastItems({ first: null, second: null });
    setSpecState(false);
  }, [reset]);
  return (
    <div className={styles.table}>
      {itemsEmojis.map(({ id, emoji, isPaired, isClicked }) => (
        <Item
          key={id}
          emoji={emoji}
          isPaired={isPaired}
          isClicked={isClicked}
          onClickItem={() => {
            !specState &&
              setItemsEmojis((prevEmojis) =>
                prevEmojis.map((prevItem) => {
                  if (prevItem.id !== id) {
                    return prevItem;
                  }
                  if (LastItems.first === null) {
                    setLastItems({
                      first: { id, emoji, isPaired, isClicked },
                      second: null,
                    });
                  } else if (
                    LastItems.first !== null &&
                    LastItems.second === null &&
                    LastItems.first.id !== id
                  ) {
                    const tempLastItem = {
                      first: LastItems.first,
                      second: { id, emoji, isPaired, isClicked },
                    };
                    setLastItems(tempLastItem);
                    setSpecState(true);
                  }
                  return {
                    ...prevItem,
                    isClicked: true,
                  };
                })
              );
          }}
        />
      ))}
    </div>
  );
}
*/
