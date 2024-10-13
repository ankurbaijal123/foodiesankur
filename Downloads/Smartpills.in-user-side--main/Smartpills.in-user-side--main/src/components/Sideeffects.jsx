import React from "react";

const Side_effects = ({ product }) => {
  if (!product || Object.keys(product).length === 0) {
    return(
        <div className="mx-5 mt-5">No Information to show</div>
    )
}
  return (
    <div className="mx-5 mt-5">
      <div>
        With any medication, there are risks and benefits. Even if the
        medication is working, you may experience some unwanted side effects.
      </div>
      <div className="mt-3 mb-3">Common Side Effects</div>
      <div className="mx-5">
        {product.side_effects && product.side_effects.map((effect, index) => (
          <div key={index} className="mb-3">
            • {effect}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Side_effects;
