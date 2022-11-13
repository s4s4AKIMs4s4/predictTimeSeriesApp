export const getTickerFromURL = () => {
    if (typeof window !== "undefined") {
        return window.location.href.split('=')[1]
    }
    return null
}