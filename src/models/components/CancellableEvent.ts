export default class CancellableEvent {
    private cancelled: boolean;

    constructor(cancelled: boolean = false) {
        this.cancelled = cancelled;
    }

    cancel(cancel: boolean = true): void {
        this.cancelled = cancel;
    }

    isCancelled(): boolean {
        return this.cancelled;
    }
}
