import { attachListeners, setContainer,  } from "./deploy.new"
const node = document.createElement('div')
document.body.appendChild(node)
setContainer(node)
if (process.env.NODE_ENV === 'development') {
    attachListeners(document.querySelectorAll('img'))
} else {
    attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'))
}
