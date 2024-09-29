import * as yaml from 'js-yaml';
import { isBase64, base64Decode } from '@/lib/utils';

export const parseYAML = (configString: string) => {
    return flattenObject(yaml.load(configString), '', false);
};

export const parseYAMLBase64Value = (configString: string) => {
    return flattenObject(yaml.load(configString), '', true);
};

function flattenObject(obj: any, prefix: string = '', isDecodeBase64: boolean): Record < string, any > {
    let flattened: Record < string, any > = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(flattened, flattenObject(obj[key], newKey, isDecodeBase64));
            } else {
                if(isDecodeBase64 && isBase64(obj[key])){
                    flattened[newKey] = base64Decode(obj[key]);
                }else {
                    flattened[newKey] = obj[key];
                }
            }
        }
    }

    return flattened;
}