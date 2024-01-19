import { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { LiquidityFlowGraphQL } from "../utils/constants";
import { Header, PayerCard } from ".";
export const Payments = () => {
  const [trades, setTrades] = useState<any[]>([]);

  useEffect(() => {
    getTrades();
  }, []);

  const client = new ApolloClient({
    uri: LiquidityFlowGraphQL,
    cache: new InMemoryCache(),
  });

  const getTrades = async () => {
    try {
      const result = await client.query({
        query: gql`
          query TradeInitiateds {
            tradeInitiateds(first: 10) {
              id
              amount
              payer
              paymentDays
              receiver
              tradeDescription
              tradeId
              transactionHash
            }
          }
        `,
        variables: {
          first: 10,
        },
      });
      setTrades(result.data.tradeInitiateds);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-4 grid grid-cols-3 -4">
        {trades.map((trade) => (
          <div key={trade.id} className="p-2">
            <PayerCard
              tradeDescription={trade.tradeDescription}
              payerAddress={trade.payer}
              receiverAddress={trade.receiver}
              amount={trade.amount}
              days={trade.paymentDays}
              id={trade.tradeId}
              investorAddress={trade.investorAddress}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
