import { render, unmountComponentAtNode } from 'react-dom'
import { ComponentClass, FunctionComponent, createElement } from 'react'
import { ImageModalProps } from './ImageModalProp'
var container: HTMLElement
var usingModal: ComponentClass<ImageModalProps> | FunctionComponent<ImageModalProps>
const regex = /(http[\S]+) ([0-9]+)w/i

/**
 * Attach 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
export function attachListeners(nodeList: NodeListOf<HTMLElement>) {
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
export function removeListeners(nodeList: NodeListOf<HTMLElement>) {
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
        return
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
        return
    } else {
        showModal(img.src)
    }

}
export function showModal(imgSrc?: string) {
    _updateModal(true, imgSrc)
}
function _updateModal(show: boolean, src?: string) {
    render(createElement(usingModal, {
        src,
        open: show,
        onClose: () => _updateModal(false,src)
    }), container)
}
/**
 * Unload Modal from DOM
 *
 * @author KotoriK
 * @export
 */
export function hideModal() {
    unmountComponentAtNode(container)
}
export function setContainer(newContainer: HTMLElement) {
    container = newContainer
}
export function setImageModal(usingImageModal: ComponentClass<ImageModalProps> | FunctionComponent<ImageModalProps>) {
    usingModal = usingImageModal
}