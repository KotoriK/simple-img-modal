import { attachListeners, showModal } from "./deploy"

(()=>{  
    attachListeners(document.querySelectorAll('img'))
    showModal()
})()