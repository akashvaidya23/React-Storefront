import {
  SfRating,
  SfButton,
  SfLink,
  SfCounter,
  SfIconShoppingCart,
  SfIconCompareArrows,
  SfIconFavorite,
  SfIconSell,
  SfIconPackage,
  SfIconRemove,
  SfIconAdd,
  SfIconWarehouse,
  SfIconSafetyCheck,
  SfIconShoppingCartCheckout,
} from "@storefront-ui/react";
import { useCounter } from "react-use";
import { useEffect, useId } from "react";
import { clamp } from "@storefront-ui/shared";

export default function ProductDetails(product) {
  // console.log("Product ", product);
  const inputId = useId();
  const min = 0;
  const max = 999;
  const [value, { inc, dec, set }] = useCounter(min);
  function handleOnChange(event) {
    const { value: currentValue } = event.target;
    const nextValue = parseFloat(currentValue);
    console.log("nextValue ", nextValue);
    set(Number(clamp(nextValue, min, max)));
  }

  const cart = [];
  function addToCart(product_id) {
    // console.log("value", value, product_id);
    let lineItem = {};
    lineItem.qunatity = value;
    lineItem.product_id = product_id;
    cart.push(lineItem);
    console.log(cart);
  }

  return (
    <section
      className="md:max-w-[640px]"
      style={{ border: "1px solid black", padding: "5px" }}
    >
      <div className="inline-flex items-center justify-center text-sm font-medium text-white bg-secondary-600 py-1.5 px-3 mb-4">
        <SfIconSell size="sm" className="mr-1.5" />
        Sale
      </div>
      <div>
        <img
          src={product.product.thumbnail}
          alt="img"
          width="300px"
          height="150px"
        />
      </div>
      <h1 className="mb-1 font-bold typography-headline-4">
        {product.product.title}
      </h1>
      <strong className="block font-bold typography-headline-3">
        {"$" + product.product.price}
      </strong>
      <div className="inline-flex items-center mt-4 mb-2">
        <SfRating size="xs" value={3} max={5} />
        <SfCounter className="ml-1" size="xs">
          123
        </SfCounter>
        <SfLink
          href="#"
          variant="secondary"
          className="ml-2 text-xs text-neutral-500"
        >
          123 reviews
        </SfLink>
      </div>
      <div className="py-4 mb-4 border-gray-200 border-y">
        <div className="bg-primary-100 text-primary-700 flex justify-center gap-1.5 py-1.5 typography-text-sm items-center mb-4 rounded-md">
          <SfIconShoppingCartCheckout />0 in cart
        </div>
        <div className="items-start xs:flex">
          <div className="flex flex-col items-stretch xs:items-center xs:inline-flex">
            <div className="flex border border-neutral-300 rounded-md">
              <SfButton
                variant="tertiary"
                square
                className="rounded-r-none p-3"
                disabled={value <= min}
                aria-controls={inputId}
                aria-label="Decrease value"
                onClick={() => dec()}
              >
                <SfIconRemove />
              </SfButton>
              <input
                id={inputId}
                type="number"
                role="spinbutton"
                className="grow appearance-none mx-2 w-8 text-center bg-transparent font-medium [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:display-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:display-none [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none disabled:placeholder-disabled-900 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"
                min={min}
                max={max}
                value={value}
                onChange={handleOnChange}
              />
              <SfButton
                variant="tertiary"
                square
                className="rounded-l-none p-3"
                disabled={value >= max}
                aria-controls={inputId}
                aria-label="Increase value"
                onClick={() => inc()}
              >
                <SfIconAdd />
              </SfButton>
            </div>
            <p className="self-center mt-1 mb-4 text-xs text-neutral-500 xs:mb-0">
              <strong className="text-neutral-900">
                {product.product.stock}
              </strong>{" "}
              in stock
            </p>
          </div>
          <SfButton
            size="lg"
            className="w-full xs:ml-4"
            onClick={() => addToCart(product.product.id)}
            slotPrefix={<SfIconShoppingCart size="sm" />}
          >
            Add to cart
          </SfButton>
        </div>
        <div className="flex justify-center mt-4 gap-x-4">
          <SfButton
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconCompareArrows size="sm" />}
          >
            Compare
          </SfButton>
          <SfButton
            size="sm"
            variant="tertiary"
            slotPrefix={<SfIconFavorite size="sm" />}
          >
            Add to list
          </SfButton>
        </div>
      </div>
    </section>
  );
}
