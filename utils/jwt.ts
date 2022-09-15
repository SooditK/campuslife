import { createSigner, createDecoder, createVerifier } from 'fast-jwt';

const secret = process.env.SECRETSTRING;

export const sign = createSigner({ key: secret });

export const verifier = createVerifier({ key: secret });

export const decoder = createDecoder();
