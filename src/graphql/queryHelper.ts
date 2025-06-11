import type { SuchkriterienInput } from "@graphql/interfaces";

export const buildQuery = (
    suchkriterien: SuchkriterienInput
): string => {
    // Funktion, um Suchkriterien in eine GraphQL-konforme Zeichenkette zu konvertieren
    const buildSuchkriterienString = (criteria: SuchkriterienInput): string => {
        const fields = [];
        if (criteria.titel) fields.push(`titel: "${criteria.titel}"`);
        if (criteria.isbn) fields.push(`isbn: "${criteria.isbn}"`);
        if (criteria.rating !== undefined) fields.push(`rating: ${criteria.rating}`);
        if (criteria.art) fields.push(`art: ${criteria.art}`);
        if (criteria.lieferbar !== undefined) fields.push(`lieferbar: ${criteria.lieferbar}`);
        
        return `{${fields.join(", ")}}`;
    };

    const suchkriterienString = buildSuchkriterienString(suchkriterien);

    return `
    {
        buecher(suchkriterien: ${suchkriterienString}) {
            id
            version
            isbn
            rating
            art
            preis
            lieferbar
            datum
            homepage
            schlagwoerter
            titel {
                titel
                untertitel
            }
            rabatt(short: true)
        }
    }`;
};