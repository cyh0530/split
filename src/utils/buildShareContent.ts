import { SplitCheck } from "@/models";

export const buildShareContent = (splitChecks: SplitCheck[]): ShareData => {
    let text = "";

    for(const check of splitChecks) {
        text += `${check.name}: $${check.totalPrice}\n`
    }

    return {
        text: text
    }
}