import {
  SfButton,
  SfIconRemove,
  SfLink,
  SfIconAdd,
  SfIconSell,
  SfIconDelete,
} from "@storefront-ui/react";
import { useCounter } from "react-use";
import { useId, ChangeEvent, useState } from "react";
import { clamp } from "@storefront-ui/shared";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function CartProducts(product) {
  console.log(product);
  const inputId = useId();
  const min = 1;
  const max = 10;
  const [value, { inc, dec, set }] = useCounter(product.product.cartQuantity);
  function handleOnChange(event) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    set(Number(clamp(nextValue, min, max)));
  }
  const dispatch = useDispatch();
  //   const cartItems = useSelector((state) => state.cart.value);
  //   let index = cartItems.findIndex((cartItem) => {
  //     return cartItem.product == product.product.id;
  //   });
  //   const [cartAdded, setCartAdded] = useState(index !== -1 ? true : false);
  const decrement = (obj) => {
    dec();
    dispatch(addToCart(obj));
    // console.log(obj.quantity);
    // if (obj.quantity === 0) {
    //   setCartAdded(false);
    // }
  };

  const increment = (obj) => {
    inc();
    dispatch(addToCart(obj));
  };
  return (
    <div className="relative flex border-b-[1px] border-neutral-200 hover:shadow-lg min-w-[320px] max-w-[640px] p-4">
      <div className="relative overflow-hidden rounded-md w-[100px] sm:w-[176px]">
        <SfLink href="#">
          <img
            className="w-full h-auto border rounded-md border-neutral-200"
            src={product.product.thumbnail}
            alt="alt"
            style={{ width: "200px", height: "100px" }}
          />
        </SfLink>
      </div>
      <div className="flex flex-col pl-4 min-w-[180px] flex-1">
        <SfLink
          href="#"
          variant="secondary"
          className="no-underline typography-text-sm sm:typography-text-lg bold"
        >
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            {product.product.title}
          </span>
        </SfLink>

        <div className="items-center sm:mt-auto sm:flex">
          <span className="font-bold sm:ml-auto sm:order-1 typography-text-sm sm:typography-text-lg">
            {`₹ ${product.product.price}`}
          </span>
          <div className="flex items-center justify-between mt-6 sm:mt-0">
            <div className="flex border border-neutral-300 rounded-md">
              <SfButton
                variant="tertiary"
                square
                className="rounded-r-none"
                aria-controls={inputId}
                aria-label="Decrease value"
                onClick={() =>
                  decrement({
                    quantity: value - 1,
                    product: product.product.id,
                  })
                }
              >
                <SfIconRemove />
              </SfButton>
              <input
                id={inputId}
                type="number"
                role="spinbutton"
                className="appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                min={min}
                max={max}
                value={value}
                onChange={handleOnChange}
              />
              <SfButton
                variant="tertiary"
                square
                className="rounded-l-none"
                aria-controls={inputId}
                aria-label="Increase value"
                onClick={() =>
                  increment({
                    quantity: value + 1,
                    product: product.product.id,
                  })
                }
              >
                <SfIconAdd />
              </SfButton>
            </div>
            <button
              aria-label="Remove"
              type="button"
              className="text-neutral-500 text-xs font-light ml-auto flex items-center px-3 py-1.5"
            >
              <SfIconDelete />
              <span className="hidden ml-1.5 sm:block"> Remove </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
