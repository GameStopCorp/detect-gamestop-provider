interface Provider {
    isGamestop?: boolean;
}
declare global {
    interface Window {
        ethereum?: Provider;
        gamestop?: Provider;
    }
}
interface DetectOpts {
    timeout: number;
}
declare const detectGamestopProvider: (opts?: DetectOpts) => Promise<unknown>;
export default detectGamestopProvider;
//# sourceMappingURL=index.d.ts.map