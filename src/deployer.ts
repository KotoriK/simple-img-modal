import { _attachListeners, showModal } from "./deploy"

(() => {
    if (process.env.NODE_ENV === 'development') {
        _attachListeners(document.querySelectorAll('img'))
    } else {
        _attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
    }
    showModal()
})()