export function Iterator2Array<T>(iterator: IterableIterator<T>): Array<T> {
    const array: Array<T> = []
    for (const item of iterator) {
        array.push(item)
    }
    return array
}