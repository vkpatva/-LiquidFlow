import { shortenAddress, useAddress, useSDK } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

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
  const address = useAddress();
  console.log(address);
  const [isReceiver, setIsReceiver] = useState(false);
  useEffect(() => {
    setIsReceiver(address == receiverAddress);
  }, []);
  const returnPercentage = 0;
  const financed = false;
  const isInvested = false;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-300 hover:border-indigo-500 transition-colors duration-300 h-300">
      <div className="md:flex bg-gradient-to-r from-blue-100 to-indigo-100 p-6 h-full">
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
          {returnPercentage ? (
            <p className="text-green-700 mt-2">Return: {returnPercentage}%</p>
          ) : (
            ""
          )}
          {isReceiver && !financed && (
            <button className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">
              Request Finance
            </button>
          )}
          {!isReceiver && financed && !isInvested && (
            <button className="mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
              Invest
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
