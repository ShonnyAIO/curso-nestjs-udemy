import * as bcryptjs from 'bcryptjs';

const saltOrRounds = 10;

async function generateHash(passwordPlain: string): Promise<string> {
  const hash = await bcryptjs.hash(passwordPlain, saltOrRounds);
  return hash;
}

async function compareHash(plain: string, hash: string): Promise<any> {
  return await bcryptjs.compare(plain, hash);
}

export { generateHash, compareHash };
