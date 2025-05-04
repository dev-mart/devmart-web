import type {Config} from 'tailwindcss'
import headlessui from '@headlessui/tailwindcss';

const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

export default {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        ".flowbite-react/class-list.json"
    ],
    darkMode: 'media',
    plugins: [
        require('flowbite/plugin'), // generated({prefix: 'ui'})
        headlessui({prefix: 'ui'}),
        flowbiteReact,
    ]
} satisfies Config