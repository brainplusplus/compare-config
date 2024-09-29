import dotenv from 'dotenv';

export const parseEnv = (envString: string) => {
    return dotenv.parse(envString);
};