"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideModal = exports._updateModal = exports.showModal = exports.clickHandler = exports._removeListeners = exports._attachListeners = void 0;
const Modal_1 = require("./Modal");
const react_dom_1 = __importDefault(require("react-dom"));
const react_1 = __importDefault(require("react"));
const container = document.getElementById('imgmodal');
const regex = /(http[\S]+) ([0-9]+)w/i;
/**
 * Attach 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
function _attachListeners(nodeList) {
    nodeList.forEach((ele) => {
        ele.addEventListener('click', clickHandler);
    });
}
exports._attachListeners = _attachListeners;
/**
 * Remove 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
function _removeListeners(nodeList) {
    nodeList.forEach((ele) => {
        ele.removeEventListener('click', clickHandler);
    });
}
exports._removeListeners = _removeListeners;
/**
 * Handle clicks on Image
 *
 * @author KotoriK
 * @export
 * @param {Event} e
 */
function clickHandler(e) {
    const img = e.target;
    if (img.dataset.fullUrl) {
        showModal(img.dataset.fullUrl);
    }
    else if (img.srcset) {
        let maxPx = 0, maxPxUrl = '';
        img.srcset.split(',').forEach((i) => {
            const result = regex.exec(i);
            if (result.length == 3) {
                let nowPx = parseInt(result[2]);
                if (nowPx > maxPx) {
                    maxPx = nowPx;
                    maxPxUrl = result[1];
                }
            }
        });
        showModal(maxPxUrl || img.src);
    }
    else {
        showModal(img.src);
    }
}
exports.clickHandler = clickHandler;
function showModal(imgSrc) {
    _updateModal(true, imgSrc);
}
exports.showModal = showModal;
function _updateModal(opacity, imgSrc) {
    react_dom_1.default.render(react_1.default.createElement(Modal_1.Modal, { imgSrc: imgSrc, opacity: opacity, handleChangeOpacity: _updateModal }), container);
}
exports._updateModal = _updateModal;
/**
 * Unload Modal from DOM
 *
 * @author KotoriK
 * @export
 */
function hideModal() {
    react_dom_1.default.unmountComponentAtNode(container);
}
exports.hideModal = hideModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlcGxveS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQStCO0FBQy9CLDBEQUFnQztBQUNoQyxrREFBeUI7QUFDekIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNyRCxNQUFNLEtBQUssR0FBRyx3QkFBd0IsQ0FBQTtBQUV0Qzs7Ozs7O0dBTUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxRQUFpQztJQUM5RCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDckIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUMvQyxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFKRCw0Q0FJQztBQUNEOzs7Ozs7R0FNRztBQUNILFNBQWdCLGdCQUFnQixDQUFDLFFBQWlDO0lBRTlELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNyQixHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQ2xELENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUxELDRDQUtDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsWUFBWSxDQUFDLENBQVE7SUFDakMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQTBCLENBQUE7SUFDeEMsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNyQixTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUNqQztTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtRQUNuQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUM1QixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNoQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzVCLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO29CQUNmLEtBQUssR0FBRyxLQUFLLENBQUE7b0JBQ2IsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDdkI7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ0YsU0FBUyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDakM7U0FBTTtRQUNILFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDckI7QUFFTCxDQUFDO0FBckJELG9DQXFCQztBQUNELFNBQWdCLFNBQVMsQ0FBQyxNQUFlO0lBQ3JDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQUZELDhCQUVDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQWdCLEVBQUUsTUFBZTtJQUMxRCxtQkFBUSxDQUFDLE1BQU0sQ0FBQyw4QkFBQyxhQUFLLElBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFlBQVksR0FBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQzlHLENBQUM7QUFGRCxvQ0FFQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsU0FBUztJQUNyQixtQkFBUSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQzlDLENBQUM7QUFGRCw4QkFFQyJ9