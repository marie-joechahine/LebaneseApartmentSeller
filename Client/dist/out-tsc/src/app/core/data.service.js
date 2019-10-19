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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_prod_1 = require("../../environments/environment.prod");
var DataService = /** @class */ (function () {
    function DataService(http) {
        this.http = http;
        this.baseUrl = environment_prod_1.environment.apiUrl;
        this.baseApartmentsUrl = this.baseUrl + 'apartments';
        this.baseBuyersUrl = this.baseUrl + 'buyers';
    }
    DataService.prototype.getApartments = function () {
        return this.http.get(this.baseApartmentsUrl)
            .pipe(operators_1.map(function (apartments) {
            return apartments;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.getBuyers = function () {
        return this.http.get(this.baseBuyersUrl)
            .pipe(operators_1.map(function (buyers) {
            return buyers;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.getApartmentsPage = function (page, pageSize) {
        return this.http.get(this.baseApartmentsUrl + "/page/" + page + "/" + pageSize, { observe: 'response' })
            .pipe(operators_1.map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var apartments = res.body;
            return {
                results: apartments,
                totalRecords: totalRecords
            };
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.getApartmentsPageFiltered = function (page, pageSize, filterPriceMin, filterPriceMax, filterAddress, filterNbrRooms) {
        return this.http.get(this.baseApartmentsUrl + "/page/" + page + "/" + pageSize + "/" + filterPriceMin + "/" + filterPriceMax + "/" + filterAddress + "/" + filterNbrRooms, { observe: 'response' })
            .pipe(operators_1.map(function (res) {
            var totalRecords = +res.headers.get('x-inlinecount');
            var apartments = res.body;
            return {
                results: apartments,
                totalRecords: totalRecords
            };
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.getApartment = function (id) {
        return this.http.get(this.baseApartmentsUrl + '/' + id)
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.getBuyer = function (id) {
        return this.http.get(this.baseBuyersUrl + '/' + id)
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.insertApartment = function (apartment) {
        return this.http.post(this.baseApartmentsUrl, apartment)
            .pipe(operators_1.map(function (data) {
            console.log('insertApartment status: ' + data.status);
            return data.apartment;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.updateApartment = function (apartment) {
        console.log("we're here");
        return this.http.put(this.baseApartmentsUrl + '/' + apartment.id, apartment)
            .pipe(operators_1.map(function (data) {
            console.log('updateApartment status: ' + data.status);
            return data.apartment;
        }), operators_1.catchError(this.handleError));
    };
    DataService.prototype.deleteApartment = function (id) {
        return this.http.delete(this.baseApartmentsUrl + '/' + id)
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.buyApartment = function (BuyerId, ApartId) {
        return this.http.get(this.baseApartmentsUrl + '/' + BuyerId + '/apartments/' + ApartId)
            .pipe(operators_1.catchError(this.handleError));
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            var errMessage = error.error.message;
            return rxjs_1.Observable.throw(errMessage);
        }
        return rxjs_1.Observable.throw(error || 'ASP.NET Core server error');
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map