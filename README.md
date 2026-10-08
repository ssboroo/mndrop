# BEAUTY DROP Mongolia

A bilingual luxury editorial beauty platform inspired by the supplied **01 / DROP//OS** reference. Original blush-glass campaign photography, restrained black/pink typography, scroll-driven WebGL 3D product stage inspired by Agrumea, cinematic homepage, responsive drop catalog and detail pages, upcoming calendar, wishlist, search, accounts, journal, permanent archive, support/policies and a protected operations studio.

## Current release

This is an implemented **commerce foundation and editorial preview**, not a finished live retailer. Every ATELIER campaign is labelled as a design concept, with no real brand partnerships, stock or verified ingredient claims. Purchasing is locked. No order is marked paid and no supplier order is sent.

### Implemented

- Real Three.js floating-product carousel, scroll-driven depth and rotation, pointer parallax, keyboard/touch-friendly selection, reduced motion, lazy loading, offscreen render suspension and an image fallback. The original procedural bottle models are editorial concepts, not scanned brand products.
- Mongolian/English interface and MNT pricing; responsive desktop/mobile layouts and reduced-motion support.
- Server-side purchase time gates in UTC+08:00. CLOSED and ARCHIVED cannot reopen.
- Persistent user-scoped wishlists and notification **preferences**; delivered notifications are not claimed.
- Accounts, order-history queries, protected admin drafts, evidence records, transitions, paid-only consolidation queries and audit writes.
- CSRF origin checks and server-configured administrative allowlists.
- QPay Merchant V2 adapter architecture, locked pending merchant-specific settlement verification.
- Railway runtime with Next.js, PostgreSQL/Prisma, migration SQL, secure single-use email login through Resend, hashed sessions, health endpoint, authenticated closure job, transactional publication/MAP/embargo guards, paid-only MOQ consolidation and human PO approval.

### Still required for live commerce

- Merchant configuration, QPay sandbox fixtures and idempotent reservation/settlement/refund implementation.
- Complete campaign/product publishing UI and database-backed storefront catalog. The storefront currently uses concept fixtures.
- Actual partner credentials, APIs and reviewed CSV/XML/JSON/SFTP/EDI/Shopify adapters. `PartnerAdapter` is a contract, not a live connection.
- Supplier PO submission, invoices, shipping ingestion and customer notification delivery.
- Object-storage media upload and approval workflow.
- Granular staff roles beyond customer/admin, customer management and full analytics.
- Real PostgreSQL, email, payment, supplier and browser end-to-end verification.

## Deployment targets

### Root: editorial preview

The root uses Next.js-compatible Vinext, Tailwind, shadcn primitives and platform-backed D1 storage. It uses ChatGPT sign-in and is a private review surface, separate from Railway production.

```
pnpm install
pnpm build
node --experimental-strip-types --test tests/drop-rules.test.mjs
```

Set `ADMIN_EMAILS` in the host environment to grant administrative access. Empty means no administrator. Browser input cannot grant roles.

### Railway: requested PostgreSQL/Prisma target

`railway/` packages the same UI with standard Next.js and PostgreSQL, independent of platform identity headers and D1. Its preparation script copies shared source and applies runtime overrides. Generated copies are ignored; edit shared UI at the root and runtime code in `railway/overrides/`.

Use `railway/railway.toml` with the **repository root** as build context. The Dockerfile installs the locked dependencies, builds the UI, and applies versioned migrations before starting Next.js.

```
cd railway
npm ci
# Set environment variables from .env.example.
npm run build
npm run db:migrate
npm start
```

`APP_URL` must be the canonical HTTPS origin. `ADMIN_EMAILS` grants reviewed staff access. `RESEND_API_KEY` and domain-verified `EMAIL_FROM` enable email registration/login. Single-use links expire after 15 minutes. Session cookies are Secure, HttpOnly, SameSite=Lax and are stored only as hashes in PostgreSQL.

Never use placeholders for live credentials. Build-time Prisma generation does not require a reachable database, but running APIs and migrations requires a real PostgreSQL instance.

## Commerce invariants

Campaigns: `DRAFT → EMBARGO → UPCOMING → LIVE → CLOSED → ARCHIVED`. Drafts may proceed directly to upcoming after review. Purchase permission requires LIVE, approved content, valid authorization and server time. Terminal states are irreversible. A delayed closure job cannot extend a purchase window.

Campaign state and order fulfillment state are separate. Paid-only consolidation groups by SKU **and** variant. MOQ checks never inflate quantities. POs remain PREPARED until human approval and are never submitted automatically in this release.

Callbacks, screenshots and customer redirects are untrusted. The payment endpoint currently returns 503 without changing payment status. Merchant-specific independent verification must be implemented and tested before enabling checkout.

## API map

- `GET/POST /api/customer`: authenticated preferences and order history.
- `GET/POST /api/admin`: allowlisted drafts, evidence records, state changes and audit.
- `POST /api/checkout`: identity and campaign checks, then explicit unavailable response while payment setup is incomplete.
- `POST /api/payments/callback`: fails closed and never marks paid.
- Railway adds `/api/auth/email`, `/api/auth/callback`, `/api/auth/signout`, `/api/health`, `/api/operations`, `/api/jobs/close`.

The closure job requires `Bearer JOB_SECRET`. Configure its Railway schedule after deployment; none is silently created. QPay verification must follow callbacks, not continuous payment polling from cron.

## Verification

Critical tests cover exact opening/closing boundaries, unauthorized and embargoed drops, irreversible closure and delayed jobs. The TypeScript check, both runtime builds and Prisma schema/migration are validated before the implementation commit. These checks do not perform real payment, supplier or email actions. Browser visual and WebMCP validation are unavailable in this environment.
