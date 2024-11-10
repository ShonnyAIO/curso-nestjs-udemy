import { SetMetadata } from '@nestjs/common';

export const Rol = (args: string[]) => { return SetMetadata('rol', args)};
