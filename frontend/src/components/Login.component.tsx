import { Field, Form } from "react-final-form";
import {
  generateRandomChallenge,
  registerAccount,
  verifyChallenge,
} from "../lib/WebAuthn";
import { useEffect, useState } from "react";
import { connectDirectly, connectSmartWallet } from "../lib/SmartWallet";
import { Spinner , Error } from ".";
import { Home } from "./Home.page";
type RegisterForm = {
  username: string;
};
export const Login = () => {
  const [signer, setSigner] = useState<any>(undefined);
  const [loadingStatus, setLoadingStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const connectWallet = async (userName: string, password: string) => {
    try {
      setIsLoading(true);
      const wallet = await connectSmartWallet(userName, password, (status) =>
        setLoadingStatus(status)
      );
      const s = await wallet.getSigner();
      setSigner(s);
      setIsLoading(false);
    } catch (err) {
      console.log(err)
      setIsLoading(false);
      console.error(error);
      setError((err as any).message);
    }
  };
  const register = async (accountName: string) => {
    try {
      const challenge = generateRandomChallenge(100);
      await registerAccount(accountName, challenge);
    } catch (err) {
      console.log(err);
    }
  };

  const verify = async () => {
    try {
      const challenge = generateRandomChallenge(100);
      const { signature, rawId } = await verifyChallenge(challenge);
      if (signature && rawId) {
        await connectWallet(rawId, signature);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = (values: RegisterForm) => {
    register(values.username);
  };
  const validate = (values: RegisterForm) => {
    const errors: Partial<RegisterForm> = {};
    if (!values.username) {
      errors.username = "Required";
    }
    return errors;
  };
  const checkLoggedIn = async () => {
    const encryptedWallet = localStorage.getItem("encryptedWallet");
    const encryptedPassword = localStorage.getItem("encryptedPassword");
    if (encryptedPassword && encryptedWallet) {
      setIsLoading(true);

      const wallet = await connectDirectly(
        encryptedWallet,
        encryptedPassword,
        (status) => setLoadingStatus(status)
      );
      const s = await wallet.getSigner();
      setSigner(s);
      setIsLoading(false);
    }
  };
  return signer ? (
    <Home signer={signer}/>
  ) : isLoading ? (
    <Spinner loadingStatus={loadingStatus} />
  ) : error ? (
    <Error />
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12">
    <div className="w-full max-w-md space-y-8">
      <img
        className="mx-auto h-40 w-auto"
        src="public/images/logo.png"
        alt="Liquidity Flow"
      />
      <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
        Add Liquidity to your Trade 💵
      </h2>

      <Form
        onSubmit={ onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username 🧑‍💻
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your Username"
                      className="block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                      {...input}
                    />
                  </div>
                  {meta.touched && meta.error && (
                    <span className="text-xs text-red-600">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create Passkey 🔐
            </button>
          </form>
        )}
      />

      <div className="flex items-center justify-between">
        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
        <p className="text-xs text-center text-gray-500 uppercase">or</p>
        <span className="w-1/5 border-b border-gray-300 lg:w-1/4"></span>
      </div>

      <div>
        <button
          type="button"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={verify}
        >
          Login With Passkey 🔑
        </button>
      </div>
    </div>
  </div>

  );
};

 