export const isMobile = (
    testDevices: string = 'iPhone|iPod|Android|ipad|windows phone|IEMobile|webOS|BlackBerry',
) =>
    typeof window !== 'undefined'
        ? new RegExp(testDevices, 'i').test(navigator.userAgent)
        : false;