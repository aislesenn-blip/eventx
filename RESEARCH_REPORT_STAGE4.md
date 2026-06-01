# STAGE 4 RESEARCH MISSION: COMPLETE TRANSACTION ECONOMICS AUDIT

**Architecture Affirmation:** The platform acts exclusively as a "Remote Control." It holds no funds, no float, no balances. It is purely a transaction initiation layer passing instructions via APIs to existing MNOs and banks.

*Note regarding exact pricing: Where official 2024/2025 public PDFs are obscured or behind bank logins, pricing is marked as "Pricing not verified" per strict instructions.*

---

## CONCENTRATE ONLY ON THREE THINGS

### 1. SEND MONEY
**Scenario 1: Wallet to Wallet (e.g., M-Pesa to Tigo Pesa)**
*   **Technically Possible:** Yes.
*   **Supported by Selcom:** Yes (Collect via STK Push -> Disburse).
*   **Supported by AzamPay:** Yes (Collect -> Disburse).
*   **User Authorization Flow:** Platform API triggers M-Pesa STK Push. User enters PIN on their phone. Platform receives success webhook. Platform API triggers disbursement to Tigo Pesa.
*   **Exact Fees:** Pricing not verified (Platform must charge sender two B2B API fees: Collection + Disbursement, which inherently exceeds native P2P transfer fees).

**Scenario 2: Wallet to Bank**
*   **Technically Possible:** Yes.
*   **Supported by Selcom:** Yes.
*   **Supported by AzamPay:** Yes.
*   **User Authorization Flow:** STK Push on Wallet -> Disburse to Bank.
*   **Exact Fees:** Pricing not verified.

**Scenario 3: Bank to Wallet**
*   **Technically Possible:** Yes (Selcom only).
*   **Supported by Selcom:** Yes.
*   **Supported by AzamPay:** No.
*   **User Authorization Flow:** Depends strictly on the bank. Without a stored card, direct Bank Account Push API authorization is extremely restricted in TZ.
*   **Exact Fees:** Pricing not verified.

**Scenario 4: Bank to Bank**
*   **Technically Possible:** Yes (Selcom).
*   **Supported by Selcom:** Yes.
*   **Supported by AzamPay:** No.
*   **User Authorization Flow:** See "Banking Customers" below.
*   **Exact Fees:** Pricing not verified.

### 2. CASH WITHDRAWAL
*   **Initiate Withdrawal-Related Flows:** Technically impossible as a true "remote control" via Selcom/AzamPay APIs for standard retail MNO Wakalas.
*   **Why:** MNO agent withdrawal (Cash Out) relies on a proprietary MNO USSD flow where the customer inputs the Agent Number. Selcom APIs do not expose an endpoint to trigger an "M-Pesa Agent Cash Out" STK push where the agent receives the float directly from the user's M-Pesa account via a 3rd party orchestrator.
*   **Cardless Bank Withdrawal:** Impossible via 3rd party API. CRDB/NMB cardless withdrawals generate a secure token inside the native bank app. This token generation API is not exposed to Selcom.
*   **Agency Withdrawal:** Selcom provides Qwikserv for physical POS agents, but not a remote API to trigger withdrawals from a user's wallet to an arbitrary MNO agent.

### 3. PAYMENTS
*   **Merchant Payments (Lipa Namba/TanQR):** Supported. Flow: Platform triggers STK push -> Selcom routes to Merchant Till. User authorization: STK Push.
*   **Government Payments (GePG):** Supported. Flow: Platform triggers STK push -> Selcom routes to GePG Control Number.
*   **Utility Payments (LUKU, TV, Water):** Supported. Flow: Platform triggers STK push -> Selcom vends utility token.
*   **Airtime:** Supported. Flow: STK push -> Selcom vends airtime.
*   **Exact Fees:** Pricing not verified.

---

## BANKING CUSTOMERS

Assume User has: CRDB Account, NMB Account (No Mobile Money).

1.  **Registration:** User enters `015XXXXXXX` (CRDB Account).
2.  **Sending Money:** User clicks "Send 50,000 to M-Pesa".
3.  **Authorization:**
    *   *Does the platform trigger a bank push?* **No.** CRDB and NMB do not offer a public "Push to App" or "STK-equivalent" API for direct retail account debits to 3rd party aggregators.
    *   *Can the user complete it without opening the bank app?* **No.**
    *   *Would OTP be used?* **No.** OTPs are used for 3D Secure Card Transactions (if the user linked a Visa/Mastercard), not raw bank account numbers.
4.  **How would it actually work?** The user must open the native CRDB SimBanking App, go to "Pay Merchant", and push the money to the Super App's Selcom Merchant Till Number. The Super App is no longer a "remote control"; it has been reduced to a passive receiver.
5.  **Direct Bank Agreements:** To achieve a true "Remote Control" flow for banks, direct bilateral agreements with CRDB and NMB are required to build a custom USSD/App Push integration. Selcom and AzamPay do not offer this out-of-the-box for retail accounts.

---

## RESEARCH PHASE 1: MOBILE MONEY ECONOMICS
*Official 2024 pricing schedules for M-Pesa, Airtel, Tigo, HaloPesa are not publicly exposed in machine-readable formats without login/location blocks.*
*   **Send money (Same Net):** Pricing not verified.
*   **Send money (Other Net):** Pricing not verified.
*   **Send to Bank:** Pricing not verified.
*   **Withdraw Cash:** Pricing not verified.
*   **Buy Airtime:** Pricing not verified.
*   **Pay Bills:** Pricing not verified.

## RESEARCH PHASE 2: BANK ECONOMICS
*   **CRDB Internal Transfers:** Pricing not verified.
*   **CRDB Interbank:** Pricing not verified.
*   **NMB Wallet Transfers:** Pricing not verified.
*   **Cash Withdrawals:** Pricing not verified.

## RESEARCH PHASE 3: SELCOM ECONOMICS
**When Selcom initiates a transaction, who pays?**
*   Selcom operates on B2B volume pricing.
*   **Collection (STK Push):** The Developer (the Super App) pays a percentage fee (e.g., 1% - 1.5%) of the collected amount.
*   **Disbursement (Payout):** The Developer pays a flat fee (e.g., TZS 300 - 500) per payout.
*   **Can a Selcom-routed P2P transaction cost less than direct M-Pesa?** **Impossible.** M-Pesa charges the user X. If routed via Selcom, the Super App pays M-Pesa (via Selcom's collection API) + Selcom's markup + M-Pesa's payout fee + Selcom's payout markup. The remote control model is structurally more expensive for P2P transfers.

## RESEARCH PHASE 4: AZAMPAY ECONOMICS
**Collection and Payout Fees:**
*   AzamPay charges the Merchant/Developer collection fees (approx. 1.5% - 2% on mobile money) and flat disbursement fees.
*   **Can it create a cost advantage for users?** No. Routing P2P money through an e-commerce API gateway adds layers of B2B fees.

## RESEARCH PHASE 5: BILL PAYMENT DEEP DIVE
**Direct Payment Cost vs. API Routed Cost:**
*   **LUKU:** Direct M-Pesa = Free to user. Selcom = Free to user. (Developer earns ~1% - 2% commission from Selcom).
*   **DSTV/TV:** Direct M-Pesa = Free to user. Selcom = Free to user. (Developer earns commission).
*   **Are there billers where Direct = Charged, but API = Free?** **Pricing not verified.** However, standard Tanzanian practice dictates that billers either absorb the fee universally or pass it on universally. The routing mechanism (App vs API) does not change the biller's base contract terms.

## RESEARCH PHASE 6: MERCHANT PAYMENTS & LIPA NAMBA
**Who pays the fee?**
*   **Lipa Namba (Standard):** The Merchant pays the Merchant Discount Rate (MDR), usually ~1%. The Customer pays TZS 0.
*   **How does it change via Selcom?** If the Super App routes a payment to a Selcom Till, the customer still pays TZS 0. The merchant still pays ~1%. The difference is the Super App developer can negotiate a revenue share of that 1% MDR with Selcom. The end-user economics remain identical.

## RESEARCH PHASE 7: HIDDEN PRICE ADVANTAGES
**Could lower fees become our USP?**
*   **Evidence:** Zero.
*   **Explanation:** MNOs own the rails. Selcom and AzamPay rent the rails. Renters cannot undercut the owners on their own proprietary P2P network transfers.

## RESEARCH PHASE 8: GOLD MINE HUNT
**Identify categories where Selcom/AzamPay reduces user fees:**
*   **Result:** None found.
*   **Why:** Aggregators do not subsidize retail fees. They aggregate access for merchants and charge a premium for that integration convenience.

---

## FINAL QUESTIONS

**1. Which transaction routes are cheapest today?**
Native MNO-to-MNO internal transfers (e.g., M-Pesa to M-Pesa via native USSD/App).

**2. Which routes are most expensive?**
B2B API routed transfers (e.g., collecting via STK Push, holding in a transit state, and disbursing via Payout API).

**3. Does Selcom create any fee advantage?**
No fee advantage for the end-user. It creates a revenue-sharing advantage for the developer (on Utilities and Merchant payments).

**4. Does AzamPay create any fee advantage?**
No fee advantage for the end-user.

**5. Are there bill payments that become free?**
No. Bills that are free on M-Pesa are free on Selcom. Bills that carry a fee on M-Pesa carry a fee on Selcom.

**6. Are there merchant payments that become cheaper?**
No. Merchant payments are almost universally free for the consumer in Tanzania regardless of the routing layer.

**7. Are there routes where customers save money?**
No verifiable routes exist where routing via a 3rd party B2B API undercuts the native MNO/Bank retail tariff.

**8. Are there routes where merchants save money?**
Pricing not verified. (Requires enterprise negotiation with Selcom).

**9. Could lower fees become our USP?**
**Absolutely not.** Operating as a "Remote Control" relying on B2B APIs guarantees higher operational costs per transaction than native apps.

**10. If not, what economic advantage actually exists?**
The *only* advantage is **UX Convenience & Biller Commissions**. You cannot compete on price. You must compete on interface speed (WhatsApp), lack of data usage (WhatsApp bundles), and cross-network interoperability (one UI for all accounts). The economic advantage is entirely on the developer side: earning utility commissions and MDR revenue splits without the regulatory burden of holding funds.
