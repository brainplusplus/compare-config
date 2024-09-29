import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Buffer } from "buffer";
import { ComparisonResult } from "@/entities/comparison_result";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isBase64 = (value: string) => {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);
}

export const base64Decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');
export const base64Encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');

export const filterComparisonResultList = (listResult: ComparisonResult[], searchTerm: string, searchCategory: string ): ComparisonResult[] => {
  return listResult.filter(({ key, config1Value, config2Value }) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      if (searchCategory === 'All') {
        return (
            key.toLowerCase().includes(lowerCaseSearchTerm) ||
            config1Value.toLowerCase().includes(lowerCaseSearchTerm) ||
            config2Value.toLowerCase().includes(lowerCaseSearchTerm)
        );
      } else if (searchCategory === 'Key') {
        return key.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (searchCategory === 'Config1Value') {
        return config1Value.toLowerCase().includes(lowerCaseSearchTerm);
      } else if (searchCategory === 'Config2Value') {
        return config2Value.toLowerCase().includes(lowerCaseSearchTerm);
      }
  
      return false;
  });
};