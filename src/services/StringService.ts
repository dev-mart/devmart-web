import {NextRouter} from "next/router";


export const getEnumKeys = (enumObject: any): string[] => {
    return Object.keys(enumObject).filter(key => isNaN(Number(key)));
};

export const capFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatMoney = (input: number, withSymbol: boolean = true): string => {
    // format the money with locale nl-NL and currency EUR and only include the symbol if withSymbol is true
    return new Intl.NumberFormat(withSymbol ? 'nl-NL' : 'fr-FR', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: withSymbol ? 'symbol' : 'code'
    }).format(input);
};

export const formatNumber = (input: number): string => {
    return new Intl.NumberFormat('nl-NL').format(input);
};

export const getBase64 = async (file: File): Promise<string | null> => {
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string | null);
        reader.onerror = error => reject(error);
    });
};

export const formatFileSize = (bytes: number, decimals: number = 2): string => {
    // format the file size in bytes to a readable format
    if (bytes === 0) {
        return '0 B';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getWikiSidebarItemName = (router: NextRouter): string => {
    const name = router.pathname.split('/').pop()?.replaceAll(/[-.]/g, ' ');

    // todo add option to provide custom display name through context/props.
    return (!name || name === '' ? 'Introduction' : name);
};
