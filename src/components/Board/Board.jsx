import { useState, useEffect } from "react";
import { Item } from "../Item/Item";
import styles from "./Board.module.css";

export function Board({ itemsEmojis, setItemsEmojis, reset, setWin }) {
  const [checkedEmojis, setCheckedEmojis] = useState([]);
  const [lastItems, setLastItems] = useState({ first: null, second: null });
  const [specState, setSpecState] = useState(false);

  useEffect(() => {
    if (specState) {
      if (
        lastItems.first.emoji === lastItems.second.emoji &&
        lastItems.first.id !== lastItems.second.id
      ) {
        setCheckedEmojis((prevChecked) => [
          lastItems.first.emoji,
          ...prevChecked,
        ]);
        setItemsEmojis((prevEmojis) =>
          prevEmojis.map((item) => {
            if (
              checkedEmojis.includes(item.emoji) ||
              item.emoji === lastItems.second.emoji
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
        lastItems.first.emoji !== lastItems.second.emoji &&
        lastItems.first.id !== lastItems.second.id
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
          setSpecState(false); // it has to be here because it synchronizes displaying of items
        }, 1000);
      }
    }
    if (checkedEmojis.length === 8) {
      setWin(true);
    }
    console.log("CheckedEmojis:", checkedEmojis);
    console.log("SpecState:", specState);

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
          if (lastItems.first === null) {
            setLastItems({
              first: { id, emoji, isPaired, isClicked },
              second: null,
            });
          } else if (
            lastItems.first !== null &&
            lastItems.second === null &&
            lastItems.first.id !== id
          ) {
            const tempLastItem = {
              first: lastItems.first,
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
