import { useNavigate } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";

const SmartCart = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-32 pb-36 px-6">

      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-orange-100 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-orange-50 hover:bg-orange-100 transition"
            >
              <ArrowLeft size={18} className="text-orange-600" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Smart Cart
            </h1>
          </div>

          <div className="text-sm text-gray-400">
            AI Optimized Grocery Split
          </div>
        </div>

        {/* Vendor Sections */}
        <div className="space-y-8">

          {cartData.map((vendor, index) => (
            <div
              key={index}
              className="bg-orange-50/50 border border-orange-100 rounded-2xl p-8"
            >
              {/* Vendor Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                    <Store size={18} />
                  </div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    {vendor.vendor}
                  </h2>
                </div>

                <span className="text-sm font-semibold text-orange-600">
                  Subtotal: ₹{getVendorSubtotal(vendor.items)}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {vendor.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-white border border-orange-100 px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.name}
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Total Section */}
        <div className="mt-12 border-t border-orange-100 pt-8 flex justify-between items-center">
          <span className="text-lg text-gray-600">
            Total Estimate
          </span>
          <span className="text-3xl font-bold text-orange-600">
            ₹{totalEstimate}
          </span>
        </div>

      </div>

      {/* Sticky Checkout */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-2xl py-6">
        <div className="max-w-4xl mx-auto px-6">
          <button
            onClick={() => alert("Redirecting to vendor apps...")}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-5 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
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
