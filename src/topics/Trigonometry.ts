import {r} from "../Utils";
import {SimpleTopic} from "../SimpleTopic";

export class TrigTopic extends SimpleTopic {
    name = "Trigonometri";

    record = {
        "sin^2(x) + cos^2(x)": "1",
        "1 - sin^2(x)": "cos^2(x)",
        "1 - cos^2(x)": "sin^2(x)",
        "sec^2(x) - 1": "tan^2(x)",
        "tan^2(x) + 1": "sec^2(x)",
        "2cos^2(x) - 1": "cos(2x)",
        "1 - 2sin^2(x)": "cos(2x)",
        "2sin(x)cos(x)": "sin(2x)",
        "sin(x)cos(x)": r`\frac{1}{2}sin(2x)`,
        "sin^2(x)": r`\frac{1}{2} (1 - cos(2x))`,
        "cos^2(x)": r`\frac{1}{2} (1 + cos(2x))`,
    };

    trick = {
        "sin^2(x) + cos^2(x)": ["sin(x)cos(x)"],
        "1 - sin^2(x)": ["cos(2x)"],
        "1 - cos^2(x)": ["cos(2x)"],
        "sec^2(x) - 1": ["tan(x)"],
        "tan^2(x) + 1": ["sec(x)"],
        "2cos^2(x) - 1": ["sin(2x)"],
        "1 - 2sin^2(x)": ["sin(2x)"],
        "2sin(x)cos(x)": ["cos(2x)"],
        "sin(x)cos(x)": ["2sin(2x)"],
        "sin^2(x)": [r`\frac{1}{2} (1 + cos(2x))`],
        "cos^2(x)": [r`\frac{1}{2} (1 - cos(2x))`],
    };
}