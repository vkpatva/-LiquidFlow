import { LiquidityFlow } from '../utils/constants';
import ContractAbi from './Contract.abi.json';
import { ethers } from 'ethers';
interface FormValues {
    _receiver: string;
    _amount: number;
    _paymentDays: number;
    _tradeDescription: string;
  }
  const gasLimit = 1000000;
export const InitateTrade = async (signer: any, values :FormValues ) => {
    
    const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
    const tradeTx =await liquidityFlowInstance.initiateTrade(values._receiver,values._amount,values._paymentDays,values._tradeDescription, {
        gasLimit: gasLimit,
      });
      console.log({ ...tradeTx });
    await tradeTx.wait();
    console.log('Trade Transaction Completed',{...tradeTx});

}