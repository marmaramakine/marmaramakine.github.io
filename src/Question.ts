export class Question {
    constructor(
        public title: string,
        public answer: string,
        public options: string[],
        public normalTime: number,
        public input: "options" | "text" = "options",
        public caseSensitive = true
    ) {
    }
}