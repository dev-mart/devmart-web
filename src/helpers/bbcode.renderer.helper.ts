import React, {ReactNode} from "react";
import {render as htmlRender} from "@bbob/html";
import core from "@bbob/core";

import {isEOL, isStringNode, isTagNode, TagNode,} from "@bbob/plugin-helper";

import type {BBobCoreOptions, BBobCoreTagNodeTree, BBobPlugins, TagNodeTree,} from "@bbob/types";
import {Code} from "@/components/common/code/code";

function cleanupBBCodeLineBreaks(bbcodeContent: string) {
    console.log('contenttt', bbcodeContent);

   return bbcodeContent
        // Remove [BR] before or after list tags
       .replace(/(\[\/?(list|LIST)[^\]]*])(\s*)(\[BR])/gi, '$1')
       .replace(/(\[BR])(\s*)(\[\/?(list|LIST)[^\]]*])/gi, '$3')

        // Remove [BR] before or after list item tags
        .replace(/(\[\*])(\s*)(\[BR])/gi, '$1')
        .replace(/(\[BR])(\s*)(\[\*])/gi, '$3')

        // Remove [BR] after list item content
        .replace(/(\[BR])(\s*)(\[\*]|\[\/list])/gi, '$3')

        // Remove [BR] before summary tags
        .replace(/(\[BR])(\s*)(\[spoiler[^]]*])/gi, '$3')

        // Remove [BR] at the beginning of spoiler content
        .replace(/(\[spoiler[^\]]*])(?:\s*\[BR])+/gi, '$1')

        // Remove excessive [BR] tags (more than 2 in a row)
        .replace(/(\[BR]\s*){3,}/gi, '[BR][BR]')

        // Remove [BR] at the beginning or end of the content
        .replace(/^(\s*\[BR]\s*)+/gi, '')
        .replace(/(\s*\[BR]\s*)+$/gi, '');
}

const replaceLineBreaks = (source: string) => {
    source = source.replaceAll("\n", "[BR]");
    return cleanupBBCodeLineBreaks(source);
}

const toAST = (
    source: string,
    plugins?: BBobPlugins,
    options?: BBobCoreOptions
) => core(plugins).process(replaceLineBreaks(source), {
    ...options,
    render: (input) => {
        return htmlRender(input, {stripTags: true});
    },
}).tree;

const isContentEmpty = (content: TagNodeTree) => {
    if (!content) {
        return true;
    }

    if (typeof content === "number") {
        return String(content).length === 0;
    }

    return Array.isArray(content) ? content.length === 0 : !content;
};

function tagToReactElement(node: TagNode, index: number) {
    const children = isContentEmpty(node.content) ? null : renderToReactNodes(node.content);
    if (node.tag === "code") {
        const title = (node.attrs.title || '') as string;

        return React.createElement(Code, {language: title}, children)
    }

    return React.createElement(
        node.tag,
        {...node.attrs, key: index},
        children
    );
}

function renderToReactNodes(nodes?: BBobCoreTagNodeTree | TagNodeTree) {
    if (nodes && Array.isArray(nodes) && nodes.length) {
        return nodes.reduce<ReactNode[]>((arr, node, index) => {
            if (isTagNode(node)) {
                arr.push(tagToReactElement(node, index));
                return arr;
            }

            if (isStringNode(node)) {
                if (isEOL(String(node))) {
                    arr.push(node);
                    return arr;
                }

                const lastIdx = arr.length - 1;
                const prevArr = arr; // stupid eslint
                const prevNode = lastIdx >= 0 ? prevArr[lastIdx] : null;

                if (prevArr[lastIdx] && isStringNode(prevArr[lastIdx]) && prevNode !== null && !isEOL(String(prevNode))) {
                    prevArr[lastIdx] += String(node);

                    return prevArr;
                }

                arr.push(node);
            }

            return arr;
        }, []);
    }
    return [];
}

function render(
    source: string,
    plugins?: BBobPlugins,
    options?: BBobCoreOptions
) {
    return renderToReactNodes(toAST(source, plugins, options));
}

export {render};
export default render;
