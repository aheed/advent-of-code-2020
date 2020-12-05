import { readFileSync } from 'fs';

export const getInputRows = (filename: string) : string[] => {
    const intext = readFileSync(filename, 'utf-8');
    return intext.split("\n").map(row => row.trim());
}

