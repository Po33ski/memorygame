import styles from "./Item.module.css";
export function Item({ emoji, isPaired, isClicked, onClickItem }) {
  // const isPaired = false;
  return (
    <>
      <button
        className={`${styles.item} ${isPaired ? styles.done : ""}`}
        onClick={onClickItem}
        disabled={isPaired}
      >
        {isClicked || isPaired ? emoji : "❓"}
      </button>
    </>
  );
}
