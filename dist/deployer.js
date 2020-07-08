"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deploy_1 = require("./deploy");
(() => {
    if (process.env.NODE_ENV === 'development') {
        deploy_1._attachListeners(document.querySelectorAll('img'));
    }
    else {
        deploy_1._attachListeners(document.querySelectorAll('div.entry-content img:not(.avatar)'));
    }
    deploy_1.showModal();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZGVwbG95ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBc0Q7QUFDdEQsQ0FBQyxHQUFHLEVBQUU7SUFDRixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsRUFBRTtRQUN4Qyx5QkFBZ0IsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtLQUNyRDtTQUFNO1FBQ0gseUJBQWdCLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG9DQUFvQyxDQUFDLENBQUMsQ0FBQTtLQUNwRjtJQUNELGtCQUFTLEVBQUUsQ0FBQTtBQUNmLENBQUMsQ0FBQyxFQUFFLENBQUEifQ==