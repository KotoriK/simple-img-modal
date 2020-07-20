import { _attachListeners, showModal, setContainer, setImageModal } from "./deploy"
import { ImageModalWithEXIF } from "./ImageModalWithEXIF"
(() => {
    const node =document.createElement('div')
    document.body.appendChild(node)
    setImageModal(ImageModalWithEXIF)
    setContainer(node)
    if (process.env.NODE_ENV === 'development') {
        _attachListeners(document.querySelectorAll('img'))
    } else {
        _attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
    }
    showModal()
})()