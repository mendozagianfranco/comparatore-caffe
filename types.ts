export type Coffee = {
    title: string;
    category: string;
    brand: string;
    origin: string;
    roastLevel?: "Chiaro" | "Medio" | "Scuro";
    price?: number;
    weight?: number;
    caffeineContent: number;
    flavorNotes?: string[];
    intensity: number;
    description: string;
    isDecaf?: boolean;
    imageUrl: string;
};