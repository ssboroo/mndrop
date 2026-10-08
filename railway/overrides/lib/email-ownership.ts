import type {Prisma} from '@prisma/client';
// Email ownership must invalidate credentials created before verification.
// The row lock serializes concurrent ownership promotions.
export async function claimVerifiedEmail(tx:Prisma.TransactionClient,email:string){
 await tx.user.upsert({where:{email},create:{email},update:{}});
 await tx.$queryRaw`SELECT 1 FROM "User" WHERE "email"=${email} FOR UPDATE`;
 const user=await tx.user.findUniqueOrThrow({where:{email}});
 if(!user.emailVerifiedAt){
  await tx.session.deleteMany({where:{userId:user.id}});
  return tx.user.update({where:{id:user.id},data:{passwordHash:null,emailVerifiedAt:new Date()}});
 }
 return user;
}
