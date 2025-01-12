import {Question} from "./Question";

export abstract class Topic {
    abstract name: string;
    abstract generateQuestion(): Question;
}