import {r} from "../Utils";
import {SimpleTopic} from "../SimpleTopic";

export const derivatives = {
    "e^x": "e^x",
    "ln(x)": r`\frac{1}{x}`,
    "sin(x)": r`cos(x)`,
    "cos(x)": r`-sin(x)`,
    "tan(x)": r`sec^2(x)`,
    "cot(x)": r`-csc^2(x)`,
    "csc(x)": r`-csc(x) cot(x)`,
    "sec(x)": r`sec(x) tan(x)`,
    "arcsin(x)": r`\frac{1}{\sqrt{1 - x^2}}`,
    "arccos(x)": r`-\frac{1}{\sqrt{1 - x^2}}`,
    "arctan(x)": r`\frac{1}{1 + x^2}`,
    "arccsc(x)": r`-\frac{1}{|x|\sqrt{x^2 - 1}}`,
    "arcsec(x)": r`\frac{1}{|x|\sqrt{x^2 - 1}}`,
    "arccot(x)": r`-\frac{1}{1 + x^2}`
};

export class DerivativesTopic extends SimpleTopic {
    name = "Türev";
    prefix = r`\frac{d}{dx}\text{ }`;

    record = derivatives;

    trick = {
        "sin(x)": ["-cos(x)"],
        "cos(x)": ["sin(x)"],
        "tan(x)": ["sec(x)"],
        "cot(x)": ["csc^2(x)", "csc(x)"],
        "csc(x)": ["csc(x) cot(x)", "csc(x) tan(x)", "-csc(x) tan(x)"],
        "sec(x)": ["-sec(x) tan(x)", "sec(x) cot(x)", "-sec(x) cot(x)"],
        "arcsin(x)": [r`-\frac{1}{\sqrt{1 - x^2}}`, r`-\frac{1}{\sqrt{x^2 - 1}}`],
        "arccos(x)": [r`\frac{1}{\sqrt{1 - x^2}}`, r`-\frac{1}{\sqrt{x^2 - 1}}`],
        "arctan(x)": [r`-\frac{1}{1 + x^2}`, r`\frac{1}{1 - x^2}`],
        "arccsc(x)": [r`\frac{1}{|x|\sqrt{x^2 - 1}}`, r`-\frac{1}{|x|\sqrt{1 - x^2}}`],
        "arcsec(x)": [r`-\frac{1}{|x|\sqrt{x^2 - 1}}`, r`-\frac{1}{|x|\sqrt{1 - x^2}}`],
        "arccot(x)": [r`\frac{1}{1 + x^2}`, r`-\frac{1}{1 - x^2}`]
    };
}