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
var router_1 = require("@angular/router");
var data_service_1 = require("../core/data.service");
var ApartmentEditComponent = /** @class */ (function () {
    function ApartmentEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.apartment = {
            //Id: 0,
            title: '',
            address: '',
            nbrRooms: 0,
            price: 0,
            OwnerId: 0
        };
        this.operationText = 'Insert';
    }
    ApartmentEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getApartment(id);
        }
        //this.getStates();
    };
    ApartmentEditComponent.prototype.getApartment = function (id) {
        var _this = this;
        this.dataService.getApartment(id)
            .subscribe(function (apartment) {
            _this.apartment = apartment;
        }, function (err) { return console.log(err); });
    };
    //getStates() {
    //  this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
    //}
    ApartmentEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.apartment.id) {
            this.dataService.updateApartment(this.apartment)
                .subscribe(function (apartment) {
                if (apartment) {
                    _this.router.navigate(['/apartments']);
                }
                else {
                    _this.errorMessage = 'Unable to save apartment';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertApartment(this.apartment)
                .subscribe(function (apartment) {
                if (apartment) {
                    _this.router.navigate(['/apartments']);
                }
                else {
                    _this.errorMessage = 'Unable to add apartment';
                }
            }, function (err) { return console.log(err); });
        }
    };
    ApartmentEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/']);
    };
    ApartmentEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteApartment(this.apartment.id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/apartments']);
            }
            else {
                _this.errorMessage = 'Unable to delete apartment';
            }
        }, function (err) { return console.log(err); });
    };
    ApartmentEditComponent = __decorate([
        core_1.Component({
            selector: 'apartment-edit',
            templateUrl: './apartment-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService])
    ], ApartmentEditComponent);
    return ApartmentEditComponent;
}());
exports.ApartmentEditComponent = ApartmentEditComponent;
//# sourceMappingURL=apartment-edit.component.js.map