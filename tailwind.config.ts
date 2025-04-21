import type {Config} from 'tailwindcss'
import headlessui from '@headlessui/tailwindcss';

export default {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
        './src/constants/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                white: '#FFFFFF',
                black: '#000000',
                spigot: '#d8811f',
                discord: '#5865F2',
                primary: {
                    DEFAULT: '#5162D5',
                    50: '#E5E7F9',
                    100: '#D4D9F5',
                    200: '#B4BBED',
                    300: '#939DE5',
                    400: '#7280DD',
                    500: '#5162D5',
                    600: '#2E41C0',
                    700: '#233292',
                    800: '#182265',
                    900: '#0E1338'
                },
                gray: {
                    250: '#ececec',
                }
            }
        }
    },
    plugins: [
        require('flowbite/plugin'),
        headlessui({prefix: 'ui'}),
        // generated({prefix: 'ui'})
    ]
} satisfies Config
