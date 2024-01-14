import type {Config} from 'tailwindcss'
import generated from '@headlessui/tailwindcss';

const config: Config = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
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
                neutral: {
                    0: '#FFFFFF',
                    50: '#F5F7FA',
                    75: '#f5f5f5',
                    100: '#E4E7EB',
                    200: '#CBD2D9',
                    300: '#9AA5B1',
                    400: '#7B8794',
                    500: '#616E7C',
                    600: '#52606D',
                    700: '#3E4C59',
                    800: '#323F4B',
                    900: '#1F2933'
                },

                gray: {
                    50: '#f9fafb',
                    75: '#f8f9f9',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    250: '#ececec',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827'
                },

                indigo: {
                    50: '#E0E8F9',
                    100: '#BED0F7',
                    200: '#98AEEB',
                    300: '#7B93DB',
                    400: '#647ACB',
                    500: '#4C63B6',
                    600: '#4055A8',
                    700: '#35469C',
                    800: '#2D3A8C',
                    900: '#19216C'
                },

                red: {
                    50: '#FFEEEE',
                    100: '#FACDCD',
                    200: '#F29B9B',
                    300: '#E66A6A',
                    400: '#D64545',
                    500: '#BA2525',
                    600: '#A61B1B',
                    700: '#911111',
                    800: '#780A0A',
                    900: '#610404'
                },

                yellow: {
                    50: '#FFFAEB',
                    100: '#FCEFC7',
                    200: '#F8E3A3',
                    300: '#F9DA8B',
                    400: '#F7D070',
                    500: '#E9B949',
                    600: '#C99A2E',
                    700: '#A27C1A',
                    800: '#7C5E10',
                    900: '#513C06'
                },

                green: {
                    50: '#E3F9E5',
                    100: '#C1EAC5',
                    200: '#A3D9A5',
                    300: '#7BC47F',
                    400: '#57AE5B',
                    500: '#3F9142',
                    600: '#2F8132',
                    700: '#207227',
                    800: '#0E5814',
                    900: '#05400A'
                }
            }
        }
    },
    plugins: [
        require('flowbite/plugin'),
        generated({prefix: 'ui'})
    ]
}
export default config
