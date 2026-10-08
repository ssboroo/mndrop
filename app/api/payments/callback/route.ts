// Callback content is untrusted. Never mark paid from a callback or client redirect.
// A configured provider must independently verify invoice, exact MNT amount,
// merchant identity and settled status, with an idempotent database transaction.
export async function POST(){return Response.json({error:'Payment verification provider is not configured. No order has been marked paid.'},{status:503});}
