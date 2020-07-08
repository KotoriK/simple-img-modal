"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const react_1 = __importDefault(require("react"));
const ImageView_1 = __importDefault(require("./ImageView"));
function Modal(props) {
    const opacity = props.imgSrc && props.opacity;
    return (react_1.default.createElement("div", { onClick: () => props.handleChangeOpacity(false, props.imgSrc), style: {
            opacity: opacity ? 1 : 0,
            visibility: (opacity ? 'visible' : 'hidden'),
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.50)',
            transition: 'all 550ms cubic-bezier(0.25,0.1,0.25,1)'
        } },
        react_1.default.createElement("div", { style: { margin: '0.8rem', overflow: 'auto', maxHeight: '98vh' } },
            react_1.default.createElement(ImageView_1.default, { key: (props.imgSrc ? props.imgSrc : '#').split('/').pop(), src: props.imgSrc, width: '100%', height: '100%' }))));
}
exports.Modal = Modal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvTW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtEQUEwQjtBQUMxQiw0REFBb0M7QUFPcEMsU0FBZ0IsS0FBSyxDQUFDLEtBQWlCO0lBRW5DLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQTtJQUM3QyxPQUFPLENBQUMsdUNBQ0osT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUM3RCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUM1QyxRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUsQ0FBQztZQUNOLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLGVBQWUsRUFBRSxxQkFBcUI7WUFDdEMsVUFBVSxFQUFFLHlDQUF5QztTQUN4RDtRQUdELHVDQUFLLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQ2pFLDhCQUFDLG1CQUFTLElBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sR0FBRyxDQUNwSCxDQUNILENBQ1AsQ0FBQTtBQUNKLENBQUM7QUE1QkQsc0JBNEJDIn0=