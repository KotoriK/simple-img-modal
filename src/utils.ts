import { useRef, useCallback, useEffect } from "react"

export function useTimeout() {
    const ref = useRef<number[]>()
    const clear = useCallback(() => {
        ref.current.forEach(id => clearTimeout(id))
        ref.current = []
    }, [])
    useEffect(() => {
        ref.current = []
        return clear
    }, [])
    const set = useCallback((handler: () => any, timeout?: number) => {
        ref.current.push(window.setTimeout(
            () => {
                handler()
                ref.current.unshift()
            }, timeout))
    }, [])

    return [set, clear] as const
}