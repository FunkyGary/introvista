export const stringValidation = {
    required: "This field is required",
    validate: (value: unknown) =>
        typeof value === "string" || "Must be a string",
};

export const numberValidation = {
    required: "This field is required",
    validate: (value: unknown) =>
        (typeof value === "number" && !isNaN(value)) || "Must be a number",
};
