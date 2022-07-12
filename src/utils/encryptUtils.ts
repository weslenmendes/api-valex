import Cryptr from "cryptr";
import bcrypt from "bcrypt";

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export function encryptSecurityCode(password: string) {
  return cryptr.encrypt(password);
}

export function decryptSecurityCode(encryptedSecurityCode: string) {
  return cryptr.decrypt(encryptedSecurityCode);
}

export function encryptPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function decryptPassword(password: string, encryptedPassword: string) {
  if (!encryptedPassword) return true;

  return bcrypt.compareSync(password, encryptedPassword);
}
