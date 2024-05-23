import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDate(date: string | Date) {
  return new Date(date)
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "long",
    })
    .replace("pukul", " ");
}

export function priceFormat(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

const hashKey = crypto
  .createHash("sha256")
  .update(process.env.NEXT_PUBLIC_SIGNATURE_SECRET as string, "utf8")
  .digest();

export const generateSignature = (): string => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    hashKey,
    Buffer.alloc(16, 0)
  );

  const data = `${
    process.env.NEXT_PUBLIC_APP_NAME
  }:${new Date().getTime()}:${crypto.randomBytes(8).toString("hex")}`;
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
};

export const decryptSignature = (data: string): string => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    hashKey,
    Buffer.alloc(16, 0)
  );
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export const generateDeviceId = () => {
  const navigatorInfo = window.navigator.userAgent + window.navigator.platform;
  const pluginsInfo = Array.from(window.navigator.plugins)
    .map((plugin) => {
      return `${plugin.name}${plugin.filename}${plugin.length}`;
    })
    .join("");
  const timezoneOffset = new Date().getTimezoneOffset();
  const screenInfo = `${window.screen.width}${window.screen.height}${window.screen.colorDepth}`;

  const deviceIdData = `${navigatorInfo}${pluginsInfo}${timezoneOffset}${screenInfo}`;
  const hash = crypto.createHash("sha256");
  hash.update(deviceIdData);
  return hash.digest("hex");
};
