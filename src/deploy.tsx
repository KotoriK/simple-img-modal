import { Modal } from './Modal'
import ReactDOM from 'react-dom'
import React from 'react'
const container = document.getElementById('imgmodal')
const regex = /(http[\S]+) ([0-9]+)w/i
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
    const img = e.target as HTMLImageElement
    if (img.dataset.fullUrl) {
        showModal(img.dataset.fullUrl)
    } else if (img.srcset) {
        let maxPx = 0, maxPxUrl = ''
        img.srcset.split(',').forEach((i) => {
            const result = regex.exec(i)
            if (result.length == 3) {
                let nowPx = parseInt(result[2])
                if (nowPx > maxPx) {
                    maxPx = nowPx
                    maxPxUrl = result[1]
                }
            }
        })
        showModal(maxPxUrl || img.src)
    } else {
        showModal(img.src)
    }

}
export function showModal(imgSrc?: string) {
    updateModal(true, imgSrc)
}
export function updateModal(opacity: boolean, imgSrc?: string) {
    ReactDOM.render(<Modal imgSrc={imgSrc} opacity={opacity} handleChangeOpacity={updateModal} />, container)
}
export function hideModal() {
    ReactDOM.unmountComponentAtNode(container)
}

