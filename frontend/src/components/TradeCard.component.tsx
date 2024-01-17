import { shortenAddress } from "@thirdweb-dev/react";

type TradeCardProps = {
  tradeDescription: string;
  payerAddress: string;
  receiverAddress: string;
  amount: string;
  days: string;
};
export const TradeCard = ({
  tradeDescription,
  payerAddress,
  receiverAddress,
  amount,
  days,
}: TradeCardProps) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-300 hover:border-indigo-500 transition-colors duration-300">
      <div className="md:flex bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
        <div className="flex-1 min-w-0">
          <p className="text-md font-semibold text-indigo-700 mb-4">
            {tradeDescription}
          </p>
          <p className="text-gray-500">
            Payer Address: {shortenAddress(payerAddress)}
          </p>
          <p className="text-gray-500">
            Receiver Address: {shortenAddress(receiverAddress)}
          </p>
          <p className="text-gray-500">Amount: {amount}</p>
          <p className="text-gray-500">Days: {days}</p>
        </div>
      </div>
    </div>
  );
};
