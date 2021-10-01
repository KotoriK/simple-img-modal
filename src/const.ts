export const intlDate = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "full",
    dateStyle: "long"
} as any)