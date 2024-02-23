/**
 * Check if the value is not empty
 * @param value Value to be checked
 */
const hasValue = (value: string): boolean => {
    return (value || '').trim().length > 0;
}

/**
 * Check if the value is at least the given length
 * @param length Length to be at least
 */
const minLength = (length: number) => (value: string): boolean => {
    return (value || '').trim().length >= length;
}

/**
 * Check if the value is at most the given length
 * @param length Length to be at most
 */
const maxLength = (length: number) => (value: string): boolean => {
    let trim = (value || '').trim();
    return trim.length > 0 && trim.length <= length;
}

/**
 * Check if the value is exactly the same length as the given length
 * @param length Length to equal to
 */
const isLength = (length: number) => (value: string): boolean => {
    return (value || '').trim().length === length;
}

/**
 * Check if the value is a valid alpha string (only letters)
 * @param value Value to be checked
 */
const isAlpha = (value: string): boolean => {
    return /^[A-Za-z]+$/.test((value || '').trim());
}

/**
 * Check if the value is a valid number
 * @param value Value to be checked
 */
const isNumeric = (value: string): boolean => {
    return /^[0-9]+$/.test((value || '').trim());
}

/**
 * Check if the value is a valid password
 * The password must have at least 6 characters and at most 30 characters
 * @param value Value to be checked
 */
const isPassword = (value: string): boolean => {
    // minimum 6 characters, maximum 30 characters, minimum 1 number
    return /^(?=.*[0-9]).{6,30}$/.test((value || '').trim());
}

/**
 * Check if the value is a valid email
 * @param value Value to be checked
 */
const isEmail = (value: string): boolean => {
    const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z0-9][a-zA-Z\-0-9]*\.)+[a-zA-Z]{2,}))$/.test((value || '').trim());
    return isValid && maxLength(50)(value);
}

/**
 * Check if the value is a valid date in the format yyyy-mm-dd
 * Following the ISO 8601 standard
 * @param value Value to be checked
 */
const isDate = (value: string): boolean => {
    const isFormatted = /^\d{4}-\d{1,2}-\d{1,2}$/.test(value);
    const yyyymmdd = value.split('-');
    const yyyy = parseInt(yyyymmdd[0], 10);
    const mm = parseInt(yyyymmdd[1], 10);
    const dd = parseInt(yyyymmdd[2], 10);
    const date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
    const dateExists = mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear();
    return isFormatted && dateExists;
}

/**
 * Check if the value is a valid username.
 * Only alphanumeric characters and underscores and hyphens are allowed.
 * @param value
 */
const isUsername = (value: string): boolean => {
    return /^[a-zA-Z0-9_-]{3,50}$/.test((value || '').trim());
}

export {
    hasValue,
    minLength,
    maxLength,
    isLength,
    isAlpha,
    isNumeric,
    isPassword,
    isEmail,
    isDate,
    isUsername
}