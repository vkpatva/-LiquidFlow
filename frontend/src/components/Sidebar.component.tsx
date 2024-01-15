export const Sidebar = () => {
  return (
    <div className="flex h-screen flex-col justify-between bg-white border-e shadow-lg">
      <div className="p-4">
        <img
          className="h-24 w-24 mx-auto"
          src="public/images/logo.png"
          alt="Liquidity Flow"
        />

        <ul className="mt-8 space-y-2">
          <li>
            <a
              href="/"
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            >
              Invest
            </a>
          </li>

          <li>
            <a
              href="/start-trade"
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            >
              Trade
            </a>
          </li>

          <li>
            <a
              href="/payments"
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            >
              Payments
            </a>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <strong className="p-4">Build By : </strong>
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <div>
            <p className="text-xs">
              <strong className="block font-medium">Viraj Patva</strong>
              <span> vkpatva.it@gmail.com </span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};
