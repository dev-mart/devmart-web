import {FieldsManager} from "@/store/hooks/fields-manager/fields-manager.interface";
import {FormOnBlur, NameValuePair} from "@/store/hooks/form/store.interface";

export type OnChange = (input: NameValuePair<string>) => void;

export type FormRowProps<FieldName extends string> = {
    fm: FieldsManager<FieldName>;
    onChange: OnChange,
    onBlur: FormOnBlur
}