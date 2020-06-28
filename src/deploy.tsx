import { Modal } from './Modal'
import { importReactBoth, importReactDOM } from './importReact'
const container = document.getElementById('imgmodal')
export function attachListeners(nodeList: NodeListOf<HTMLElement>) {
    nodeList.forEach((ele) => {
        ele.addEventListener('click', clickHandler)
    })
}
export function removeListeners(nodeList: NodeListOf<HTMLElement>) {

    nodeList.forEach((ele) => {
        ele.removeEventListener('click', clickHandler)
    })
}
export function clickHandler(e: Event) {
    showModal((e.target as HTMLImageElement).src)
    console.warn((e.target as HTMLImageElement).src)
}
export function showModal(imgSrc?: string) {
    updateModal(true, imgSrc)
}
export function updateModal(opacity: boolean, imgSrc?: string) {
    importReactBoth().then(([React, ReactDOM]) => { ReactDOM.render(<Modal imgSrc={imgSrc} React={React} opacity={opacity} handleChangeOpacity={updateModal} />, container) })
}
export function hideModal() {
    importReactDOM().then((ReactDOM) => {
        ReactDOM.unmountComponentAtNode(container)
    })
}

