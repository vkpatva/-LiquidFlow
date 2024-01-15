import { Form, Field } from "react-final-form";
interface FormValues {
  _receiver: string;
  _amount: number;
  _paymentDays: number;
  _tradeDescription: string;
}
const TradeForm = () => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const validate = (values: FormValues) => {
    const errors: any = {};
    if (!values._receiver) {
      errors._receiver = "Receiver address is required";
    }
    if (!values._amount || values._amount <= 0) {
      errors._amount = "Amount must be greater than zero";
    }
    if (!values._paymentDays || values._paymentDays <= 0) {
      errors._paymentDays = "Payment days must be greater than zero";
    }
    if (!values._tradeDescription) {
      errors._tradeDescription = "Trade description is required";
    }
    return errors;
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto my-10 bg-[#d3d3d3] rounded-lg p-6 space-y-4 border border-gray-200"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receiver Address
            </label>
            <Field
              name="_receiver"
              component="input"
              type="text"
              placeholder="Receiver Ethereum Address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <Field
              name="_amount"
              component="input"
              type="number"
              placeholder="Amount"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Days
            </label>
            <Field
              name="_paymentDays"
              component="input"
              type="number"
              placeholder="Payment Days"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trade Description
            </label>
            <Field
              name="_tradeDescription"
              component="textarea"
              placeholder="Trade Description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#222] disabled:bg-white"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default TradeForm;
