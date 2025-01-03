export class Logger {
    log(...data: any[]) {
        console.log("\x1b[32m[PRODUCT SERVICE LOG]\x1b[0m", ...data)
    }

    request(...data: any[]) {
        console.log("\x1b[32m[PRODUCT SERVICE REQUEST]\x1b[0m", ...data)
    }

    error(...data: any[]) {
        console.error("\x1b[31m[PRODUCT SERVICE ERROR]\x1b[0m", ...data)
    }
}