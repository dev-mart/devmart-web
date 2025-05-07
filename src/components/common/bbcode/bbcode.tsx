import React, {ReactNode} from 'react';
import {BBobCoreOptions, BBobPlugins} from "@bbob/types";
import render from "@/helpers/bbcode.renderer.helper";

const content = (children: ReactNode, plugins?: BBobPlugins, options?: BBobCoreOptions) =>
    React.Children.map(children,
        (child) => {
            if (typeof child === 'string') {
                return render(child, plugins, options);
            }

            return child
        }
    );

export type BBobReactComponentProps = {
    children: ReactNode
    container?: string
    componentProps?: Record<string, unknown>
    plugins?: BBobPlugins
    options?: BBobCoreOptions
}

export const BBCode = ({
                           container = 'span',
                           componentProps = {},
                           children,
                           plugins = [],
                           options = {},
                       }: BBobReactComponentProps): React.JSX.Element => React.createElement(
    container,
    componentProps,
    content(children, plugins, options),
);


