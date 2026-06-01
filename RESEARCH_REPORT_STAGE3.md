# DEEP FEASIBILITY RESEARCH MISSION: STAGE 3
**Can Selcom or AzamPay power a complete Financial Super App?**

*(Note: This report strictly evaluates the ability to act as a zero-knowledge "Dumb Router" that triggers payments via existing identifiers [phone/bank numbers] without aggregating balances or holding credentials.)*

---

## RESEARCH PHASE 1: DEEP API CAPABILITY AUDIT

### Selcom API Capabilities
Selcom operates the largest financial switch in Tanzania.
1.  **Initiate Transaction:** Yes. via Checkout APIs and Qwiksend/Qwikserv APIs.
2.  **From Registered Phone #:** Yes. Mobile Money wallets.
3.  **From Registered Bank #:** Yes, via specific bilateral bank gateway integrations (Selcom connects to 35+ banks).
4.  **STK Push Support:** Yes. Supported natively for M-Pesa, Tigo Pesa, Airtel Money, HaloPesa.
5.  **USSD Push Support:** Yes (STK Push is technically a USSD Class 2 message).
6.  **Bank Auth Flows:** Yes, via OTP/SMS or Bank-App Push (depends on the bank; CRDB uses OTP for card/account web checkouts).
7.  **Merchant Payments:** Yes. (TanQR / Lipa Namba API).
8.  **Bill Payments:** Yes. (LUKU, DSTV, DAWASA, etc.).
9.  **Govt Payments:** Yes. (GePG API).
10. **QR Payments:** Yes. (TanQR creation and querying).
11. **Withdrawals:** Yes (via Agency Banking / Qwikserv cash-out flows, though UI orchestration is tricky via WhatsApp without a physical POS).
12. **Bank Transfers:** Yes (Account to Account via Selcom switch).
13. **Wallet-to-Wallet:** Yes (via Payout APIs).
14. **Wallet-to-Bank:** Yes (via Qwiksend B2B/B2C).
15. **Bank-to-Wallet:** Yes.

*Evidence:* Selcom Developer Docs (developers.selcommobile.com) list explicit endpoints for `Utility Payment Request`, `Checkout` (STK), and `Qwiksend` (Disbursements).

### AzamPay API Capabilities
AzamPay is an e-commerce-focused gateway.
1.  **Initiate Transaction:** Yes.
2.  **From Phone #:** Yes.
3.  **From Bank #:** Partial. AzamPay primarily handles mobile money and card (Visa/MC) checkouts, not direct Bank-Account-to-Bank-Account routing like Selcom.
4.  **STK Push Support:** Yes.
5.  **USSD Push Support:** Yes.
6.  **Bank Auth Flows:** Yes, but via Card 3D Secure, not direct account debit OTPs for most local banks.
7.  **Merchant Payments:** Yes (Checkout API).
8.  **Bill Payments:** Partial (Fewer direct billers than Selcom).
9.  **Govt Payments:** Yes (GePG supported).
10. **QR Payments:** No native TanQR API equivalent heavily documented like Selcom.
11. **Withdrawals:** No direct "cash out at Wakala" API.
12. **Bank Transfers:** No (Not built as a national bank switch).
13. **Wallet-to-Wallet:** Yes (Collect -> Disburse).
14. **Wallet-to-Bank:** Yes (Disburse to Bank).
15. **Bank-to-Wallet:** Only via Card-to-Wallet.

*Evidence:* AzamPay API Docs (azampay.com/developers) feature "Checkout", "Collect & Disburse", but lack agency banking/direct bank switch APIs.

---

## RESEARCH PHASE 2: COMPLETE FEATURE COVERAGE ANALYSIS

We analyze major apps (M-Pesa, Tigo Pesa, CRDB SimBanking, NMB Mkononi) against the capabilities of Selcom and AzamPay.

| Feature | Major Native Apps | Selcom (Via API) | AzamPay (Via API) | Possible via "Super App"? |
| :--- | :---: | :---: | :---: | :--- |
| **Send Money (Wallet -> Wallet)** | Yes | Yes (Collect + Disburse) | Yes (Collect + Disburse) | **Yes.** Platform triggers STK push on sender, uses API to disburse to receiver. |
| **Send Money (Bank -> Bank)** | Yes | Yes | No | **Yes.** (Selcom only). Selcom routes via local switch. |
| **Send Money (Wallet -> Bank)** | Yes | Yes | Yes | **Yes.** |
| **Send Money (Bank -> Wallet)** | Yes | Yes | No (requires card) | **Yes.** (Selcom only). |
| **Merchant Payment (Lipa Namba)** | Yes | Yes | Partial | **Yes.** Selcom natively powers TanQR/Lipa Namba. |
| **Bill Payment (LUKU, TV)** | Yes | Yes | Yes | **Yes.** Both have utility APIs. |
| **Government Payments (GePG)** | Yes | Yes | Yes | **Yes.** |
| **Airtime Purchase** | Yes | Yes | Yes | **Yes.** |
| **Cash Withdrawal (at Wakala)** | Yes | **Difficult** | No | **No / Extremely Difficult.** Withdrawals require scanning a QR or entering an agent number, then getting an STK push, but the Wakala relies on MNO specific confirmation. Selcom Qwikserv does this, but it's meant for physical POS, not 3rd party WhatsApp orchestration. |
| **International Remittance** | Yes | Yes | Yes | **Yes.** (Limited to inbound/outbound API limits). |
| **Loans / Overdrafts (Nivushe/Songesha)** | Yes | No | No | **No.** These are proprietary MNO/Bank credit products not exposed to 3rd party aggregators for initiation. |

---

## RESEARCH PHASE 3: BANK AUTHORIZATION RESEARCH

Can a platform trigger a payment from a bank account directly using just the account number?

**The Reality in Tanzania:**
Unlike M-Pesa's STK push, **banks in Tanzania do not offer a universal "Push to App" or "USSD Push" for direct account debit to 3rd party aggregators** without an underlying debit card.

*   **CRDB / NMB / NBC:** To debit a CRDB account via Selcom or AzamPay, the transaction must usually be processed as an **E-Commerce Card Transaction** (requiring the 16-digit card number, CVV, and triggering a 3D Secure OTP via SMS), OR the user must manually go to their SimBanking App and "Push" the money to the aggregator's Merchant/Till number.
*   **API-based Confirmation:** Banks do not allow Selcom to take a raw Account Number (e.g., `015XXXXXXX`), send an API call, and make the CRDB App pop up with an "Approve Payment" screen on the user's phone. This functionality does not exist in the TZ open market.
*   **Exception:** Corporate ERP integrations. If you are a massive corporate, CRDB gives you direct API access to debit *your own* accounts, not retail accounts.

**Conclusion:** For Bank Accounts, the "Dumb Router" model breaks down. You cannot initiate a seamless pull from a bank account via just an account identifier. The user must either link their debit card (which WhatsApp cannot securely tokenize in TZ) or manually push funds via their bank app.

---

## RESEARCH PHASE 4: REAL PRICING ANALYSIS (MOBILE MONEY)

Based on 2024/2025 standard Tanzanian MNO tariffs (Tigo/Vodacom/Airtel generally align due to BOT interoperability rules).

| Transaction Type | Example Amount (TZS) | Native App Fee (Approx TZS) |
| :--- | :--- | :--- |
| **Send Money (Wallet to Wallet, Same Net)** | 20,000 | 250 - 400 |
| **Send Money (Wallet to Wallet, Same Net)** | 100,000 | 1,000 - 1,500 |
| **Send Money (Cross Network)** | 50,000 | 600 - 1,200 |
| **Withdrawal (Wakala)** | 50,000 | 1,500 - 2,000 |
| **Merchant Payment (Lipa Namba)** | 50,000 | 0 (Merchant pays fee) |
| **LUKU / Airtime** | Any | 0 |
| **Bank to Wallet** | 50,000 | 0 (Bank charges ~1000 - 1500) |
| **Wallet to Bank** | 100,000 | 1,500 - 2,500 + Gov Levy |

---

## RESEARCH PHASE 5: BANK PRICING ANALYSIS

Based on standard CRDB/NMB retail tariffs:

| Transaction Type | Example Amount (TZS) | Bank App Fee (Approx TZS) |
| :--- | :--- | :--- |
| **Internal Transfer (CRDB to CRDB)** | Any | 0 - 500 |
| **Interbank Transfer (TISS/EFT)** | 100,000 | 1,500 - 3,000 |
| **Wallet Transfer (Bank to M-Pesa)** | 50,000 | 1,000 - 1,500 |
| **Bill Payments / LUKU** | Any | 0 |

---

## RESEARCH PHASE 6 & 7: SELCOM AND AZAMPAY ECONOMICS

### How Aggregator Pricing Works
Selcom and AzamPay are **B2B Gateways**. They do not process transactions for free.
If your Super App triggers a Wallet-to-Wallet transfer (e.g., M-Pesa to Tigo Pesa), it is technically executed as:
1.  **Collection:** Super App collects TZS 50,000 from M-Pesa via STK Push (Aggregator charges ~1% to 2% collection fee).
2.  **Disbursement:** Super App disburses TZS 50,000 to Tigo Pesa via Payout API (Aggregator charges ~TZS 300 to TZS 500 flat fee).

**The Economic Reality:**
*   If a user sends TZS 50,000 directly on M-Pesa, the fee is ~TZS 1,000.
*   If a user routes it through your Super App via Selcom:
    *   Selcom collection fee (1.5%): TZS 750
    *   Selcom disbursement fee: TZS 500
    *   Total Cost to Platform: TZS 1,250.
*   **Result:** The platform's internal cost is HIGHER than the native MNO fee. To break even, the Super App must charge the user TZS 1,250+. **There is NO cost advantage for P2P transfers.**

### Where is the Economic Advantage?
The economic advantage exists **ONLY in Merchant Payments and Utility Bill Payments**.
*   **LUKU/DSTV:** Selcom shares the commission they receive from the biller with the developer. The user pays exactly the same (TZS 0 fee), but the platform earns ~1% to 2% commission.
*   **Merchant (Lipa Namba):** The merchant pays the ~1% processing fee. The platform can negotiate a revenue share with Selcom on the merchant discount rate (MDR).

---

## RESEARCH PHASE 8: END-TO-END PRODUCT SIMULATION

**Day One Launch Scenario:**
User registers: M-Pesa Number `075XXXXXXX`.

*   **Scenario 1: Paying LUKU (Success).** User selects LUKU, enters TZS 10,000. Platform calls Selcom STK Push. User enters M-Pesa PIN on phone. Platform receives webhook, calls Selcom Utility API to vend LUKU. Token is delivered in WhatsApp. Platform earns TZS 150 commission. *Flawless experience.*
*   **Scenario 2: Sending Money to Friend's Airtel (Success but expensive).** User sends TZS 50,000. Platform triggers M-Pesa STK Push (Cost: 1.5%). Platform disburses to Airtel (Cost: TZS 500). Platform must charge the sender TZS 1,500 upfront via the STK push (Push amount = TZS 51,500) to cover costs. *Works, but user complains about high fees.*
*   **Scenario 3: Withdrawing Cash at Wakala (Fail).** User is at an M-Pesa agent. They try to use the Super App to withdraw. The Super App cannot trigger a native M-Pesa agent withdrawal flow. The user is forced to use the M-Pesa app or USSD.
*   **Scenario 4: Paying from CRDB Account (Fail).** User registered `015XXXXX`. User tries to pay LUKU. Platform calls Selcom. Selcom cannot push an auth to the CRDB app just via account number. The transaction fails. User must link a Visa/Mastercard instead.

---

## FINAL REPORT: THE 12 QUESTIONS

**1. Can Selcom alone power the full product?**
No. It can power the Mobile Money and Utility portions flawlessly, but it cannot power direct Bank Account debits without underlying cards.

**2. Can AzamPay alone power the full product?**
No. It is even more restricted than Selcom, lacking deep physical bank switches and extensive biller catalogs.

**3. Which app features are impossible?**
Direct Bank Account Debits (without debit cards), Cash Withdrawals at Wakala, MNO Micro-Loans (Songesha), Bank Overdrafts.

**4. Which app features are fully possible?**
LUKU, TV Subscriptions, GePG/Govt payments, Airtime, Merchant QR/Till payments, and Wallet-to-Wallet P2P transfers.

**5. Which features require direct bank agreements?**
Direct Bank Account Push-to-App auth. You must sign a bilateral API agreement with CRDB/NMB to allow API-initiated debits with OTP auth.

**6. Which features require direct MNO agreements?**
Lower P2P transaction fees. To compete with native apps, you must bypass aggregators and get wholesale C2B/B2C rates directly from Vodacom/Tigo.

**7. Are user fees identical to existing apps?**
For utilities and merchant payments, yes (Zero fees to user). For P2P transfers, no.

**8. Are user fees lower than existing apps?**
**No.** Because the platform acts as a middleman using Aggregator B2B APIs, the base cost of moving money is inherently higher than the MNO's internal transfer costs.

**9. Where exactly is the economic advantage?**
Earning commissions on Bill Payments (LUKU/TV/Airtime) and splitting the Merchant Discount Rate (MDR) with Selcom on commercial payments.

**10. If there is no fee advantage, where is the real advantage?**
**Extreme Convenience.**
1. Zero-data usage (runs on WhatsApp bundles).
2. Eliminates memorizing USSD codes.
3. Persistent WhatsApp chat history for LUKU tokens and receipts.
4. One unified interface for all utilities, regardless of which MNO wallet is funding it.

**11. What would the product actually look like on day one?**
A WhatsApp bot that accepts Mobile Numbers only (no bank accounts). Users trigger STK pushes to buy LUKU, Airtime, and pay merchants. It acts essentially as a highly polished, zero-data USSD replacement for utility payments.

**12. What would the product look like at full maturity?**
A platform with direct Bank API integrations (allowing seamless bank debits) and direct MNO wholesale contracts (lowering P2P fees), functioning entirely within WhatsApp Flows as the single UI for all of a Tanzanian's daily financial chores.
