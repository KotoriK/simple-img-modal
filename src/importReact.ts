export function importReact() {
    /* if (process.env.NODE_ENV === 'development') { */ return import('react') /* } else {
        return import('https://cdn.jsdelivr.net/npm/react@16.13.1/index.js')
    } */
}
export function importReactDOM() {
    /* if (process.env.NODE_ENV === 'development') { */ return import('react-dom') /* } else {
        return import('https://cdn.jsdelivr.net/gh/KotoriK/parcel-bundled/dist/react-dom.js')
    } */
}
export function importReactBoth(){
    return Promise.all([importReact(),importReactDOM()])
}