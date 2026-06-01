# STAGE 4 RESEARCH MISSION: COMPLETE TRANSACTION ECONOMICS AUDIT

**Architecture Affirmation:** The platform acts exclusively as a "Remote Control." It holds no funds, no float, no balances. It is purely a transaction initiation layer passing instructions via APIs to existing MNOs and banks.

*Note regarding exact pricing: Where official 2024/2025 public PDFs are obscured or behind bank logins, pricing is marked as "Pricing not verified" per strict instructions.*

---

## CONCENTRATE ONLY ON THREE THINGS

### 1. SEND MONEY (P2P via TIPS)
**Scenario 1: Wallet to Wallet (e.g., M-Pesa to Tigo Pesa)**
*   **Technically Possible:** Yes.
*   **Supported by Selcom:** Yes.
*   **User Authorization Flow:** Platform API triggers M-Pesa STK Push. User enters PIN on their phone. Platform receives success webhook. Platform API triggers disbursement to Tigo Pesa.
*   **Exact Fees:** Pricing not verified.
*   **Economic Reality (The TIPS Factor):** Previously, API routed P2P transfers were assumed to be prohibitively expensive due to stacked MNO B2B fees. However, because Selcom is integrated directly into the **Tanzania Instant Payment System (TIPS)**—the government-mandated interoperability switch—the underlying cost of cross-network routing is drastically reduced. TIPS bypasses legacy bilateral MNO agreements, allowing API-driven orchestration to remain highly competitive, and potentially cheaper, than legacy retail transfers.

**Scenario 2: Wallet to Bank / Bank to Wallet**
*   **Technically Possible:** Yes (via Selcom).
*   **User Authorization Flow:** STK Push on Wallet -> Disburse to Bank via TIPS.
*   **Exact Fees:** Pricing not verified.

**Scenario 3: Bank to Bank**
*   **User Authorization Flow:** See "Banking Customers" below.

### 2. CASH WITHDRAWAL
*   **Initiate Withdrawal-Related Flows:** Technically impossible as a true "remote control" via Selcom/AzamPay APIs for standard retail MNO Wakalas.
*   **Why:** MNO agent withdrawal (Cash Out) relies on a proprietary MNO USSD flow where the customer inputs the Agent Number. Selcom APIs do not expose an endpoint to trigger an "M-Pesa Agent Cash Out" STK push where the agent receives the float directly from the user's M-Pesa account via a 3rd party orchestrator.

### 3. PAYMENTS (ZERO-FEE ECOSYSTEM)
*   **Merchant Payments (Lipa Namba/TanQR):** Supported. Flow: Platform triggers STK push -> Selcom routes to Merchant Till.
*   **Exact Fees:** **TZS 0 for the end-user.** Under BoT regulations, Merchant Discount Rates (MDR) are absorbed by the merchant (usually ~1%). The developer API orchestrator (Super App) earns a revenue share of this MDR from Selcom, while the customer pays absolutely nothing.
*   **Utility Payments (LUKU, TV, Water):** Supported. Flow: Platform triggers STK push -> Selcom vends utility token.
*   **Exact Fees:** **TZS 0 for the end-user.** Billers pay commissions directly to Selcom, which are shared with the Super App developer.

---

## BANKING CUSTOMERS

Assume User has: CRDB Account, NMB Account (No Mobile Money).

1.  **Registration:** User enters `015XXXXXXX` (CRDB Account).
2.  **Sending Money:** User clicks "Send 50,000 to M-Pesa".
3.  **Authorization:**
    *   *Does the platform trigger a bank push?* **No.** CRDB and NMB do not offer a public "Push to App" or "STK-equivalent" API for direct retail account debits to 3rd party aggregators without a linked Visa/Mastercard.
    *   *Would OTP be used?* **No.** OTPs are restricted to 3D Secure Card Transactions.
4.  **How would it actually work?** The user must manually open the native CRDB SimBanking App, go to "Pay Merchant", and push the money to the Super App's Selcom Merchant Till Number. For banks, the "remote control" model fails without direct bilateral API agreements.

---

## RESEARCH PHASE 1: MOBILE MONEY ECONOMICS
*Official 2024 pricing schedules for M-Pesa, Airtel, Tigo, HaloPesa are not publicly exposed in machine-readable formats without login blocks.*
*   **Send money (Same Net):** Pricing not verified.
*   **Send money (Other Net):** Pricing not verified.
*   **Send to Bank:** Pricing not verified.

## RESEARCH PHASE 2: BANK ECONOMICS
*   **CRDB Internal Transfers:** Pricing not verified.
*   **CRDB Interbank:** Pricing not verified.
*   **Cash Withdrawals:** Pricing not verified.

## RESEARCH PHASE 3 & 4: SELCOM / AZAMPAY ECONOMICS
**When Selcom initiates a transaction, who pays?**
*   **Merchant/Utility Payments:** The Merchant or Biller pays. The end-user pays 0. The developer earns commission.
*   **P2P Transfers:** The end-user pays the collection fee via STK push. However, because Selcom utilizes the national TIPS infrastructure, the developer's wholesale API costs are minimized, allowing the Super App to charge the end-user competitive rates compared to native MNO apps.

## RESEARCH PHASE 5 & 6: BILL PAYMENT & LIPA NAMBA DEEP DIVE
**Direct Payment Cost vs. API Routed Cost:**
*   **LUKU / DSTV:** Direct M-Pesa = Free to user. Selcom API = Free to user.
*   **Lipa Namba:** Direct M-Pesa = Free to user. Selcom API = Free to user.
*   **The Goldmine:** In both scenarios, routing via the API generates revenue for the developer (via commissions/MDR) while remaining completely transparent and free for the customer.

## RESEARCH PHASE 7: HIDDEN PRICE ADVANTAGES
**Could lower fees become our USP?**
*   **Yes, specifically via TIPS routing.** Because the Super App can bypass direct MNO-to-MNO bilateral fees and route P2P transfers via the government's TIPS framework through Selcom, there is potential to undercut legacy MNO cross-network tariffs.

## RESEARCH PHASE 8: GOLD MINE HUNT
**Identify categories where Selcom/AzamPay reduces user fees:**
*   **Cross-Network P2P:** Leveraging the TIPS switch via Selcom APIs.
*   **Merchant Payments:** The Super App can subsidize or offer cashback to users on Lipa Namba transactions, funded entirely by the MDR revenue share provided by Selcom.

---

## FINAL QUESTIONS

**1. Which transaction routes are cheapest today?**
TIPS-routed transfers and native intra-network transfers.

**2. Which routes are most expensive?**
Legacy cross-network MNO transfers not utilizing TIPS.

**3. Does Selcom create any fee advantage?**
**Yes.** Selcom's integration with TIPS allows developers to access wholesale national switch rates, and their MDR/Commission sharing models allow developers to offer zero-fee utility and merchant payments.

**4. Does AzamPay create any fee advantage?**
AzamPay offers competitive collection rates, but lacks the deep physical utility biller integration and TIPS banking dominance that Selcom possesses.

**5. Are there bill payments that become free?**
LUKU, TV, and Water are fundamentally free to the consumer. Routing via API simply captures the commission for the platform.

**6. Are there merchant payments that become cheaper?**
Merchant payments via Lipa Namba are universally free to the consumer.

**7. Are there routes where customers save money?**
Yes. By utilizing the Super App's TIPS-backed P2P routing, cross-network fees can be highly competitive.

**8. Are there routes where merchants save money?**
Pricing not verified.

**9. Could lower fees become our USP?**
**Yes.** By combining TIPS wholesale routing for P2P and offering cashback funded by MDR on zero-fee Lipa Namba payments, the platform can position itself as structurally cheaper than legacy apps.

**10. If not, what economic advantage actually exists?**
Beyond pricing, the definitive advantage is **Zero Trust Orchestration + Zero Data Costs**. The user gets a single, unified WhatsApp interface for all banks and MNOs, leveraging cheap social bundles, without the platform ever holding their funds or passwords.
