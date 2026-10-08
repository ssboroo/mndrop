# BEAUTY DROP Mongolia

Bilingual drop-only beauty commerce with the existing single-screen editorial 3D design. Product picking, arrows and swipes change the product, brand environment, description, MNT price and exact UTC+08:00 deadline. Navigation opens separate pages. There is no scroll-driven product narrative.

## Implemented commerce workflows

- A database-backed catalog replaces concept fixtures when reviewed campaigns are published. The ATELIER fallback is explicitly a concept and cannot be purchased.
- Campaign draft and bilingual content editor, signed brand-evidence records, approved product GLB references, photograph upload to object storage, media-rights approval, MAP pricing, SKU/variant allocation, customer limits, MOQ, embargo and exact opening/closing timestamps.
- Separate human content approval before publication. Authorization must match the brand and remain valid through closure. CLOSED and ARCHIVED never reopen. Expired windows fail on the server even if scheduled work is delayed.
- User-scoped wishlist, notifications, cart, email login in the Railway target, checkout addresses, consent snapshots, order history, delivery timeline and persistent support tickets/responses.
- Transactional reservations, unique checkout idempotency keys, database stock/customer-limit constraints and one campaign per checkout. A failed transaction leaves no orphan order or allocation change.
- QPay Merchant V2 authentication, invoice creation, QR/deep links, callback-triggered independent payment checks, strict invoice/currency/amount/identity validation, unique payment receipts and a single financial decision per reservation. No posted callback payload, screenshot or customer button marks an order paid.
- Provider-confirmed invoice cancellation before reservation release. Ambiguous invoice responses retain their reservation for reconciliation. Late verified payments enter REFUND_REQUIRED and never consume new allocation.
- Paid-only SKU/variant consolidation, MOQ rejection without quantity inflation, one immutable PO per campaign, separate human supplier approval, approved commercial CSV export, actual supplier invoice/reference records, sequential shipping stages and audit logs.
- Refunds are recorded only after staff explicitly confirms an externally completed, reconciled transfer and supplies evidence. This is not an automatic QPay refund. Refunds after a PO is prepared require supplier reconciliation and cannot be recorded through this shortcut.
- JSON/CSV/XML/structured-email import review inbox. Imports remain unpublished until separate campaign review. REST/GraphQL/Shopify/SFTP/EDI remain partner-adapter contracts, not connected services.
- Durable email outbox with idempotent send keys, bounded retries and job locks. Scheduled processing opens approved upcoming campaigns, permanently closes expired campaigns, cancels expired invoices and sends queued launch/order/support messages. It does not poll QPay payment status from cron.
- Server-only administrator allowlist; customers cannot grant themselves access. Customer records are ownership-scoped, mutation APIs enforce same-origin requests and operations write audit records.

## Runtime targets

The root is a private Sites review deployment using Next-compatible Vinext, D1, R2 and ChatGPT identity. `railway/` is the requested independent Next.js + TypeScript + PostgreSQL/Prisma target, sharing the same interface and commerce service. Tailwind, shadcn components, Motion and Three.js remain in use.

Edit shared `app/`, `lib/`, `db/`, `public/` and Railway runtime overrides. `railway/scripts/prepare.mjs` prepares ignored runtime copies; do not edit those copies. Versioned migrations exist for both databases. Previously applied migrations must remain immutable.

Railway deploys with the repository root as Docker build context and `railway/railway.toml`. Set actual values from `railway/.env.example`, including DATABASE_URL, canonical HTTPS APP_URL, ADMIN_EMAILS, domain-verified EMAIL_FROM, RESEND_API_KEY, JOB_SECRET and S3 storage credentials. Docker applies migrations before starting the app. The start script processes jobs once per minute when JOB_SECRET is present; set JOB_WORKER_ENABLED=false to use an external scheduler calling `POST /api/jobs/process` with Bearer JOB_SECRET instead. The alias `/api/jobs/close` uses the same processor.

Email magic links are single-use, expire in 15 minutes and are rate-limited. Session cookies are Secure, HttpOnly and SameSite=Lax; only their hashes are stored. Railway does not trust platform identity headers.

## QPay enablement

Set QPAY_USERNAME, QPAY_PASSWORD, QPAY_INVOICE_CODE, QPAY_RECEIVER_CODE, APP_URL and the approved merchant endpoint. Checkout remains disabled until QPAY_MAPPER_REVIEWED=true. Enable this only after testing the merchant's actual sandbox fixtures against `lib/settlement-contract.ts`, callback retries, invoice cancellation and ambiguous invoice creation. The strict contract requires PAID, MNT, the matching INVOICE object ID, unique payment IDs and the exact order total. Provider response schemas that differ must be reviewed and mapped before enablement; they fail closed today.

The implementation never retries an ambiguous invoice creation blindly because the merchant may already have accepted the unique sender invoice number. Missing invoice IDs require provider-dashboard reconciliation. Credentials and a configuration flag alone are not evidence of a passing sandbox test.

## Product photography and 3D

`/studio` supports local GLB preview and persistent administrator uploads or 1–4-view Meshy image-to-3D submissions. Source photographs and generated GLBs use object storage; task IDs and progress use the database. Generation requires a real MESHY_API_KEY. Completed assets enter REVIEW and require human rights/visual approval. Exact packaging, labels and unseen geometry cannot be guaranteed from photographs; approved imported models are also supported. Model approval is separate from brand and commerce approval.

Published commercial campaigns require an approved product GLB. Their actual model replaces the labeled procedural concept. Five architectural environments preserve the established design. WebGL is lazy-loaded, caps DPR, pauses offscreen and respects reduced motion. Failed rendering has a photograph fallback.

## APIs

- `/api/catalog`: approved public campaigns and authoritative prices/allocation.
- `/api/customer`: owned preferences/cart and order history.
- `/api/admin`, `/api/operations`: protected content, publication, PO, shipping, refund, support and import workflows.
- `/api/checkout`: payment readiness and idempotent reservation/invoice creation.
- `/api/payments/callback`: independently verified settlement, callback-only.
- `/api/orders/[id]`: scoped order details and cancellation of unpaid invoices.
- `/api/support`: persistent owned tickets and responses.
- `/api/purchase-orders/[id]`: human-approved commercial PO CSV.
- `/api/media`, `/api/models/*`: persistent reviewed photographs and GLBs.
- Railway `/api/auth/email`, `/api/auth/callback`, `/api/auth/signout`, `/api/health`.
- `/api/jobs/process`: authenticated bounded job processor.

## Verification and launch limits

TypeScript, both runtime builds, Prisma schema validation, 8 existing campaign/GLB tests and 9 integration tests validate real application SQL against SQLite. Integration tests cover competing reservations, transaction rollback, checkout retries, duplicate settlement, forged callbacks, wrong currency/invoice/amount, late payments, exact paid quantities, MOQ, unresolved invoices and publication approvals. Test payment responses are explicit fixtures, not live integrations.

This is not yet a verified live retailer. No merchant, email, AI or supplier credentials have been supplied. No actual partner authorization has been seeded. PostgreSQL migrations, real provider requests, deliverability, operational reconciliation and browser end-to-end testing still require a configured production environment. The current review deployment remains a concept catalog with payments disabled. Native managed browser QA is unavailable in this environment; build success is not visual or provider verification.

The supplier adapter contracts do not provide automatic binding purchase-order submission. Use the human-approved export and record the actual supplier order until a specific partner's authenticated API and response schema are implemented and tested. Do not call this an official brand partnership or display invented stock, delivery estimates or ingredients.
