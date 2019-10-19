import { Injectable } from '@angular/core';

import { IApartment, IBuyer } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TrackByService {

  apartment(index: number, apartment: IApartment) {
    return apartment.id;
  }

  buyer(index: number, buyer: IBuyer) {
    return buyer.id;
  }

}
