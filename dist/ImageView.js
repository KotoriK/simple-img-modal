"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Indicator_1 = require("./Indicator");
/**
 * 显示图片
 *
 * @author KotoriK
 * @class FaceView
 * @extends {React.Component<ImageViewProps, ImageViewState>}
 */
class ImageView extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            showIndicator: { level: Indicator_1.IndicateLevel.PRELOAD, style: { ...props.style, width: props.width, height: props.height } },
            loaded: false
        };
    }
    render() {
        return (react_1.default.createElement("div", null,
            this.state.showIndicator && react_1.default.createElement(Indicator_1.Indicator, Object.assign({}, this.state.showIndicator, { style: { ...this.props.style, transition: "opacity 2s ease" }, className: this.props.className })),
            react_1.default.createElement("img", { src: this.props.src, style: { ...this.props.style }, className: this.props.className, onLoad: () => {
                    this.setState({ loaded: true, showIndicator: null });
                }, hidden: !this.state.loaded, onError: () => {
                    this.setState({ showIndicator: { level: Indicator_1.IndicateLevel.ERROR }, loaded: false });
                }, width: this.props.width, height: this.props.height })));
    }
}
exports.default = ImageView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0ltYWdlVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsMkNBQXVFO0FBWXZFOzs7Ozs7R0FNRztBQUNILE1BQXFCLFNBQVUsU0FBUSxlQUFLLENBQUMsU0FBeUM7SUFDbEYsWUFBWSxLQUFxQjtRQUM3QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsYUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLHlCQUFhLENBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxFQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxFQUFFO1lBQzVHLE1BQU0sRUFBRSxLQUFLO1NBQ2hCLENBQUE7SUFDTCxDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sQ0FDSDtZQUNLLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLDhCQUFDLHFCQUFTLG9CQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJO1lBQ3hLLHVDQUFLLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDcEIsS0FBSyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDL0QsTUFBTSxFQUFFLEdBQUcsRUFBRTtvQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDeEQsQ0FBQyxFQUNELE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFO29CQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUseUJBQWEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtnQkFDbkYsQ0FBQyxFQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBTSxDQUMxRSxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBdkJELDRCQXVCQyJ9