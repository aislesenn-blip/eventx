# DEEP FEASIBILITY RESEARCH MISSION: Building a WhatsApp-Based Financial Super App for Tanzania

## EXECUTIVE SUMMARY & FINAL VERDICT
**Confidence Level: 75%**

**Verdict:** The core concept of a WhatsApp-based orchestration layer that triggers payments from existing accounts without holding funds is **technically and legally feasible**. However, the "Open Banking" vision of aggregating balances and transaction histories across all accounts is **currently not feasible** in Tanzania due to the absence of regulatory frameworks (like PSD2) and the lack of consumer-facing read-only APIs from banks and Mobile Network Operators (MNOs).

The platform must pivot slightly from a "Full Account Aggregator" to a **"Universal Payment Command Center"**. You can allow users to initiate transactions from any MNO (via STK Push) or integrated bank, but you will not be able to show them their real-time balances or transaction histories before they transact.

---

## RESEARCH PHASE 1: SELCOM INVESTIGATION
Selcom is the dominant payment aggregator and switch in Tanzania.

**Capabilities:**
- **Collections:** Comprehensive APIs for Mobile Money (M-Pesa, Tigo Pesa, Airtel Money, Halopesa) and Bank collections.
- **Disbursements:** Qwiksend APIs allow B2C and B2B payouts to wallets and bank accounts.
- **Merchant Services:** Selcom Pay / Qwikserv, extensive QR network (TanQR), and USSD capabilities.
- **Banking Connectivity:** Connects to 35+ banks. Facilitates Bank-to-Wallet and Wallet-to-Bank.

**Can Selcom do what is required?**
- **Initiate Transfers:** YES. Via STK Push (USSD prompt) to mobile wallets, and specific bank checkout flows.
- **User Authorization:** Selcom supports the exact model required. The user initiates in your app -> Selcom triggers an MNO STK Push -> User enters PIN directly on their phone's native USSD overlay -> Selcom webhooks the success to your backend.
- **Query Balances / Transaction History:** NO (for retail). Selcom's APIs are designed for merchant accounts, not retail customer account aggregation. You cannot query a retail user's M-Pesa or CRDB balance via Selcom.
- **Account Linking/OAuth:** NO. Selcom does not offer tokenized delegated authorization for retail bank data.

**Conclusion:** Selcom can power the **money movement and authorization** layer entirely, but cannot power the **data aggregation** layer.

---

## RESEARCH PHASE 2: AZAMPAY INVESTIGATION
AzamPay is a strong, modern API-first payment gateway in East Africa.

**Capabilities:**
- **Checkout / Collections:** Excellent Mobile Money STK Push integration.
- **Disbursements:** Collect & Disburse APIs for bulk and individual payouts.
- **Platform integrations:** Modern RESTful architecture with webhooks.

**Comparison with Selcom:**
- **Strengths:** AzamPay has superior, modern developer documentation and an easier sandbox onboarding experience. It is heavily focused on e-commerce and fast integration.
- **Weaknesses:** Selcom has a deeper entrenchment in the physical banking infrastructure (Agency banking, Qwikserv) and a wider array of direct bank integrations for push/pull.
- **Verdict for the Platform:** AzamPay is excellent as an alternative or backup routing layer for Mobile Money collections and disbursements, but suffers from the exact same limitations as Selcom regarding retail account data aggregation.

---

## RESEARCH PHASE 3: OPEN BANKING ANALYSIS
**Tanzania Open Banking Status:** Non-existent in the regulatory sense.
- There is no equivalent to PSD2 (Europe), Open Banking Standard (UK), or UPI (India).
- The Bank of Tanzania (BOT) has not mandated financial institutions to provide open APIs for third-party data access.
- **Result:** You cannot legally or technically force a bank to give you a customer's balance or transaction history, even with the customer's consent. Bilateral agreements are the only path, and banks generally reserve API access for corporate clients (ERP integrations) or aggregator PSPs (Selcom) for transaction processing, not retail data scraping.

---

## RESEARCH PHASE 4: MOBILE MONEY ACCESS
**Providers:** M-Pesa (Vodacom), Airtel Money, Tigo Pesa, HaloPesa.
- **Initiate Transfers (Collections):** Highly feasible. All operators support STK Push (USSD Push) APIs. You provide the phone number and amount, and the operator pops up a PIN entry screen on the user's phone.
- **Access Balances / Transaction History:** Not feasible. MNOs do not expose retail customer balance APIs to third parties.
- **Partnership Requirements:** You can integrate directly via portals like M-Pesa OpenAPI, but using an aggregator (Selcom/AzamPay) saves months of bureaucratic and technical headache.

---

## RESEARCH PHASE 5: WHATSAPP PLATFORM CAPABILITIES
WhatsApp Business Platform (Cloud API) is highly capable for this use case.
- **WhatsApp Flows:** Can be used to build rich form UIs (selecting source account, entering amount, selecting biller).
- **Interactive Messages:** Buttons and lists for quick selections.
- **Limitations:** WhatsApp cannot handle the actual payment authorization securely (no built-in secure PIN pad for 3rd party integrations in TZ).
- **The Workaround:** WhatsApp acts as the intent layer. The user submits the Flow -> Your backend calls Selcom -> The user receives an STK Push on their device -> User enters PIN -> Your backend receives webhook -> Backend sends WhatsApp message confirming success.

---

## RESEARCH PHASE 6: REGULATORY ANALYSIS
Under the **National Payment Systems (NPS) Act 2015**, governed by the Bank of Tanzania (BOT):
- Because you do not hold funds, you do not need an Electronic Money Issuer (EMI) license.
- However, if you act as a primary interface routing payments and handling transaction data, you may be classified as a **Payment Initiation Service Provider (PISP)** or a **Technical Service Provider (TSP)**.
- **Option 1 (Fastest):** Launch as a TSP/ISV operating entirely under the umbrella of a licensed PSP (like Selcom). The PSP holds the regulatory burden, and you act purely as a software vendor for them.
- **Option 2:** Apply for a Payment System Provider (PSP) license or register as a Third Party Payment Provider. This requires significant capital, compliance, and time (12-18 months).
- **Data Protection:** Must comply with the Tanzania Personal Data Protection Act (PDPA) of 2022.

---

## RESEARCH PHASE 7: COMPETITIVE ANALYSIS
- **Curve:** Combines multiple cards into one physical card and routes the transaction. *Relevance:* They don't hold funds, they route. They rely on mature card networks. Tanzania relies on MNOs.
- **Plaid:** Aggregates data via screen scraping and OAuth. *Relevance:* This model won't work in Tanzania due to lack of API infrastructure.
- **UPI Apps (PhonePe, GPay India):** Uses national standard APIs to access bank balances and initiate push payments. *Relevance:* Tanzania doesn't have UPI. The closest equivalent is using Aggregators (Selcom) to trigger STK Pushes.

---

## RESEARCH PHASE 8: ARCHITECTURE DESIGN

```text
[ WhatsApp App (User Device) ]
       |
       | (WhatsApp Flows / Messages)
       v
[ WhatsApp Cloud API ]
       |
       | (Webhooks & API Calls)
       v
[ YOUR BACKEND ORCHESTRATION LAYER ]
  - Intent Processing Engine
  - Account/Identifier Mapping (Phone/Bank # -> Institution)
  - State Machine (Pending -> Success/Fail)
       |
       | (API via REST)
       v
[ PAYMENT AGGREGATOR (Selcom / AzamPay) ]
       |
       | (Proprietary Networks / Switch)
       v
[ MNOs (Vodacom, Tigo) & BANKS (CRDB, NMB) ]
       |
       | (USSD / STK Push / Bank App Push)
       v
[ USER DEVICE (Native OS Level) ] --> User enters PIN here (Zero Trust for Platform)
```

**Flow:**
1. User opens WhatsApp, types "Pay 50,000 to John".
2. Platform responds with WhatsApp Flow to select funding source (e.g., M-Pesa or CRDB).
3. Backend determines the routing, calls Selcom API for an STK Push on the M-Pesa number.
4. User's phone screen lights up with an M-Pesa USSD prompt: "Enter PIN to pay TZS 50,000".
5. User enters PIN. M-Pesa processes.
6. M-Pesa notifies Selcom -> Selcom notifies Platform Backend -> Platform sends WhatsApp message: "Transfer Complete".

---

## FINAL DELIVERABLE: THE 12 QUESTIONS

**1. Is this idea technically feasible?**
Partially. Payment orchestration via delegated authorization (STK Push) is highly feasible. True account aggregation (balances/histories) is not technically feasible without Open Banking APIs.

**2. Is this idea legally feasible?**
Yes. By never touching the funds and never storing credentials, you vastly reduce your regulatory burden. You can operate as a Technical Service Provider (TSP).

**3. Is this idea commercially feasible?**
Yes, but margins will be razor-thin. You will be splitting already low transaction fees with aggregators and MNOs. The value must come from high volume, premium features, or data monetization.

**4. Can Selcom alone power it?**
Yes. Selcom has the necessary APIs for STK push and bank routing to act as the sole backend engine for transaction initiation.

**5. Can AzamPay alone power it?**
Yes for Mobile Money, but Selcom is preferred for deeper bank integrations.

**6. What partnerships are mandatory?**
- A licensed Payment Aggregator (Selcom or AzamPay).
- A TSP agreement or joint venture with the aggregator to utilize their regulatory umbrella.
- Meta/WhatsApp BSP (Business Solution Provider) for high-tier API access.

**7. What licenses are required?**
Ideally, none initially if operating strictly as an ISV/TSP under Selcom's PSP license. Eventually, a Payment System Provider (PSP) license from BOT.

**8. What is the biggest technical blocker?**
The inability to pull real-time balances. Users will have to blind-fund transactions, hoping they have enough balance, which leads to high failure rates (insufficient funds errors).

**9. What is the biggest regulatory blocker?**
BOT's classification of your entity. If BOT decides your WhatsApp UI acts as a de facto payment channel, they may force you to halt operations until you secure a full PSP license, regardless of whether you hold funds.

**10. What is the minimum viable version (6 months)?**
A WhatsApp bot connected to Selcom that allows users to register their phone number, and use WhatsApp Flows to initiate bill payments (LUKU, Airtime) and P2P transfers funded strictly via MNO STK Pushes.

**11. Realistic 3-year roadmap?**
- **Year 1:** TSP Orchestrator (MNO STK Push only, Bill Payments).
- **Year 2:** Direct bilateral API agreements with top 3 banks (CRDB, NMB) to enable bank-side push approvals.
- **Year 3:** Acquire full PSP license, introduce proprietary QR codes for merchants, and launch lending products based on orchestration data.

**12. Final Verdict with Confidence Level:**
**75%.** The transaction model is perfect for the African context (using STK pushes to avoid credential storage). The primary reason it is not 100% is the hard blocker on retrieving user balances and transaction histories, which degrades the "super app" experience into a "dumb router" experience.
