-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateTable
CREATE TABLE "EmailToken" (
    "tokenHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailToken_pkey" PRIMARY KEY ("tokenHash")
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "window" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "customer_items" (
    "user_id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "drop_id" TEXT NOT NULL,
    "variant" TEXT NOT NULL DEFAULT '',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "customer_items_pkey" PRIMARY KEY ("user_id","kind","drop_id","variant")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "opens_at" TEXT NOT NULL,
    "closes_at" TEXT NOT NULL,
    "authorization_id" TEXT,
    "approved_by" TEXT,
    "closed_at" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "titleMn" TEXT,
    "descriptionEn" TEXT,
    "descriptionMn" TEXT,
    "refundPolicyEn" TEXT,
    "refundPolicyMn" TEXT,
    "sourcingEn" TEXT,
    "sourcingMn" TEXT,
    "deliveryEn" TEXT,
    "deliveryMn" TEXT,
    "mediaUrl" TEXT,
    "embargoAt" TIMESTAMP(3),
    "contentApprovedAt" TIMESTAMP(3),

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorizations" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "document_url" TEXT NOT NULL,
    "valid_until" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "approvedBy" TEXT,

    CONSTRAINT "authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameMn" TEXT NOT NULL,
    "ingredientsEn" TEXT NOT NULL,
    "ingredientsMn" TEXT NOT NULL,
    "usageEn" TEXT NOT NULL,
    "usageMn" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceMnt" INTEGER NOT NULL,
    "mapMnt" INTEGER NOT NULL,
    "allocation" INTEGER NOT NULL,
    "reserved" INTEGER NOT NULL DEFAULT 0,
    "paid" INTEGER NOT NULL DEFAULT 0,
    "maxPerCustomer" INTEGER NOT NULL,
    "moq" INTEGER NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "record_id" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PAYMENT_PENDING',
    "total_mnt" INTEGER NOT NULL,
    "payment_reference" TEXT,
    "created_at" TEXT NOT NULL,
    "invoiceId" TEXT,
    "paymentId" TEXT,
    "expiresAt" TIMESTAMP(3),
    "paymentVerifiedAt" TIMESTAMP(3),
    "shippingStatus" TEXT,
    "trackingNumber" TEXT,
    "trackingUrl" TEXT,
    "addressJson" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_lines" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_mnt" INTEGER NOT NULL,
    "variantId" TEXT,

    CONSTRAINT "order_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEvent" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PREPARED',
    "quantitiesJson" TEXT NOT NULL,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "supplierReference" TEXT,
    "supplierInvoiceUrl" TEXT,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "payloadJson" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "runAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedAt" TIMESTAMP(3),
    "lastError" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Session_expiresAt_idx" ON "Session"("expiresAt");

-- CreateIndex
CREATE INDEX "EmailToken_expiresAt_idx" ON "EmailToken"("expiresAt");

-- CreateIndex
CREATE INDEX "campaigns_status_closes_at_idx" ON "campaigns"("status", "closes_at");

-- CreateIndex
CREATE UNIQUE INDEX "Product_campaignId_sku_key" ON "Product"("campaignId", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "Variant_productId_code_key" ON "Variant"("productId", "code");

-- CreateIndex
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "orders_payment_reference_key" ON "orders"("payment_reference");

-- CreateIndex
CREATE UNIQUE INDEX "orders_invoiceId_key" ON "orders"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_paymentId_key" ON "orders"("paymentId");

-- CreateIndex
CREATE INDEX "orders_user_id_created_at_idx" ON "orders"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "orders_status_expiresAt_idx" ON "orders"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "order_lines_order_id_idx" ON "order_lines"("order_id");

-- CreateIndex
CREATE INDEX "PurchaseOrder_campaignId_idx" ON "PurchaseOrder"("campaignId");

-- CreateIndex
CREATE INDEX "Job_status_runAt_idx" ON "Job"("status", "runAt");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_lines" ADD CONSTRAINT "order_lines_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Variant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEvent" ADD CONSTRAINT "OrderEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

