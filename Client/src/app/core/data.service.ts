import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IPagedResults, IApartment, IApartmentResponse, IBuyer } from '../shared/interfaces';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    baseUrl = environment.apiUrl;
    baseApartmentsUrl = this.baseUrl + 'apartments';
    baseBuyersUrl = this.baseUrl + 'buyers';

    constructor(private http: HttpClient) { }
 

  getApartments(): Observable<IApartment[]> {
    return this.http.get<IApartment[]>(this.baseApartmentsUrl)
      .pipe(
        map(apartments => {
          
          return apartments;
        }),
        catchError(this.handleError)
      );
  }


  getBuyers(): Observable<IBuyer[]> {
    return this.http.get<IBuyer[]>(this.baseBuyersUrl)
      .pipe(
        map(buyers => {

         
          return buyers;
        }),
        catchError(this.handleError)
      );
  }


  getApartmentsPage(page: number, pageSize: number): Observable<IPagedResults<IApartment[]>> {
    return this.http.get<IApartment[]>(`${this.baseApartmentsUrl}/page/${page}/${pageSize}`, { observe: 'response' })
      .pipe(
        map((res) => {
          
          const totalRecords = +res.headers.get('x-inlinecount');
          let apartments = res.body as IApartment[];
          return {
            results: apartments,
            totalRecords: totalRecords
          };
        }),
        catchError(this.handleError)
      );
  }


  getApartmentsPageFiltered(page: number, pageSize: number, filterPriceMin: number, filterPriceMax: number, filterAddress: string, filterNbrRooms: number): Observable<IPagedResults<IApartment[]>> {
    return this.http.get<IApartment[]>(`${this.baseApartmentsUrl}/page/${page}/${pageSize}/${filterPriceMin}/${filterPriceMax}/${filterAddress}/${filterNbrRooms}`, { observe: 'response' })
      .pipe(
        map((res) => {

          const totalRecords = +res.headers.get('x-inlinecount');
          let apartments = res.body as IApartment[];
          return {
            results: apartments,
            totalRecords: totalRecords
          };
        }),
        catchError(this.handleError)
      );
  }



  getApartment(id: string): Observable<IApartment> {
    return this.http.get<IApartment>(this.baseApartmentsUrl + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  getBuyer(id: string): Observable<IBuyer> {
    return this.http.get<IBuyer>(this.baseBuyersUrl + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertApartment(apartment: IApartment): Observable<IApartment> {
    return this.http.post<IApartmentResponse>(this.baseApartmentsUrl, apartment)
      .pipe(
        map((data) => {
          console.log('insertApartment status: ' + data.status);
          return data.apartment;
        }),
        catchError(this.handleError)
      );
  }

  updateApartment(apartment: IApartment): Observable<IApartment> {
    console.log("we're here");
    return this.http.put<IApartmentResponse>(this.baseApartmentsUrl + '/' + apartment.id, apartment)
      .pipe(
        map((data) => {
          console.log('updateApartment status: ' + data.status);
          return data.apartment;
        }),
        catchError(this.handleError)
      );
  }

  deleteApartment(id: string): Observable<boolean> {
    
    return this.http.delete<boolean>(this.baseApartmentsUrl + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }


  buyApartment(BuyerId: string, ApartId: string): Observable<boolean> {

    return this.http.get<boolean>(this.baseApartmentsUrl +'/' + BuyerId + '/apartments/' + ApartId)
      .pipe(
        catchError(this.handleError)
      );
  }



    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error); 
        if (error.error instanceof Error) {
          let errMessage = error.error.message;
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'ASP.NET Core server error');
    }

}
