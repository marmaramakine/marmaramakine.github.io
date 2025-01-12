import {Topic} from "../Topic";
import {Question} from "../Question";
import {randArray, toRoman} from "../Utils";

const E = {
    H: "Hidrojen", He: "Helyum", Li: "Lityum", Be: "Berilyum", B: "Bor", C: "Karbon", N: "Azot",
    O: "Oksijen", F: "Flor", Ne: "Neon", Na: "Sodyum", Mg: "Magnezyum", Al: "Alüminyum", Si: "Silisyum",
    P: "Fosfor", S: "Kükürt", Cl: "Klor", Ar: "Argon", K: "Potasyum", Ca: "Kalsiyum", Sc: "Skandiyum",
    Ti: "Titanyum", V: "Vanadyum", Cr: "Krom", Mn: "Manganez", Fe: "Demir", Co: "Kobalt", Ni: "Nikel",
    Cu: "Bakır", Zn: "Çinko", Ga: "Galyum", Ge: "Germanyum", As: "Arsenik", Se: "Selenyum", Br: "Brom",
    Kr: "Kripton", Rb: "Rubidyum", Sr: "Stronsiyum", Y: "İtriyum", Zr: "Zirkonyum", Nb: "Niyobyum",
    Mo: "Molibden", Tc: "Teknesyum", Ru: "Rutenyum", Rh: "Rodyum", Pd: "Paladyum", Ag: "Gümüş",
    Cd: "Kadmiyum", In: "İndiyum", Sn: "Kalay", Sb: "Antimon", Te: "Tellür", I: "İyot", Xe: "Ksenon",
    Cs: "Sezyum", Ba: "Baryum", La: "Lantan", Ce: "Seryum", Pr: "Praseodimiyum", Nd: "Neodimyum",
    Pm: "Prometyum", Sm: "Samaryum", Eu: "Evropiyum", Gd: "Gadolinyum", Tb: "Terbiyum", Dy: "Disprozyum",
    Ho: "Holmiyum", Er: "Erbiyum", Tm: "Tulyum", Yb: "İterbiyum", Lu: "Lutesyum", Hf: "Hafniyum",
    Ta: "Tantal", W: "Tungsten", Re: "Renyum", Os: "Osmiyum", Ir: "İridyum", Pt: "Platin", Au: "Altın",
    Hg: "Cıva", Tl: "Talyum", Pb: "Kurşun", Bi: "Bizmut", Po: "Polonyum", At: "Astatin", Rn: "Röntgenyum",
    Fr: "Fransiyum", Ra: "Radyum", Ac: "Aktinyum", Th: "Toryum", Pa: "Protaktinyum", U: "Uranyum",
    Np: "Neptünyum", Pu: "Plütonyum", Am: "Amerikyum", Cm: "Küriyum", Bk: "Berkelyum", Cf: "Kaliforniyum",
    Es: "Aynştaynyum", Fm: "Fermiyum", Md: "Mendelevyum", No: "Nobelyum", Lr: "Lavrensiyum",
    Rf: "Rutherfordiyum", Db: "Dubniyum", Sg: "Seaborgiyum", Bh: "Bohriyum", Hs: "Hassiyum",
    Mt: "Meitneriyum", Ds: "Darmstadtiyum", Cn: "Kopernikyum", Nh: "Nihoniyum", Fl: "Flerovyum",
    Mc: "Moskoviyum", Lv: "Livermoryum", Ts: "Tennesin", Og: "Oganesson",

    NH4: "Amonyum", CH3COO: "Asetat", CO3: "Karbonat", HCO3: "Bikarbonat", ClO: "Hipoklorit", ClO2: "Klorit",
    ClO3: "Klorat", ClO4: "Perklorat", CrO4: "Kromat", Cr2O7: "Dikromat", CN: "Siyanür", OH: "Hidroksit", NO2: "Nitrit",
    NO3: "Nitrat", C2O4: "Okzalat", MnO4: "Permanganat", PO4: "Fosfat", HPO4: "Hidrojen Fosfat",
    H2PO4: "Dihidrojen Fosfat", SO3: "Sülfit", HSO3: "Bisülfit", SO4: "Sülfat", HSO4: "Bisülfat", S2O3: "Tiyosülfat"
} as const;

const Metals = [
    "Li", "Be", "Na", "Mg", "Al", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Rb",
    "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
    "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au",
    "Hg", "Tl", "Pb", "Bi", "Po", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm",
    "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv"
];

// Positive ions
const I = {
    H: [1], Li: [1], Na: [1], K: [1], Mg: [2], Ca: [2], Ba: [2], Al: [3], Zn: [2], Ag: [1], Sn: [2], Pb: [2],
    /*, Rb: [1], Cs: [1], Sr: [2]*/
    Cr: [2, 3], Fe: [2, 3], Co: [2, 3], Cu: [1, 2], Hg: [1, 2],

    F: [-1], Cl: [-1], Br: [-1], I: [-1], O: [-2], S: [-2], N: [-3],

    NH4: [1], CH3COO: [-1], CO3: [-2], HCO3: [-1], ClO: [-1], ClO2: [-1], ClO3: [-1], ClO4: [-1], CrO4: [-2],
    Cr2O7: [-2], CN: [-1], OH: [-1], NO2: [-1], NO3: [-1], C2O4: [-2], MnO4: [-1], PO4: [-3], HPO4: [-2], H2PO4: [-1],
    SO3: [-2], HSO3: [-1], SO4: [-2], HSO4: [-1], S2O3: [-2]
} as const;

// Ionic, secondary names
const S = {
    H: "Hidrür", F: "Florür", Cl: "Klorür", Br: "Bromür", I: "İyodür", O: "Oksit", S: "Sülfür", N: "Nitrür"
} as const;

export function numFormat(a: string) {
    return a.replaceAll(/\d+/g, m => "_" + m);
}

export function isLong(s: string) {
    return Array.from(s.matchAll(/[A-Z]/g)).length > 1;
}

export function parLong(s: string, i: number) {
    return (isLong(s) && i > 1 ? "(" + s + ")" : s) + ifNum(i);
}

export function ifNum(n: number) {
    return n > 1 ? n.toString() : "";
}

export function gcd(a: number, b: number) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

const N = {
    1: "mono", 2: "di", 3: "tri", 4: "tetra", 5: "penta", 6: "hekza", 7: "hepta", 8: "okta"
} as const;

export function ionicNaming(positive: string, posVal: number, negative: string, negVal: number) {
    const g = gcd(posVal, -negVal);

    const i1 = -negVal / g;
    const i2 = posVal / g;

    return {
        symbol: `${parLong(positive, i1)}${parLong(negative, i2)}`,
        name: `${E[positive]}${I[positive].length > 1 ? ` (${toRoman(posVal)})` : ""} ${S[negative] ?? E[negative]}`
    };
}

const questions = {};

for (const positive in I) {
    const posValues = I[positive];
    for (const negative in I) {
        const negValues = I[negative];

        for (const posValue of posValues) {
            for (const negValue of negValues) {
                if (posValue < 0 || negValue > 0) continue;

                const ionic = ionicNaming(positive, posValue, negative, negValue);

                questions[`\\large ${numFormat(ionic.symbol)}\\text{ bileşiğinin bilimsel adı nedir?}`] = ionic.name;
                questions[`\\large \\text{${ionic.name} bileşiğinin sembolik yazılışı nedir?}`] = ionic.symbol;
            }
        }
    }
}

export class CompoundNaming extends Topic {
    name = "Bileşik Adlandırma";

    generateQuestion(): Question {
        const title = randArray(Object.keys(questions));
        const answer = questions[title];
        return new Question(title, answer, [], 20, "text", !answer.includes(" "));
    };
}