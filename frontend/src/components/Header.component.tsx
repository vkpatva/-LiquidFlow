import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { shortenEthereumAddress } from "../lib/Helper";
import { GHOToken } from "../utils/constants";
import { useEffect, useState } from "react";

export const Header = () => {
  const address = useAddress();
  const [balance, setBalance] = useState(0);
  const shortenAddress = shortenEthereumAddress(useAddress() as string);
  const { contract } = useContract(GHOToken);
  const { data } = useContractRead(contract, "balanceOf", [address]);
  useEffect(() => {
    if (data) {
      setBalance(parseInt(data) / 10 ** 18);
    }
  }, [data]);

  return (
    <div className="bg-[#d3d3d3] text-black py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold"> Liquidity Flow</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="text-sm md:text-base">💰 GHO:</span>
            <span className="font-semibold ml-2 text-lg">{balance} GHO</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm md:text-base">🌐 Address:</span>
            <span className="font-semibold ml-2 text-lg">{shortenAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
