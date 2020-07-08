/**
 * Attach 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
export declare function _attachListeners(nodeList: NodeListOf<HTMLElement>): void;
/**
 * Remove 'clickHandler' for each element in nodeList
 *
 * @author KotoriK
 * @export
 * @param {NodeListOf<HTMLElement>} nodeList
 */
export declare function _removeListeners(nodeList: NodeListOf<HTMLElement>): void;
/**
 * Handle clicks on Image
 *
 * @author KotoriK
 * @export
 * @param {Event} e
 */
export declare function clickHandler(e: Event): void;
export declare function showModal(imgSrc?: string): void;
export declare function _updateModal(opacity: boolean, imgSrc?: string): void;
/**
 * Unload Modal from DOM
 *
 * @author KotoriK
 * @export
 */
export declare function hideModal(): void;
//# sourceMappingURL=deploy.d.ts.map