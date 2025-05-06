/* eslint-disable no-plusplus,no-lonely-if */
import {getUniqAttr, isStringNode, isTagNode, TagNode,} from "@bbob/plugin-helper";

import type {BBobPluginOptions, NodeContent, PresetTagsDefinition, TagNodeObject, TagNodeTree} from "@bbob/types";
import {CSSProperties} from "react";

const isStartsWith = (node: string, type: string) => node[0] === type;

export const toListNodes = (content?: TagNodeTree) => {
    if (content && Array.isArray(content)) {
        return content.reduce<NodeContent[]>((acc, node) => {
            const listItem = acc[acc.length - 1];

            // *Entry
            if (isStringNode(node) && isStartsWith(String(node), "*")) {
                // from '*Entry' to 'Entry'
                const content = String(node).slice(1)

                acc.push(TagNode.create("li", {}, [content]));

                return acc
            }

            // { tag: '*', attrs: {}, content: [] }
            if (isTagNode(node) && TagNode.isOf(node, "*")) {
                acc.push(TagNode.create("li", {}, []));

                return acc
            }

            if (!isTagNode(listItem)) {
                acc.push(node);
                return acc
            }

            if (listItem && isTagNode(listItem) && Array.isArray(listItem.content)) {
                listItem.content = listItem.content.concat(node);

                return acc
            }

            acc.push(node);

            return acc
        }, []);
    }

    return content;
};

const renderUrl = (node: TagNodeObject, render: BBobPluginOptions["render"]) =>
    getUniqAttr(node.attrs)
        ? getUniqAttr(node.attrs)
        : render(node.content || []);

const toNode = (
    tag: string,
    attrs: Record<string, unknown>,
    content?: TagNodeTree
) => TagNode.create(tag, attrs, content);

const toStyle = (style: CSSProperties) => ({style});

function attrsToString<AttrValue = unknown>(values?: Record<string, AttrValue> | null) {
    // To avoid some malformed attributes
    if (values == null) {
        return '';
    }

    return Object.values(values).join(" ");
}

export const defineStyleNode = (tag: string, style: CSSProperties) => (node: TagNodeObject) => toNode(tag, toStyle(style), node.content)

export const defaultTags: PresetTagsDefinition = {
    b: defineStyleNode("span", {fontWeight: "bold"}),
    i: defineStyleNode("span", {fontStyle: "italic"}),
    u: defineStyleNode("span", {textDecoration: 'underline'}),
    s: defineStyleNode("span", {textDecoration: 'line-through'}),
    left: defineStyleNode("div", {textAlign: 'left'}),
    right: defineStyleNode("div", {textAlign: 'right'}),
    center: defineStyleNode("div", {textAlign: 'center'}),
    url: (node, {render}) =>
        toNode(
            "a",
            {
                href: renderUrl(node, render),
                target: "_blank",
                className: "external-link"
            },
            node.content
        ),
    img: (node, {render}) =>
        toNode(
            "img",
            {
                ...node.attrs,
                src: render(node.content),
            },
            null
        ),
    size: (node) => {
        const size = getUniqAttr(node.attrs);
        const sizes: Record<number, string> = {7: "text-2xl", 6: "text-xl", 5: "text-lg", 4: "text-base", 3: "text-sm", 2: "text-xs", 1: "text-xs"};

        if (size) {
            return toNode("span", {className: sizes[size as number]}, node.content);
        }

        return toNode("span", {}, node.content);
    },
    icode: (node) => toNode("span", {class: 'inline-code'}, node.content),
    quote: (node) => toNode("blockquote", {}, [toNode("p", {}, node.content)]),
    br: () => toNode("br", {}, null),
    code: (node) => {
        const title = attrsToString(node.attrs);

        return toNode("code", {title: title}, node.content);
    },
    list: (node) => {
        const type = getUniqAttr(node.attrs);

        return toNode(
            type ? "ol" : "ul",
            type ? {type} : {},
            toListNodes(node.content)
        );
    },
    color: (node) =>
        toNode("span", toStyle({color: (getUniqAttr(node.attrs) ?? 'inherit') as string}), node.content),
    spoiler: (node) => {
        const title = attrsToString(node.attrs);

        const content = node.content;
        if (Array.isArray(content) && content.length === 0) {
            return toNode("div", {}, "");
        }

        return toNode("details", {}, [
            toNode("summary", {}, [title ? `Spoiler: ${title}` : "Spoiler"]),
            toNode("div", {}, node.content),
        ]);
    },
    media: (node, {render}) => {
        const url = `https://www.youtube.com/embed/${render(node.content)}`;

        return toNode("iframe", {
            src: url,
            width: "500",
            height: "300",
            frameBorder: "0",
            allowFullScreen: true,
        }, "");
    }
};

export default defaultTags;