import React, { useState } from "react";

// function Card(props) { authentic way to get the data in props

function Card({
  mainCartValue,
  setMainCartValue,
  brandName = "Raymond",
  description = "Raymond classic Sui",
}) {
  let [cartValue, setCartValue] = useState(0);

  const addItem = () => {
    setCartValue(cartValue + 1);
    setMainCartValue(mainCartValue + 1);
  };

  const removeItem = () => {
    if (cartValue > 0) {
      setCartValue(cartValue - 1);
      if (mainCartValue > 0) setMainCartValue(mainCartValue - 1);
    }
  };

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
            src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-white">
              {brandName}
            </h2>
            <h1 className="my-4 text-3xl font-semibold text-white">
              {description}
            </h1>
            <p className="leading-relaxed text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
              rem amet repudiandae neque adipisci eum enim, natus illo inventore
              totam?
            </p>
            <div className="text-white text-2xl mt-4">
              In Cart Total Item - {cartValue}
            </div>
            <button className="mt-4 mr-4" onClick={addItem}>
              Add To Cart
            </button>
            <button className="mr-4" onClick={removeItem}>
              Remove From Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
