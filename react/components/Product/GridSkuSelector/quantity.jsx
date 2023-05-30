import { useState, useEffect } from "react";
import styles from "./styles.css";

const Quantity = ({ item, queue, setQueue }) => {
  const changeHandle = (e) => {
    updateQuantity(parseInt(e.target.value));
  };

  const updateQuantity = (qty) => {
    let newItem = {
      id: item.itemId,
      name: item.nameComplete,
      qty: qty,
      seller: item.sellers[0].sellerId,
      price: item.sellers[0].commertialOffer.Price,
      ListPrice: item.sellers[0].commertialOffer.ListPrice,
    };

    const newQueue = { ...queue, [item.itemId]: newItem };

    setQueue(newQueue);
  };

  useEffect(() => {}, [queue]);

  return (
    <div className={styles.Quantity}>
      <button
        onClick={() => {
          updateQuantity(
            queue[item.itemId] == null ? 0 : queue[item.itemId].qty - 1
          );
        }}
      >
        -
      </button>
      <input
        type="number"
        min="0"
        value={queue[item.itemId] == null ? 0 : queue[item.itemId].qty}
        onChange={changeHandle}
      />
      <button
        onClick={() => {
          updateQuantity(
            queue[item.itemId] == null ? 0 + 1 : queue[item.itemId].qty + 1
          );
        }}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
