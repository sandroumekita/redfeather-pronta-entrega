import { useOrderForm } from "vtex.order-manager/OrderForm";
import { useOrderItems } from "vtex.order-items/OrderItems";

import styles from "./styles.css";

const options = {
  allowedOutdatedData: ["paymentData"],
};

const BuyButton = ({ queue }) => {
  const OrderForm = useOrderForm();
  const { addItems, removeItem } = useOrderItems();

  const { orderForm } = OrderForm;

  const clickHandle = (ev) => {
    const products = [];

    if (Object.keys(queue).length > 0) {
      Object.keys(queue).map((curr, index) => {
        if (queue[curr].qty > 0) {
          products.push({
            id: queue[curr].id,
            name: queue[curr].name,
            index: index,
            quantity: queue[curr].qty,
            seller: queue[curr].seller,
            options: [],
          });
        }
      });
    }

    addItems(products, {
      ...options,
    });

    const button = document.querySelector(
      ".vtex-minicart-2-x-openIconContainer .vtex-button"
    );
    if (button) button.click();
  };

  return (
    <button className={styles.AddToCart} onClick={(ev) => clickHandle(ev)}>
      Adicionar ao carrinho
    </button>
  );
};

export default BuyButton;
