// interface for errors that is a json object with keys that are the name of the field and the value is an array of error messages (strings)
export interface FormErrors {
    [key: string]: string[]
}
