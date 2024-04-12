import type {Config} from 'tailwindcss'
import generated from '@headlessui/tailwindcss';

const config: Config = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/constants/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            borderWidth: {
                3: '3px'
            },
            zIndex: {
                1: '1'
            },
            width: {
                22: '5.5rem'
            },
            height: {
                22: '5.5rem'
            },
            fontFamily: {
                roboto: ['Roboto', 'Arial', 'sans-serif'],
                mono: ['monospace', 'Arial', 'sans-serif'],
                poppins: ['Poppins', 'Roboto', 'Arial', 'sans-serif']
                // 'sans': ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
            },
            minWidth: {
                1: '0.25rem',
                2: '0.5rem',
                3: '0.75rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.75rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                24: '6rem',
                60: '15rem'
            },
            minHeight: {
                'screen-1/2': '50vh',
                1: '0.25rem',
                2: '0.5rem',
                3: '0.75rem',
                4: '1rem',
                5: '1.25rem',
                6: '1.5rem',
                7: '1.75rem',
                8: '2rem',
                9: '2.25rem',
                10: '2.5rem',
                11: '2.75rem',
                12: '3rem',
                24: '6rem'
            },
            listStyleType: {
                square: 'square',
                circle: 'circle'
            },
            textDecorationStyle: {
                none: 'none'
            },
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
            }
        }
    },
    plugins: [
        require('flowbite/plugin'),
        generated({prefix: 'ui'})
    ]
}
export default config
