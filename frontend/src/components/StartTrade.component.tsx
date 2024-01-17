import { useAddress } from "@thirdweb-dev/react";
import TradeForm from "./TradeForm.component";
import { shortenEthereumAddress } from "../lib/Helper";
import { Header } from ".";

export const StartTrade = () => {
  const shortenAddress = shortenEthereumAddress(useAddress() as string);
  return (
    <div>
      <Header />

      <TradeForm />
    </div>
  );
};
