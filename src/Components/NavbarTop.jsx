import { useState } from "react";
import {
  SfButton,
  SfIconShoppingCart,
  SfIconFavorite,
  SfIconPerson,
  SfIconExpandMore,
  SfInput,
  SfIconSearch,
  SfIconMenu,
  SfIconArrowBack,
} from "@storefront-ui/react";

export default function NavbarTop() {
  const [inputValue, setInputValue] = useState("");

  const actionItems = [
    {
      icon: <SfIconShoppingCart />,
      label: "",
      ariaLabel: "Cart",
      role: "button",
    },
    {
      icon: <SfIconFavorite />,
      label: "",
      ariaLabel: "Wishlist",
      role: "button",
    },
    {
      label: "Log in",
      icon: <SfIconPerson />,
      ariaLabel: "Log in",
      role: "login",
    },
  ];

  //   const search = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     alert(`Successfully found 10 results for ${inputValue}`);
  //   };

  return (
    <header className="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 text-white border-0 bg-primary-700">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center flex-row md:justify-start h-full max-w-[1536px] w-full">
        <SfButton
          variant="tertiary"
          square
          className="md:hidden text-white"
          aria-label="Go back"
        >
          <SfIconArrowBack />
        </SfButton>
        <a
          href="#"
          aria-label="SF Homepage"
          className="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
        >
          <img
            src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_white.svg"
            alt="Sf Logo"
            className="w-[175px] md:h-6 md:w-[176px] lg:w-[12.5rem] lg:h-[1.75rem]"
          />
        </a>
        <SfButton
          variant="tertiary"
          square
          className="md:hidden text-white"
          aria-label="Search"
        >
          <SfIconSearch />
        </SfButton>
        <SfButton
          aria-label="Open categories"
          className="hidden md:block lg:hidden order-first lg:order-1 mr-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
          square
          variant="tertiary"
        >
          <SfIconMenu />
        </SfButton>
        <SfButton
          className="hidden lg:flex lg:mr-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
          variant="tertiary"
          slotSuffix={<SfIconExpandMore className="hidden lg:block" />}
        >
          <span className="hidden lg:flex whitespace-nowrap">
            Browse products
          </span>
        </SfButton>
        <form
          role="search"
          className="hidden md:flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
        >
          <SfInput
            value={inputValue}
            type="search"
            className="[&::-webkit-search-cancel-button]:appearance-none"
            placeholder="Search"
            wrapperClassName="flex-1 h-10 pr-0"
            size="base"
            slotSuffix={
              <span className="flex items-center">
                <SfButton
                  variant="tertiary"
                  square
                  aria-label="search"
                  type="submit"
                  className="rounded-l-none hover:bg-transparent active:bg-transparent"
                >
                  <SfIconSearch />
                </SfButton>
              </span>
            }
            onChange={(event) => setInputValue(event.target.value)}
          />
        </form>
        <nav className="flex-1 hidden md:flex justify-end lg:order-last lg:ml-4">
          <div className="flex flex-row flex-nowrap">
            {actionItems.map((actionItem) => (
              <SfButton
                key={actionItem.ariaLabel}
                className="mr-2 -ml-0.5 rounded-md text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900"
                aria-label={actionItem.ariaLabel}
                variant="tertiary"
                square
                slotPrefix={actionItem.icon}
              >
                {actionItem.role === "login" && (
                  <p className="hidden xl:inline-flex whitespace-nowrap">
                    {actionItem.label}
                  </p>
                )}
              </SfButton>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
