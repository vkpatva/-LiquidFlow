import React, { useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { LiquidityFlowGraphQL } from "../utils/constants";
import { TradeCard } from ".";
export const Invest = () => {
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
    <div className="grid grid-cols-3 gap-4">
      {trades.map((trade) => (
        <TradeCard
          key={trade.id}
          tradeDescription={trade.tradeDescription}
          payerAddress={trade.payer}
          receiverAddress={trade.receiver}
          amount={trade.amount} // You need to adapt this to the actual field name in your data
          days={trade.paymentDays} // You need to adapt this to the actual field name in your data
        />
      ))}
    </div>
  );
};

export default Invest;
