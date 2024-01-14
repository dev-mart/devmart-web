import React, {FC} from 'react';
import css from "./switch-input.module.css";
import classNames from "classnames";

interface SwitchInputProps {
    value: boolean;
    onChange: (value: boolean) => void;
    name: string;
    id?: string;
    small?: boolean;
}

export const SwitchInput: FC<SwitchInputProps> = ({
                                                      value = false,
                                                      onChange,
                                                      name,
                                                      id = '',
                                                      small = false
                                                  }) => {
    return (
        <label className={classNames(small && css.small, css.switch)}>
            <input
                id={id}
                checked={value}
                name={name}
                type="checkbox"
                onChange={() => onChange(!value)}
            />
            <span className={css.slider}/>
        </label>
    );
}