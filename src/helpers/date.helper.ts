export const offset = (numDays: number, date: Date = new Date()) => {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(daysAgo.getDate() + numDays);
    return daysAgo;
};


export const isBefore = (toCheck: Date, beforeDate: Date) => {
    return toCheck.getTime() <= beforeDate.getTime();
};

export const isAfter = (toCheck: Date, afterDate: Date) => {
    return toCheck.getTime() >= afterDate.getTime();
};

export const diffInDays = (date1: Date, date2: Date) => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
};

export const formatDate = (date: Date) => {
    // format the date in format Month Day, e.g. January 1
    return new Intl.DateTimeFormat('en-US', {month: 'long', day: 'numeric'}).format(date);
};

export const formatTimeLeft = (date: Date, firstOnly: boolean = false) => {
    const now = new Date();

    // show in hh:mm:ss format
    const diff = Math.abs(date.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 3600 * 24));
    const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
        if (firstOnly) return `${days} day${days > 1 ? 's' : ''} left`;
        return `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    } else if (hours > 0) {
        if (firstOnly) return `${hours} hour${hours > 1 ? 's' : ''} left`;
        return `${hours}h ${minutes}m ${seconds}s left`;
    } else if (minutes > 0) {
        if (firstOnly) return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
        return `${minutes}m ${seconds}s left`;
    } else {
        if (firstOnly) return `${seconds} second${seconds > 1 ? 's' : ''} left`;
        return `${seconds}s left`;
    }
};

export const formatTimeAgo = (date: Date) => {
    const now = new Date();

    const diff = Math.abs(now.getTime() - date.getTime());
    const minutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
    const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
    const days = Math.floor(diff / (1000 * 3600 * 24));
    const weeks = Math.floor(diff / (1000 * 3600 * 24 * 7));
    const months = Math.floor(diff / (1000 * 3600 * 24 * 30));
    const years = Math.floor(diff / (1000 * 3600 * 24 * 365));

    if (years >= 1) {
        `${years} year${years > 1 ? 's' : ''} ago`
    }
    if (months >= 1) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    if (weeks >= 1) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (days >= 1) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours >= 1) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes <= 2) {
        return 'Just now';
    }
    return `${minutes} minutes ago`;
};

export const formatDateRelatively = (date: Date, withTime: boolean = false) => {
    // format the date relatively to today, including the time in 12h format.
    // e.g. Today at 12:00 PM, Yesterday at 12:00 PM, August 24 at 12:00 PM, or when over a year: January 1, 2020 at 12:00 PM
    const today = new Date();
    let diff = diffInDays(date, today);
    if (diff <= 1) {
        // check if the date is today or yesterday
        diff = (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) ? 1 : 2;
    }

    if (diff <= 1) {
        return `Today${withTime ? ' at ' + formatTime(date) : ''}`;
    } else if (diff <= 2) {
        return `Yesterday${withTime ? ' at ' + formatTime(date) : ''}`;
    } else if (diff < 365) {
        return `${formatDate(date)}${withTime ? ' at ' + formatTime(date) : ''}`;
    } else {
        return `${formatDate(date)}, ${date.getFullYear()}${withTime ? ' at ' + formatTime(date) : ''}`;
    }
};

export const formatTime = (date: Date) => {
    // format the time in 12h format, e.g. 12:00 PM
    return new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', hour12: true}).format(date);
};

export const formatDateTime = (date: Date, withYear: boolean = false) => {
    return `${formatDate(date)}${withYear ? `, ${date.getFullYear()}` : ''} at ${formatTime(date)}`;
};