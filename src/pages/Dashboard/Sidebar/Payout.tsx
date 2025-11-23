export default function Payout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Payout & Billing</h1>

        {/* User Billing Summary */}
        <div className="bg-background border border-para rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3">Billing Information</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-para">Account Holder:</span> John Doe
            </p>
            <p>
              <span className="text-para">Email:</span> johndoe@example.com
            </p>
            <p>
              <span className="text-para">Country:</span> United States
            </p>
            <p>
              <span className="text-para">Billing Address:</span> 221B Baker
              Street, NY
            </p>
          </div>
        </div>

        {/* Payout Methods */}
        <div className="bg-background border border-para rounded-xl p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3">Payout Methods</h2>

          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-para text-sm">**** 3940 · Chase Bank</p>
              </div>
              <button className="text-gray-300 hover:text-foreground">
                Manage
              </button>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-para text-sm">johndoe@paypal.com</p>
              </div>
              <button className="text-gray-300 hover:text-foreground">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Payout History */}
        <div className="bg-background border border-para rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3">Payout History</h2>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Payout #{i}</p>
                  <p className="text-para text-sm">
                    Completed · Jan {10 + i}, 2025
                  </p>
                </div>
                <p className="font-semibold">$150.00</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
