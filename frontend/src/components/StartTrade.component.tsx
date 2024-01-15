import TradeForm from "./TradeForm.component";

export const StartTrade = () => {
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
              <span className="font-semibold ml-2 text-lg">0x123...abc</span>
            </div>
          </div>
        </div>
      </div>

      <TradeForm />
    </div>
  );
};
