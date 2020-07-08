"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Indicator = exports.IndicateLevel = void 0;
const react_1 = __importDefault(require("react"));
const SVG_PRELOAD = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/Ripple-1.3s-237px.svg";
/* const SVG_WARNING = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/warning.svg"
const SVG_INFO = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/info.svg" */
const SVG_ERROR = "https://cdn.jsdelivr.net/gh/YukiCat-Dev/FacePack/static/error.svg";
var IndicateLevel;
(function (IndicateLevel) {
    IndicateLevel[IndicateLevel["PRELOAD"] = 0] = "PRELOAD";
    /*     INFO ,
        WARNING ,  */
    IndicateLevel[IndicateLevel["ERROR"] = 1] = "ERROR";
})(IndicateLevel = exports.IndicateLevel || (exports.IndicateLevel = {}));
const IndicateLevelSVG = [SVG_PRELOAD, /* SVG_WARNING,SVG_INFO, */ SVG_ERROR];
/**
 *一个指示错误的组件
 *
 * @author KotoriK
 * @export
 * @param {IndicatorProps} props
 * @returns
 */
function Indicator(props) {
    return (react_1.default.createElement("img", { src: IndicateLevelSVG[props.level], alt: props.description, style: props.style }));
}
exports.Indicator = Indicator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0luZGljYXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQTBCO0FBRTFCLE1BQU0sV0FBVyxHQUFHLCtFQUErRSxDQUFBO0FBQ25HO3NGQUNzRjtBQUN0RixNQUFNLFNBQVMsR0FBRyxtRUFBbUUsQ0FBQTtBQUNyRixJQUFZLGFBS1g7QUFMRCxXQUFZLGFBQWE7SUFDckIsdURBQU8sQ0FBQTtJQUNQO3FCQUNpQjtJQUNqQixtREFBSyxDQUFBO0FBQ1QsQ0FBQyxFQUxXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBS3hCO0FBQ0QsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFdBQVcsRUFBQywyQkFBMkIsQ0FBQSxTQUFTLENBQUMsQ0FBQTtBQU0zRTs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsU0FBUyxDQUFDLEtBQXFCO0lBQzNDLE9BQU8sQ0FDSCx1Q0FBSyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFJLENBQzFGLENBQUE7QUFDTCxDQUFDO0FBSkQsOEJBSUMifQ==