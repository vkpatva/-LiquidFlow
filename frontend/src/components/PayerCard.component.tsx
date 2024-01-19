import {
  shortenAddress,
  useAddress,
  useContract,
  useContractRead,
  useSigner,
} from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { payInvoice } from "../lib/SmartContract";
import { LiquidityFlow } from "../utils/constants";
import { useNavigate } from "react-router-dom";
type TradeCardProps = {
  tradeDescription: string;
  payerAddress: string;
  receiverAddress: string;
  investorAddress: string;
  amount: string;
  days: string;
  id: string;
};

export const PayerCard = ({
  tradeDescription,
  payerAddress,
  receiverAddress,
  amount,
  days,
  id,
  investorAddress,
}: TradeCardProps) => {
  const nav = useNavigate();
  const address = useAddress();
  const signer = useSigner();
  const [isPayer, setIsPayer] = useState(false);
  const { contract } = useContract(LiquidityFlow);
  const { data, isLoading } = useContractRead(contract, "getTradeDetails", [
    id,
  ]);
  const [returnPercentage, setReturnPercentage] = useState(100);
  const [paid, setIsPaid] = useState(false);

  useEffect(() => {
    setIsPayer(address?.toLowerCase() == payerAddress.toLowerCase());
  }, []);
  useEffect(() => {
    if (data) {
      setIsPaid(data.isPaid);
      setReturnPercentage(
        Math.floor(
          ((parseInt(data.amount) - parseInt(data.financeAmount)) * 100) /
            parseInt(data.amount)
        )
      );
    }
  }, [data]);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl border border-gray-300 hover:border-indigo-500 transition-colors duration-300  min-h-[280px] bg-gradient-to-r from-blue-100 to-indigo-100">
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
          {/* {investorAddress != ZeroAddress ? (
            <p className="text-gray-500">
              Investor Address: {shortenAddress(investorAddress)}
            </p>
          ) : null} */}
          <p className="text-gray-500">Amount: {amount}</p>
          <p className="text-gray-500">Days: {days}</p>
          {returnPercentage != 100 ? (
            <p className="text-green-700 mt-2">Return: {returnPercentage}%</p>
          ) : (
            ""
          )}
          {isPayer && !paid && (
            <button
              className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
              onClick={async () => {
                await payInvoice(signer, id, parseInt(amount));
                nav("/payments");
              }}
            >
              Pay Invoice
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
