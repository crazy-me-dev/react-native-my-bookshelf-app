export const isEmailValid = (text: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(text)
}