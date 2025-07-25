export default function Home() {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Welcome to Passkey Stellar POC
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Secure authentication with passkeys on Stellar network
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Get Started
            </h2>
            <p className="text-gray-600">
              Use the navigation bar above to access different features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🚀 Quick Start
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Register a new wallet or login with an existing one
              </p>
              <div className="space-y-2">
                <a
                  href="/register"
                  className="inline-block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Register New Wallet
                </a>
                <a
                  href="/login"
                  className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Login with Passkey
                </a>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🔧 Features
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage signers and sign transactions
              </p>
              <div className="space-y-2">
                <a
                  href="/dashboard"
                  className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Dashboard
                </a>
                <a
                  href="/sign-test"
                  className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Signers Management
                </a>
                <a
                  href="/sign"
                  className="inline-block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Transaction Signing
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
