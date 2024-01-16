import { Sepolia } from "@thirdweb-dev/chains";
import {
    LocalWallet,
    SmartWallet,
    ThirdwebSDK,
  } from "@thirdweb-dev/react";
import { AccountFactory } from "../utils/constants";

  const clientId: string = import.meta.env.VITE_THIRDWEB_APP_ID;
    export const createSmartWallet = () => {
    const smartWallet = new SmartWallet({
      chain: Sepolia,
      factoryAddress: AccountFactory,
      gasless: true,
      clientId,
    });
    return smartWallet;
  };
  
  export const getWalletAddressForUser = async (
    sdk: ThirdwebSDK,
    username: string
  ) => {
   
    const factory = await sdk.getContract(AccountFactory);
    console.log(factory)
    const smartWalletAddress: string = await factory.call("getAccountContract", [
      username,
    ]);
    console.log('Step 4',smartWalletAddress)
    return smartWalletAddress;
  };
  
  export const connectSmartWallet = async (
    username: string,
    password: string,
    statusCallback: (status: string) => void
  ) => {
    statusCallback("Checking if the user has wallet ....");
    const sdk = new ThirdwebSDK("Sepolia", {
      clientId,
    });
   
    const smartWallet = createSmartWallet();
    const personalWallet = new LocalWallet();

      statusCallback("new username , generating a personal wallet ...");
      await personalWallet.generate();
      const encryptedWallet = await personalWallet.export({
        strategy: "encryptedJson",
        password: password,
      });
      await smartWallet.connect({ personalWallet });
      statusCallback("uploading and registering username onchain");
      await smartWallet.deploy();
      const contract = await smartWallet.getAccountContract();
  
      const encryptedWalletUri = await sdk.storage.upload({
        name: username,
        encryptedWallet,
      });
      localStorage.setItem("encryptedWallet", encryptedWallet);
      localStorage.setItem("encryptedPassword", password);
      localStorage.setItem("encryptedUserName", username);
      return smartWallet;
    }
  
  export const connectDirectly = async (
    encryptedWallet: string,
    password: string,
    statusCallback: (status: string) => void
  ) => {
    const smartWallet = createSmartWallet();
    const personalWallet = new LocalWallet();
  
    statusCallback("Decrypting wallet...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    await personalWallet.import({
      encryptedJson: encryptedWallet,
      password: password,
    });
    statusCallback("connecting...");
    await smartWallet.connect({ personalWallet });
    return smartWallet;
  };