import { GHOToken, LiquidityFlow } from '../utils/constants';
import ContractAbi from './Contract.abi.json';
import ERC20Abi from './ERC20.abi.json'
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

export const requestFinance = async (signer: any, tradeId : string , amount : number ) => {
  console.log(tradeId,amount)
  const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
  const tradeTx =await liquidityFlowInstance.requestFinance(tradeId,amount,{
    gasLimit: gasLimit,
  })
    console.log({ ...tradeTx });
  await tradeTx.wait();
  console.log('Trade Transaction Completed',{...tradeTx});

}


export const invest = async (signer: any, tradeId : string , amount : number ) => {
  const GHOInstance = new ethers.Contract(GHOToken,ERC20Abi,signer);
  const approveTx = await GHOInstance.approve(LiquidityFlow,amount,{gasLimit});
  await approveTx.wait();
  console.log({...approveTx})
  const liquidityFlowInstance =  new ethers.Contract(LiquidityFlow,ContractAbi,signer);
  const tradeTx =await liquidityFlowInstance.investInvoice(tradeId,amount,{
    gasLimit
  })
  await tradeTx.wait();
  console.log('Trade Transaction Completed',{...tradeTx});

}