import {derivatives} from "./Derivatives";
import {r} from "../Utils";
import {SimpleTopic} from "../SimpleTopic";

export class IntegralsTopic extends SimpleTopic {
    name = "İntegral";

    prefix = r`\int `;
    suffix = r` dx =\text{ ?}`;
    answerSuffix = " + C";

    record = {
        "sec(x)": "ln|sec(x) + tan(x)|",
        "csc(x)": "-ln|csc(x) + cot(x)|",
        "cot(x)": "ln|sin(x)|",
        "tan(x)": "-ln|cos(x)|",
        [r`\frac{1}{x}`]: "ln|x|"
    };

    trick = {
        "sec(x)": ["ln|sec(x) + cot(x)|", "-ln|sec(x) + tan(x)|"],
        "csc(x)": ["ln|csc(x) + cot(x)|", "-ln|csc(x) + tan(x)|"],
        "cot(x)": ["ln|cos(x)|", "-ln|sin(x)|"],
        "tan(x)": ["-ln|sin(x)|", "ln|cos(x)|"]
    };

    constructor() {
        super();

        const allDerivatives = Object.keys(derivatives);

        for (const question in derivatives) {
            const answer = derivatives[question];

            this.record[answer] = question;

            this.trick[answer] = allDerivatives;
        }
    };
}