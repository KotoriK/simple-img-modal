import { attachListeners, showModal } from "./deploy"

(() => {

    if (process.env.NODE_ENV === 'development') {
        attachListeners(document.querySelectorAll('img'))
    } else {
        attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
    }
    showModal()


})()