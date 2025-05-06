interface BBCodeParsers {
    [key: string]: {
        pattern: RegExp,
        replace: string,
        content: string
    };
}

const parsers: BBCodeParsers = {
    bold: {
        pattern: /\[b](.*?)\[\/b]/s,
        replace: '<strong>$1</strong>',
        content: '$1'
    },
    italic: {
        pattern: /\[i](.*?)\[\/i]/s,
        replace: '<em>$1</em>',
        content: '$1'
    },
    underline: {
        pattern: /\[u](.*?)\[\/u]/s,
        replace: '<u>$1</u>',
        content: '$1'
    },
    linethrough: {
        pattern: /\[s](.*?)\[\/s]/s,
        replace: '<span class="line-through">$1</span>',
        content: '$1'
    },
    'size-header-3': {
        pattern: /\[size=(6)](.*?)\[\/size]/s,
        replace: '<h2>$2</h2>',
        content: '$2'
    },
    'size-header-4': {
        pattern: /\[size=(5)](.*?)\[\/size]/s,
        replace: '<h3>$2</h3>',
        content: '$2'
    },
    size: {
        pattern: /\[size=([1-4|7])](.*?)\[\/size]/s,
        replace: '<div class="md-size-$1">$2</div>',
        content: '$2'
    },
    color: {
        pattern: /\[color=(#[A-f0-9]{6}|#[A-f0-9]{3})](.*?)\[\/color]/s,
        replace: '<span style="color: $1">$2</span>',
        content: '$2'
    },
    center: {
        pattern: /\[center](.*?)\[\/center]/s,
        replace: '<div style="text-align:center;">$1</div>',
        content: '$1'
    },
    left: {
        pattern: /\[left](.*?)\[\/left]/s,
        replace: '<div style="text-align:left;">$1</div>',
        content: '$1'
    },
    right: {
        pattern: /\[right](.*?)\[\/right]/s,
        replace: '<div style="text-align:right;">$1</div>',
        content: '$1'
    },
    quote: {
        pattern: /\[quote](.*?)\[\/quote]/s,
        replace: '<blockquote>$1</blockquote>',
        content: '$1'
    },
    namedquote: {
        pattern: /\[quote=(.*?)](.*)\[\/quote]/s,
        replace: '<blockquote><small>$1</small>$2</blockquote>',
        content: '$2'
    },
    link: {
        pattern: /\[url](.*?)\[\/url]/s,
        replace: '<a href="$1" target="_blank">$1</a>',
        content: '$1'
    },
    namedlink: {
        pattern: /\[url=(.*?)](.*?)\[\/url]/s,
        replace: '<a href="$1">$2</a>',
        content: '$2'
    },
    image: {
        pattern: /\[img](.*?)\[\/img]/s,
        replace: '<img src="$1" alt="Image">',
        content: '$1'
    },
    orderedlistnumerical: {
        pattern: /\[list=1](.*?)\[\/list]/s,
        replace: '<ol>$1</ol>',
        content: '$1'
    },
    orderedlistalpha: {
        pattern: /\[list=a](.*?)\[\/list]/s,
        replace: '<ol type="a">$1</ol>',
        content: '$1'
    },
    unorderedlist: {
        pattern: /\[list](.*?)\[\/list]/s,
        replace: '<ul>$1</ul>',
        content: '$1'
    },
    listitem: {
        pattern: /\[\*](.*)/g,
        replace: '<li>$1</li>',
        content: '$1'
    },
    'code-title': {
        pattern: /\[code=(.*?)](.*?)\[\/code]/s,
        replace: `<div class="code-container">
                        <div class="type">$1</div>
                        <div class="code">$2</div>
                    </div>`,
        content: '$2'
    },
    code: {
        pattern: /\[code](.*?)\[\/code]/s,
        replace: `<div class="code-container">
                            <div class="type">Code</div>
                            <div class="code">$1</div>
                        </div>`,
        content: '$1'
    },
    'spoiler-title': {
        pattern: /\[spoiler=(.*?)](.*?)\[\/spoiler]/s,
        replace: `<div class="spoiler-container">
                    <button type="button" class="spoiler-button" title="Click to hide or reveal the spoiler">
                        Spoiler: $1
                    </button>
                    <div class="spoiler-content hidden">$2</div>
                </div>`,
        content: '$2'
    },
    spoiler: {
        pattern: /\[spoiler](.*?)\[\/spoiler]/s,
        replace: `<div class="spoiler-container">
                        <button type="button" class= "spoiler-button" title="Click to hide or reveal the spoiler">
                            Spoiler
                        </button>
                        <div class="spoiler-content hidden">$1</div>
                    </div>`,
        content: '$1'
    },
    'media-youtube': {
        pattern: /\[media=youtube](.*?)\[\/media]/s,
        replace: '<iframe class="media-yt" width="560" height="315" src="//www.youtube.com/embed/$1" allowfullscreen></iframe>',
        content: '$1'
    },
    youtube: {
        pattern: /\[youtube](.*?)\[\/youtube]/s,
        replace: '<iframe class="media-yt" width="560" height="315" src="//www.youtube.com/embed/$1" allowfullscreen></iframe>',
        content: '$1'
    },
    linebreak: {
        pattern: /(\r?)\n/g,
        replace: '<br />',
        content: ''
    },
    icode: {
        pattern: /\[icode](.*?)\[\/icode]/s,
        replace: '<span class="icode">$1</span>',
        content: '$1'
    }
};


export const parseBBCode = (source: string) => {
    source = source.replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")

    for (const [, tag] of Object.entries(parsers)) {
        const pattern = new RegExp(tag.pattern, tag.pattern.flags + 'i');
        while (pattern.test(source)) {
            source = source.replace(pattern, tag.replace);
        }
    }
    return replaceBreaks(source);
};

export const replaceBreaks = (source: string) => {
    return source
        // .replaceAll(/(<\/div>)( *)(<br\s*\/?>)( *)(<div)/g, '</div><div')
        .replaceAll(/(<\/div>)( *)(<br\s*\/?>)( *)(<\/div)/g, '</div></div')
        .replaceAll(/(<\/?ul>)( *)(<br\s*\/?>)/g, '$1')
        .replaceAll(/(<br\s*\/?>)( *)(<(\/?)ul>)/g, '<$4ul>')
        .replaceAll(/(<li>)( *)(<br\s*\/?>)/g, '<li>')
        .replaceAll(/(<br\s*\/?>)( *)(<li>)/g, '<li>')
        .replaceAll(/(<br\s*\/?>)( *)(<\/li>)/g, '</li>')
        .replaceAll(/(<\/summary>)( *)(<div>)( *)(<br\s*\/?>)/g, '$1$2$3$4')
        .replaceAll(/(spoiler-container">( *)<br\s*\/?>)/g, 'spoiler-container">')
        .replaceAll(/(code-container">( *)<br\s*\/?>)/g, 'code-container">')
        .replaceAll(/(spoiler">( *)<br\s*\/?>)/g, 'spoiler">')
        .replaceAll(/(class="code">( *)<br\s*\/?>)/g, 'class="code">')
        .replaceAll(/(<br\s*\/?>( *)<div class="spoiler-content)/g, '<div class="spoiler-content');
};

export const stripBBCodeTags = (source: string) => {
    for (const tag of Object.values(parsers)) {
        source = source.replaceAll(tag.pattern + 'i', tag.content);
    }
    return source;
};
