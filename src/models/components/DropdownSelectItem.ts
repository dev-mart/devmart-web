export default class DropdownSelectItem {
    text: string;
    helperText?: string | null;
    value?: string | null;
    display: () => boolean;

    constructor(text: string, helperText: string | null = null, value: string | null = null, display: () => boolean = () => true) {
        this.text = text;
        this.helperText = helperText;
        this.value = value;
        this.display = display;
    }
}
