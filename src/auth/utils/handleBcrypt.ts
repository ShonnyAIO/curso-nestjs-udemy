import * as bcryptjs from "bcryptjs";

const saltOrRounds = 10;

async function generateHash(oasswordPlain: string): Promise<string> {
    const hash = await bcryptjs.hash(oasswordPlain, saltOrRounds);
    return hash;
}

async function compareHash(plain: string, hash: string): Promise<any> {
    return await bcryptjs.compare(plain, hash);
}

export { generateHash, compareHash };