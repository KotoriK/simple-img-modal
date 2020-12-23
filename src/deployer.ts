import { attachListeners, showModal, setContainer, setImageModal } from "./deploy"
import { ImageModalWithEXIF } from "./ImageModalWithEXIF"
(() => {
    const node =document.createElement('div')
    document.body.appendChild(node)
    setImageModal(ImageModalWithEXIF)
    setContainer(node)
    if (process.env.NODE_ENV === 'development') {
        attachListeners(document.querySelectorAll('img'))
    } else {
        attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
    }
    showModal()
})()