import {SimpleTopic} from "../SimpleTopic";
import {Topic} from "../Topic";
import {Question} from "../Question";
import {randArray} from "../Utils";

const Names = {
    H_2O: "Su",
    NaHCO_3: "Yemek sodası",
    NaCl: "Sofra tuzu",
    CaCO_3: "Kireç taşı",
    NaOH: "Sud kostik",
    NH_3: "Amonyak",
    "CaSO_2.2H_2O": "Alçı",
    HNO_3: "Kezzap",
    CaO: "Sönmemiş kireç",
    "Na_2CO_3.10H_2O": "Çamaşır sodası",
    CH_3COCH_3: "Aseton",
    HCl: "Tuz ruhu",
    CH_3COOH: "Sirke asidi"
};

const Reversed = {};

for (const k in Names) {
    Reversed[`\\text{${Names[k]}}`] = k.replaceAll("_", "");
    Names[k] = `\\text{${Names[k]}}`;
}

const topic1 = new class extends SimpleTopic {
    name = "";
    trick = {};
    record = Names;
};

const topic2 = new class extends SimpleTopic {
    name = "";
    trick = {};
    record = Reversed;
};

export class SpecialCompoundNames extends Topic {
    name = "Özel Bileşik İsimleri";

    generateQuestion(): Question {
        return randArray([topic1, topic2]).generateQuestion();
    };
}