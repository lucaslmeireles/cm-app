import { SetMetadata } from '@nestjs/common';
import { ResourceType } from '@prisma/client';

export const Auditable = (resourceType: ResourceType) =>
  SetMetadata('resourceType', resourceType);
