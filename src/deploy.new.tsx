import { render, unmountComponentAtNode } from 'react-dom'
import FullscreenImage from './FullscreenImage'
import FloatButton from './FloatButton'
import MetaPannel from './MetaPannel'
import { useRef } from 'react'
var container: HTMLElement
const regex = /(http[\S]+) ([0-9]+)w/i

var lastImg: HTMLImageElement
export function getSrc(img: HTMLImageElement) {
    if (img.dataset.fullUrl) {
        return img.dataset.fullUrl
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
        return maxPxUrl || img.src
    } else {
        return img.src
    }
}

function clickHandler(e: Event) {
    const img = e.target as HTMLImageElement
    if (!lastImg) {
        showModal(img)
    } else if (lastImg != img) {
        hideModal()
        showModal(img)
    }
    lastImg = img
}
const FIModal = ({ img, src }) => {
    const refFloat = useRef<any>()
    const refBtn = useRef<any>()
    return <FullscreenImage
        ref={refFloat}
        img={img}
        src={src}
        onTransitionEnd={() => {
            const func = refBtn.current?.refresh
            if (func) {
                func()
            }
        }}
    >
        <FloatButton
            refFloat={refFloat}
            ref={refBtn}
        >
            <MetaPannel imgSrc={src} />
        </FloatButton>
    </FullscreenImage>
}
export function showModal(img?: HTMLImageElement) {
    const src = getSrc(img)
    render(<FIModal img={img} src={src} />, container)
}
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
}/**
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