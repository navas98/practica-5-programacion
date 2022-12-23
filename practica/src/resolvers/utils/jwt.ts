import { create, Header, Payload, verify } from "jvt";


const encoder = new TextEncoder();

const generateKey = async (secretKey: string): Promise<CryptoKey> => {
  const keyBuf = encoder.encode(secretKey);
  return await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    true,
    ["sign", "verify"]
  );
};

export async function createJWT ({
    username,date,idioma,id,secretKey
}:{
    username:string,date:Date,idioma:string,id:string,secretKey:string
}) :Promise<string>{
    const payload:Payload={
        username,date,idioma,id
    };
    const header:Header={
        alg:"HS256"
    }
    const key=await generateKey(secretKey)
    return create(header,payload,key);
}

export const verifyJWT = async (
  token: string,
  secretKey: string
): Promise<Payload> => {
  try {
    const key = await generateKey(secretKey);
    return await verify(token, key);
  } catch (error) {
    return error.message;
  }
};