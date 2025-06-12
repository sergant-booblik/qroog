import { adjectives, colors, NumberDictionary, uniqueNamesGenerator } from 'unique-names-generator';

export function generateUsername(): string {
    const numberDictionary = NumberDictionary.generate({ min: 100, max: 999 });
    return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, numberDictionary],
    });
}