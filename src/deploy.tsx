import { Modal } from './Modal'
import ReactDOM from 'react-dom'
import React from 'react'
const container = document.getElementById('imgmodal')
const regex = /(http[\S]+) ([0-9]+)w/i

/**
 * Attach 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
export function _attachListeners(nodeList: NodeListOf<HTMLElement>) {
    nodeList.forEach((ele) => {
        ele.addEventListener('click', clickHandler)
    })
}
/**
 * Remove 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
export function _removeListeners(nodeList: NodeListOf<HTMLElement>) {

    nodeList.forEach((ele) => {
        ele.removeEventListener('click', clickHandler)
    })
}

/**
 * Handle clicks on Image
 *
 * @author KotoriK
 * @export
 * @param {Event} e
 */
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
    _updateModal(true, imgSrc)
}

export function _updateModal(opacity: boolean, imgSrc?: string) {
    ReactDOM.render(<Modal imgSrc={imgSrc} opacity={opacity} handleChangeOpacity={_updateModal} />, container)
}

/**
 * Unload Modal from DOM
 *
 * @author KotoriK
 * @export
 */
export function hideModal() {
    ReactDOM.unmountComponentAtNode(container)
}

