import { useAddress } from "@thirdweb-dev/react";
import TradeForm from "./TradeForm.component";
import { shortenEthereumAddress } from "../lib/Helper";

export const StartTrade = () => {
  const shortenAddress = shortenEthereumAddress(useAddress() as string);
  return (
    <div>
      <div className="bg-[#d3d3d3] text-black py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold"> Liquidity Flow</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <span className="text-sm md:text-base">💰 GHO:</span>
              <span className="font-semibold ml-2 text-lg">123.45 GHO</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm md:text-base">🌐 Address:</span>
              <span className="font-semibold ml-2 text-lg">
                {shortenAddress}
              </span>
            </div>
          </div>
        </div>
      </div>

      <TradeForm />
    </div>
  );
};
