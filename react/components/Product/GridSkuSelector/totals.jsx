import { useState, useEffect } from "react";

import { FormattedPrice } from "vtex.formatted-price";

import styles from "./styles.css";

import BuyButton from "./buyButton";

const Totals = ({ queue }) => {
  const [totalItens, setTotalItens] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    let sumItens = 0;
    let sumPrice = 0;

    if (Object.keys(queue).length > 0) {
      Object.keys(queue).map((curr) => {
        sumItens += queue[curr].qty;
        sumPrice += queue[curr].price * queue[curr].qty;
      });
    }

    setTotalItens(sumItens);
    setTotalPrice(sumPrice);
  }, [queue]);

  if (Object.keys(queue).length == 0 && totalItens == 0)
    return (
      <div className={styles.Select}>
        Selecione alguma quantidade para iniciar sua compra!
      </div>
    );

  return (
    <>
      <div className={styles.Totals}>
        <div>
          <span>
            Total para <strong>{totalItens}</strong>{" "}
            {totalItens == 1 ? "peça" : "peças"}:{" "}
          </span>
          <br />
          <strong>
            <FormattedPrice value={totalPrice} />
          </strong>
        </div>
        <BuyButton queue={queue} />
      </div>
    </>
  );
};

export default Totals;
