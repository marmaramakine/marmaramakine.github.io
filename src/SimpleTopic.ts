import {r, randArray, shuffle} from "./Utils";
import {Topic} from "./Topic";
import {Question} from "./Question";

export abstract class SimpleTopic extends Topic {
    abstract name: string;
    abstract record: Record<string, string>;
    abstract trick: Record<string, string[]>;
    prefix = "";
    suffix = r` =\text{ ?}`;
    answerSuffix = "";
    max = 6;
    time = 10;

    generateQuestion() {
        const question = randArray(Object.keys(this.record));

        const answer = this.record[question];

        const trick = randArray(this.trick[question] || []);

        const options = shuffle([...new Set([
            ...(trick ? [trick] : []),
            answer,
            ...shuffle(Object.values(this.record))
                .filter((option: string) => option !== answer && option !== question)
                .slice(0, this.max - 1 - +!!trick)
        ])]).map(i => i + this.answerSuffix);

        return new Question(this.prefix + question + this.suffix, answer + this.answerSuffix, options, this.time);
    };
}