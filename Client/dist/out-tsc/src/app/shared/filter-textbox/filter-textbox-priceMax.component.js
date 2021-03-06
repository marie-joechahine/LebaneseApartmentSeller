"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterTextboxPriceMaxComponent = /** @class */ (function () {
    function FilterTextboxPriceMaxComponent() {
        this.model = { filter: null };
        this.changed = new core_1.EventEmitter();
    }
    FilterTextboxPriceMaxComponent.prototype.filterChangedPriceMax = function (event) {
        event.preventDefault();
        this.changed.emit(this.model.filter); //Raise changed event
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FilterTextboxPriceMaxComponent.prototype, "changed", void 0);
    FilterTextboxPriceMaxComponent = __decorate([
        core_1.Component({
            selector: 'filter-textbox-PriceMax',
            template: "\n    <form>\n         Filter:\n         <input type=\"text\" name=\"filter\"\n                [(ngModel)]=\"model.filter\" \n                (keyup)=\"filterChangedPriceMax($event)\"  />\n    </form>\n  "
        })
    ], FilterTextboxPriceMaxComponent);
    return FilterTextboxPriceMaxComponent;
}());
exports.FilterTextboxPriceMaxComponent = FilterTextboxPriceMaxComponent;
//# sourceMappingURL=filter-textbox-priceMax.component.js.map