import {
  shortenAddress,
  useAddress,
  useSDK,
  useSigner,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { requestFinance } from "../lib/SmartContract";

type TradeCardProps = {
  tradeDescription: string;
  payerAddress: string;
  receiverAddress: string;
  amount: string;
  days: string;
  id: string;
};

export const TradeCard = ({
  tradeDescription,
  payerAddress,
  receiverAddress,
  amount,
  days,
  id,
}: TradeCardProps) => {
  const address = useAddress();
  const signer = useSigner();
  const [isReceiver, setIsReceiver] = useState(false);
  useEffect(() => {
    console.log("Trade Card", { address, receiverAddress });
    setIsReceiver(address?.toLowerCase() == receiverAddress.toLowerCase());
  }, []);
  const returnPercentage = 0;
  const financed = false;
  const isInvested = false;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-300 hover:border-indigo-500 transition-colors duration-300  min-h-[240px] bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="md:flex  p-6 h-full">
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
            <button
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              onClick={() => {
                requestFinance(signer, id, Math.floor(0.95 * parseInt(amount)));
              }}
            >
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
