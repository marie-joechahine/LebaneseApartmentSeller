import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../core/data.service';
import { IApartment} from '../shared/interfaces';


@Component({
  selector: 'apartment-edit-reactive',
  templateUrl: './apartment-edit-reactive.component.html'
})
export class ApartmentEditReactiveComponent implements OnInit {

  apartmentForm: FormGroup;
  apartment: IApartment = {
    //Id: 0,
    title: '',
    address: '',
    nbrRooms: 0,
    price: 0,
    OwnerId: 0
  };

  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  priceEnabled: boolean = false;
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.priceEnabled = false;

    let id = this.route.snapshot.params['id'];

    if (id !== '0') {
      this.operationText = 'Update';
      this.priceEnabled = true;
      this.getApartment(id);
    }

    this.buildForm();
    
  }

  getApartment(id: string) {
      this.dataService.getApartment(id)
        .subscribe((apartment: IApartment) => {
          this.apartment = apartment;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
        this.apartmentForm = this.formBuilder.group({
      //Id: [this.apartment.Id, Validators.required],
        title:  [this.apartment.title, Validators.required],
        address:   [this.apartment.address, Validators.required],
        nbrRooms: [this.apartment.nbrRooms, [Validators.required, Validators.min(1)]],
        price: [this.apartment.price]
        
      });
  }

 
  
  submit({ value, valid }: { value: IApartment, valid: boolean }) {
      
    value.id = this.apartment.id;
    console.log('ID: ' + value.id);
      // var apartment: IApartment = {
      //   id: this.apartment.id,
      // };

      if (value.id) {

        this.dataService.updateApartment(value)
          .subscribe((apartment: IApartment) => {
            if (apartment) {
              this.router.navigate(['/apartments']);
            }
            else {
              this.errorMessage = 'Unable to save apartment';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertApartment(value)
          .subscribe((apartment: IApartment) => {
            if (apartment) {
              this.router.navigate(['/apartments']);
            }
            else {
              this.errorMessage = 'Unable to add apartment';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/apartments']);
  }

  //changePrice(event: Event) {
  //  event.preventDefault();
  //  console.log('Changing price?');
  //  this.apartment.price = this.apartment.nbrRooms * 15000;

  //}

  delete(event: Event) {
    event.preventDefault();

    this.dataService.deleteApartment(this.apartment.id)
        .subscribe((status: boolean) => {
          if (status) {
            console.log(status);
            this.router.navigate(['/apartments']);
          }
          else {
            this.errorMessage = 'Unable to delete apartment';
          }
        },
        (err) => console.log(err));
  }

}
