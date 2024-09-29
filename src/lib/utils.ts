import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Buffer } from "buffer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBase64 = (value: string) => {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
}

export const base64Decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');
export const base64Encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');