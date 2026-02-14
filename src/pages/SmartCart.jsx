import { useNavigate } from "react-router-dom";

const SmartCart = () => {
  const navigate = useNavigate();

  // Later this comes from context / backend
  const cartData = [
    {
      vendor: "Blinkit (Pitampura)",
      items: [
        { name: "Chicken Breast 500g", price: 180 },
        { name: "Olive Oil 250ml", price: 120 }
      ]
    },
    {
      vendor: "Swiggy Instamart (Rohini)",
      items: [
        { name: "Fresh Rosemary 50g", price: 40 },
        { name: "Garlic 100g", price: 20 }
      ]
    }
  ];

  const getVendorSubtotal = (items) =>
    items.reduce((acc, item) => acc + item.price, 0);

  const totalEstimate = cartData.reduce(
    (acc, vendor) => acc + getVendorSubtotal(vendor.items),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-28 px-6">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Smart Cart</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Vendor Groups */}
        <div className="space-y-6">

          {cartData.map((vendor, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6"
            >
              {/* Vendor Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">
                  {vendor.vendor}
                </h2>
                <span className="text-sm text-gray-500">
                  Subtotal: ₹{getVendorSubtotal(vendor.items)}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {vendor.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm"
                  >
                    <span>{item.name}</span>
                    <span className="font-medium">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Total */}
        <div className="border-t mt-8 pt-6 flex justify-between items-center">
          <span className="text-lg text-gray-600">
            Total Estimate
          </span>
          <span className="text-2xl font-bold">
            ₹{totalEstimate}
          </span>
        </div>

      </div>

      {/* Sticky Checkout */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-2xl p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => alert("Redirecting to vendor apps...")}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white py-4 rounded-xl font-semibold hover:scale-105 active:scale-95 transition"
          >
            Confirm & Checkout
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Opens Blinkit & Swiggy apps
          </p>
        </div>
      </div>

    </div>
  );
};

export default SmartCart;
