import { readFileSync } from 'fs';

export const getInputText = (filename: string) : string => readFileSync(filename, 'utf-8');

export const getInputRows = (filename: string) : string[] => {
    const intext = getInputText(filename);
    return intext.split("\n").map(row => row.trim());
}
