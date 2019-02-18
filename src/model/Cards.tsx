export interface IAttack {
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
}

export interface IWeakness {
    type: string;
    value: string;
}

export interface ICards {
    id: string;
    name: string;
    nationalPokedexNumber: number;
    hp: string;
    imageUrl: string;
    imageUrlHiRes: string;
    types: string[];
    number: string;
    subtype: string;
    supertype: string;
    attacks: IAttack[];
    text: any[];
    weaknesses: IWeakness[];
    resistances: any[];
    retreatCost: string[];
    convertedRetreatCost: number;
    artist: string;
    set: string;
    setCode: string;
    rarity: string;
}