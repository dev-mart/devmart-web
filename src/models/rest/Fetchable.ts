import {NextRouter} from "next/router";

export default class Fetchable {
    query: string;
    page: number;
    loading: boolean;
    fetcher: () => Promise<any>;
    lastQuery?: string;
    lastPage?: number;
    router: NextRouter;

    constructor(router: NextRouter, fetcher: () => Promise<any>, query: string = '', page: number = 1) {
        this.router = router;
        this.fetcher = fetcher;
        this.query = query ?? '';
        this.page = page ?? 1;

        this.loading = false;
    }

    canRequest(): boolean {
        return !this.loading && (this.isDifferentQuery() || this.isDifferentPage());
    }

    isDifferentPage(): boolean {
        return this.page == null || this.page !== this.lastPage;
    }

    isDifferentQuery() {
        return this.query == null || this.query !== this.lastQuery;
    }

    async navigateToPage(page: number | string, thisArg: object = this): Promise<void> {
        this.page = typeof page === 'string' ? parseInt(page) : page;
        if (!this.canRequest()) {
            return;
        }

        await this.router.replace({
            query: {
                ...this.router.query,
                page
            }
        });

        await this.fetch(thisArg);
    }

    async fetch(thisArg: object = this): Promise<void> {
        if (this.start()) {
            try {
                await this.fetcher.call(thisArg ?? this);
                this.finish();
            } catch (e) {
                this.finish();
                throw e;
            }
        }
    }

    start(): boolean {
        if (this.canRequest()) {
            this.loading = true;
            this.lastQuery = this.query;
            this.lastPage = this.page;
            return true;
        }
        return false;
    }

    finish(): void {
        this.loading = false;
    }
}
