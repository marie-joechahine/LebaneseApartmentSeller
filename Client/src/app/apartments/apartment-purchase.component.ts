import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../core/data.service';
import { IBuyer, IApartment } from '../shared/interfaces';
import { TrackByService } from '../core/trackby.service';
//import { MatDialog, MatDialogRef } from '@angular/material';
import { PurchaseSuccessDialogComponent } from '../purchase-success-dialog/purchase-success-dialog.component';
import { PurchaseFailDialogComponent } from '../purchase-fail-dialog/purchase-fail-dialog.component';


@Component({
  selector: 'apartment-purchase',
  templateUrl: './apartment-purchase.component.html',
  
})
export class ApartmentPurchaseComponent implements OnInit {

  
    errorMessage: string;
    buyers: IBuyer[] = [];
    buyer: IBuyer;
    buyerID: string;
    apartment: IApartment;

    //purchaseSuccessDialogRef: MatDialogRef<PurchaseSuccessDialogComponent>;
    //purchaseFailDialogRef: MatDialogRef<PurchaseFailDialogComponent>;

    constructor(private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    public trackby: TrackByService
      //private dialog: MatDialog
    ) { }



    ngOnInit(): void {
      let id = this.route.snapshot.params['id'];
      this.getApartment(id);
      this.getBuyers();
      
    }


    cancel(event: Event) {
      event.preventDefault();
      console.log('Cancelled?');
      this.router.navigate(['/apartments']);
    }


  purchase(event: Event) {
      event.preventDefault();

      this.dataService.buyApartment(this.buyerID, this.apartment.id)
        .subscribe((status: boolean) => {
          if (status) {

            console.log(status);
            console.log(this.apartment.OwnerId);

            //this.purchaseSuccessDialogRef = this.dialog.open(PurchaseSuccessDialogComponent);

            this.router.navigate(['/success']);
            //this.router.navigate(['/apartments']);
          }
          else {

            //this.purchaseFailDialogRef = this.dialog.open(PurchaseFailDialogComponent);
            
            this.errorMessage = 'Unable to buy apartment'; //not enough credits, or show that before?
            this.router.navigate(['/fail']);
          }
        },
        (err) => console.log(err));
      

    }

  getApartment(id: string) {
    this.dataService.getApartment(id)
      .subscribe((apartment: IApartment) => {
        this.apartment = apartment;
        
      },
        (err) => console.log(err));
  }

  getBuyer(id: string) {
    this.dataService.getBuyer(id)
      .subscribe((buyer: IBuyer) => {
        this.buyer = buyer;

      },
        (err) => console.log(err));
  }
  getBuyers() {
    this.dataService.getBuyers()
      .subscribe((response: IBuyer[]) => {
        this.buyers = response;
        

      },
        (err: any) => console.log(err),
        () => console.log('getBuyers() retrieved buyers'));
  }
}
