import { ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { Signer } from "ethers";
import { Route, Routes, Outlet } from "react-router-dom";
import { Payments, StartTrade, Invest, Sidebar } from ".";

export const Home = ({ signer }: { signer: Signer }) => {
  return (
    <ThirdwebSDKProvider
      signer={signer}
      activeChain={"mumbai"}
      clientId={import.meta.env.VITE_THIRDWEB_APP_ID}
    >
      <div className="flex w-[100vw]">
        <div className="w-[15vw]">
          <Sidebar />
        </div>

        <div className="w-[85vw]">
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Invest />} />
              <Route path="start-trade" element={<StartTrade />} />
              <Route path="payments" element={<Payments />} />
            </Route>
          </Routes>
        </div>
      </div>
    </ThirdwebSDKProvider>
  );
};
