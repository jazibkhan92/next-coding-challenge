"use client";
import { useState } from "react";
import { ItemsCatelog } from "../../constants";
import styles from "./page.module.css";

function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div key={name}>
      {name} count: {count}
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const addToCart = (product: string) => {
    const productIndex = items.findIndex((item) => item.name === product);
    if (productIndex !== -1) {
      items[productIndex].quantity = items[productIndex].quantity + 1;
      setItems([...items]);
    } else {
      setItems([...items, { name: product, quantity: 1 }]);
    }
    setItemCount(itemCount + 1);
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <button className={styles.basket}>Basket: {itemCount} items</button>
          {ItemsCatelog.map((itemCatelog) => (
            <ItemCount
              name={itemCatelog.id}
              count={
                items.find((item) => item.name === itemCatelog.id)?.quantity ||
                0
              }
              key={itemCatelog.id}
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {ItemsCatelog.map((itemCatelog) => {
          return (
            <button
              className={styles.card}
              onClick={() => addToCart(itemCatelog.id)}
              aria-label="Add to basket"
              key={itemCatelog.id}
            >
              <h2>
                {itemCatelog.id} <span>-&gt;</span>
              </h2>
              <p>{itemCatelog.name}</p>
            </button>
          );
        })}
      </div>
    </main>
  );
}
