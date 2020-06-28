import { attachListeners, showModal } from "./deploy"

(()=>{  
    attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
    showModal()
})()