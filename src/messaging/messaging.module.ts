import { Module } from '@nestjs/common';

import { PurchaseController } from '@messaging/controllers/purchases.controller';

@Module({
  controllers: [PurchaseController],
})
export class MessagingModule {}
