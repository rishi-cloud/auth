import Rules from "./Rules";
export const DisplayRules = ({ passwordRules, PasswordPolicyState }) => {
    const ruleMap =
        passwordRules &&
        Rules({
            count: passwordRules?.password_complexity_options?.min_length,
        });
    const displayAbleRule = [];
    const getKeys = [];
    if (passwordRules?.passwordPolicy === "good") {
        for (const key of Object.keys(PasswordPolicyState)) {
            if (key !== "No_more_than_2_identical_characters_in_a_row") {
                getKeys.push(key);
                displayAbleRule.push(ruleMap[key]);
            }
        }
    }
    return { getKeys, displayAbleRule };
};
