import { coerceNumberProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { e } from '@angular/core/src/render3';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ServicesService } from '../Services/services.service';
export interface Interest {
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  herolist: string[] = []

  Addressdata: any = [{ id: 1, Address: "Home" }, { id: 2, Address: "Company" }]
  showModal: boolean;
  registerForm: FormGroup;
  submitted = false;
  image: any;
  value = 0;
  autoTicks = false;
  max = 60;
  min = 20;
  showTicks = false;
  thumbLabel = true;
  public imagePath;
  imgURL: any;
  imagetrue: boolean = true
  public message: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Interest: Interest[] = [
  ];
  closeResult = '';
  homeTextF: boolean = false;
  comapanyTextF: boolean = false;
  binddata: any;
  id: any;
  address: any;
  constructor(private formBuilder: FormBuilder, private restservice: ServicesService, public Router: Router, private modalService: NgbModal) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Z]*$/)]],
      Lastname: ['', [Validators.required, Validators.pattern(/^[A-Z]*$/)]],
      MobileNumber: ['', [Validators.required ,Validators.minLength(10),Validators.pattern(/^[0-9]*$/)]],
      add1: [''],
      add2: [''],
      Companyadd1: [''],
      Companyadd2: ['']
    });

   this.alldata()

  }
  alldata(){
    this.restservice.get().subscribe(r => {
      this.binddata = r
    })
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    var Address1
    var Address2

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }
    let Fval = this.registerForm.value
    if (this.address == 1) {
      Address1 = Fval.add1
      Address2 = Fval.add2
    } else {

    }
    if (this.address == 2) {
      Address1 = Fval.Companyadd1
      Address2 = Fval.Companyadd2
    }
    if (Fval.MobileNumber == null || this.imgURL == null || this.value == null || this.Interest == null || Fval.firstname == null || Fval.Lastname == null || this.address == null || Address1 == null || Address2 == null) {
      alert("Please fill in all required form fields")
      return false
    }
    let data = {
      id: Fval.MobileNumber,
      Mobilenumber: Fval.MobileNumber,
      Photo: this.imgURL,
      age: this.value,
      Interast: this.Interest,
      Firstname: Fval.firstname.trim(),
      LastName: Fval.Lastname.trim(),
      Address: this.address,
      Address1: Address1.trim(),
      Address2: Address2.trim()

    }
    this.restservice.postservice(data).subscribe(res => {
      this.close()
      this.Router.navigate(["/Profile/" + Fval.MobileNumber]);
    })
  }
  preview(files) {
    var reader = new FileReader();
    const img = new Image();
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {

      alert("Only images are supported.")
      return;
    } else {

     var height
     var width
        this.imagetrue = false
       
        this.imagePath = files;

        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          
          img.src = reader.result as string;
          img.onload = () => {
             height = img.naturalHeight;
             width = img.naturalWidth;
             console.log('Width and Height', width, height);
             if(height < 310 && width < 325)
             {
              this.imgURL = reader.result;
             }else{
              alert("Image Size Need To Be 310x325 Px.")
             }
               
            
          };
          

        }
     
    }
  }
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 20;

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.Interest.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }

  }

  remove(fruit: Interest): void {
    const index = this.Interest.indexOf(fruit);

    if (index >= 0) {
      this.Interest.splice(index, 1);
    }
  }
  onChangeAddress(event) {

    this.address = event
    if (event == 'None') {
      this.homeTextF = false
      this.comapanyTextF = false
    }
    if (event == 1) {
      this.homeTextF = true
      this.comapanyTextF = false
    } else if (event == 2) {
      this.comapanyTextF = true
      this.homeTextF = false
    }
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  close() { this.modalService.dismissAll() }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  show() { this.showModal = true; }

  hide() { this.showModal = false; }
  // Delete(id) {
  //   console.log(id)
  //   let currentUrl = this.Router.url;
  //   this.restservice.Delete(id).remove
  
  // }
}
