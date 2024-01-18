// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract LiquidFlow {
    IERC20 public ghoToken;

    struct Trade {
        address payer;
        address receiver;
        uint amount;
        uint paymentDays;
        bool isPaid;
        bool isFinanced;
        address investor;
        uint financeAmount;
        string tradeDescription;
    }

    struct FinanceRequest {
        uint tradeId;
        uint amountRequested;
    }

    mapping(uint => Trade) private trades;
    mapping(uint => FinanceRequest) private financeRequests;

    uint public tradeCounter;

    // Event declarations
    event TradeInitiated(
        uint tradeId,
        address payer,
        address receiver,
        uint amount,
        uint paymentDays,
        string tradeDescription
    );
    event FinanceRequested(uint tradeId, uint amountRequested);
    event InvoiceInvested(uint tradeId, address investor, uint amountInvested);
    event InvoicePaid(uint tradeId, address payer);
    event InvestmentWithdrawn(
        uint tradeId,
        address investor,
        uint amountReturned
    );
    event PaymentWithdrawn(
        uint tradeId,
        address receiver,
        uint amountWithdrawn
    );

    constructor(address _ghoTokenAddress) {
        ghoToken = IERC20(_ghoTokenAddress);
    }

    /**
     * @dev Initiates a new trade.
     * @param _receiver The address of the receiver in the trade.
     * @param _amount The amount involved in the trade.
     * @param _paymentDays The number of days within which the payment should be made.
     * @param _tradeDescription A description of the trade.
     */
    function initiateTrade(
        address _receiver,
        uint _amount,
        uint _paymentDays,
        string memory _tradeDescription
    ) external {
        trades[tradeCounter] = Trade(
            msg.sender,
            _receiver,
            _amount,
            _paymentDays,
            false,
            false,
            address(0),
            0,
            _tradeDescription
        );
        emit TradeInitiated(
            tradeCounter,
            msg.sender,
            _receiver,
            _amount,
            _paymentDays,
            _tradeDescription
        );
        tradeCounter++;
    }

    /**
     * @dev Allows the receiver to request finance for a specific trade.
     * @param _tradeId The ID of the trade.
     * @param _amountRequested The amount of finance requested.
     */
    function requestFinance(uint _tradeId, uint _amountRequested) external {
        require(
            trades[_tradeId].receiver == msg.sender,
            "Only receiver can request finance"
        );
        trades[_tradeId].financeAmount = _amountRequested;
        financeRequests[_tradeId] = FinanceRequest(_tradeId, _amountRequested);
        trades[_tradeId].isFinanced = true;
        emit FinanceRequested(_tradeId, _amountRequested);
    }

    /**
     * @dev Allows an investor to finance a trade.
     * @param _tradeId The ID of the trade to finance.
     */
    function investInvoice(uint _tradeId, uint _amount) external {
        Trade storage trade = trades[_tradeId];
        require(!trade.isFinanced, "Invoice already financed");
        require(
            _amount == trade.financeAmount,
            "Investment must match the finance requested amount"
        );
        require(
            ghoToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );

        trade.isFinanced = true;
        trade.investor = msg.sender;
        emit InvoiceInvested(_tradeId, msg.sender, _amount);
    }

    /**
     * @dev Allows the payer to pay the invoice.
     * @param _tradeId The ID of the trade to pay.
     */
    function payInvoice(uint _tradeId) external {
        Trade storage trade = trades[_tradeId];
        require(msg.sender == trade.payer, "Only payer can pay the invoice");
        require(
            ghoToken.transferFrom(msg.sender, address(this), trade.amount),
            "Transfer failed"
        );

        trade.isPaid = true;
        emit InvoicePaid(_tradeId, msg.sender);
    }

    /**
     * @dev Allows the receiver to withdraw the payment after the trade is
     financed.
    * @param _tradeId The ID of the trade for which payment is to be withdrawn.
    */
    function withdrawFinancedPayment(uint _tradeId) external {
        Trade storage trade = trades[_tradeId];
        require(
            trade.receiver == msg.sender,
            "Only receiver can withdraw the payment"
        );
        require(trade.isFinanced, "Trade must be financed");
        require(trade.isPaid, "Invoice must be paid before withdrawal");
        uint amount = trade.financeAmount;
        require(ghoToken.transfer(msg.sender, amount), "Transfer failed");

        emit PaymentWithdrawn(_tradeId, msg.sender, amount);
    }

    /**
     * @dev Allows the receiver to withdraw the payment after it is paid by payee
     * @param _tradeId The ID of the trade for which payment is to be withdrawn.
     */
    function withdrawPayment(uint _tradeId) external {
        Trade storage trade = trades[_tradeId];
        require(
            trade.receiver == msg.sender,
            "Only receiver can withdraw the payment"
        );
        require(!trade.isFinanced, "Trade must not be financed");
        require(trade.isPaid, "Invoice must be paid before withdrawal");
        uint amount = trade.amount;
        require(ghoToken.transfer(msg.sender, amount), "Transfer failed");

        emit PaymentWithdrawn(_tradeId, msg.sender, amount);
    }

    /**
     * @dev Allows the investor to withdraw their investment plus earnings after the payer pays the invoice.
     * @param _tradeId The ID of the trade for which the investment is to be withdrawn.
     */
    function withdrawInvestment(uint _tradeId) external {
        Trade storage trade = trades[_tradeId];
        require(
            trade.investor == msg.sender,
            "Only investor or receiver can withdraw the investment"
        );
        require(
            trade.isPaid,
            "Invoice must be paid before investment withdrawal"
        );

        uint investmentReturn = trade.amount;
        require(
            ghoToken.transfer(msg.sender, investmentReturn),
            "Transfer failed"
        );

        emit InvestmentWithdrawn(_tradeId, msg.sender, investmentReturn);
    }

    // Getter functions
    function getTradeDetails(
        uint _tradeId
    ) external view returns (Trade memory) {
        return trades[_tradeId];
    }

    function getFinanceRequest(
        uint _tradeId
    ) external view returns (FinanceRequest memory) {
        return financeRequests[_tradeId];
    }
}
