import { createHash } from 'crypto';
export const hashBuffer = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex');
