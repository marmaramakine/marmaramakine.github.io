export function q<T extends Element = HTMLDivElement>(t: string) {
    return <T>document.querySelector(t);
}

export function qAll<T extends Element = HTMLDivElement>(t: string) {
    return <T[]>Array.from(document.querySelectorAll(t));
}

export const r = (t: string | TemplateStringsArray) => typeof t === "string" ? t : t.raw[0];

export function up(s: string) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

export function upd(s: string) {
    return s.split(" ").map(up).join(" ");
}

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randArray<T>(array: T[]): T {
    return array[randInt(0, array.length - 1)];
}

export function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

export function isMobileViewport() {
    return innerWidth <= 768;
}

const romanMap: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
];

export function toRoman(num: number) {
    let roman = "";

    for (let [value, symbol] of romanMap) {
        while (num >= value) {
            roman += symbol;
            num -= value;
        }
    }

    return roman;
}