import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../Services/services.service'
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface Interast {
  name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {


  AddressHome: number
  Addressdata: any = [{ id: 1, Address: "Home" }, { id: 2, Address: "Company" }]
  Firstname: any;
  age: any;
  registerForm: any;
  objectList: any;
  showModal: boolean;
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
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Interast: Interast[] = [

  ];

  closeResult = '';
  homeTextF: boolean = false;
  comapanyTextF: boolean = false;

  data: Object;
  firstname: any;
  add1: any;
  add2: any;
  Photo: any;
  id: any;
  Lastname: any;
  Hide: any;
  Address: any;
  HAddress2: any;
  HAddress1: any;
  CAddress1: any;
  CAddress2: any
  address: any;
  Mobilenumber: any;
  constructor(public router: Router, public arout: ActivatedRoute, private restservice: ServicesService, public http: ServicesService, public formBuilder: FormBuilder, private modalService: NgbModal) {

  }

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
    this.http.getcurrentdata(this.arout.snapshot.params.id).subscribe((res) => {
      this.objectList = [res]

      let fb = this.registerForm.value
      fb.firstname = this.objectList[0].Firstname
      this.Lastname = this.objectList[0].LastName
      this.firstname = this.objectList[0].Firstname
      this.imgURL = this.objectList[0].Photo
      this.Interast = this.objectList[0].Interast
      this.value = this.objectList[0].age
      this.id = this.objectList[0].id
      this.AddressHome = this.objectList[0].Address
      this.Mobilenumber = this.objectList[0].Mobilenumber
      // this.HAddress1 = this.objectList[0].Address1
      // this.Address2 = this.objectList[0].Address2

      if (this.AddressHome == 1) {
        this.HAddress1 = this.objectList[0].Address1
        this.HAddress2 = this.objectList[0].Address2
      } else if (this.AddressHome == 2) {
        this.CAddress1 = this.objectList[0].Address1
        this.CAddress2 = this.objectList[0].Address2
      }
    })
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    var Address1
    var Address2
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.submitted) {
      this.showModal = false;
    }
    let Fval = this.registerForm.value

    if (this.AddressHome == 1) {
      Address1 = Fval.add1
      Address2 = Fval.add2
    } else
      if (this.AddressHome == 2) {
        Address1 = Fval.Companyadd1
        Address2 = Fval.Companyadd2
      }
    if (Fval.MobileNumber == null || this.imgURL == null || this.value == null || this.Interast == null || Fval.firstname == null || Fval.Lastname == null || this.AddressHome == null || Address1 == null || Address2 == null) {
      alert("please fill in all required form fields")
      return false
    }
    let data = {
      id: this.objectList[0].id,
      Mobilenumber: Fval.MobileNumber,
      Photo: this.imgURL,
      age: this.value,
      Interast: this.Interast,
      Firstname: Fval.firstname.trim(),
      LastName: Fval.Lastname.trim(),
      Address: this.AddressHome,
      Address1: Address1.trim(),
      Address2: Address2.trim()
    }
    this.restservice.updatedata(this.id, data).subscribe(res => {

      this.data = res

      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.close()
        this.router.navigate([currentUrl]);
      });
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

    // Add our fruit
    if ((value || '').trim()) {
      this.Interast.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(fruit: Interast): void {
    const index = this.Interast.indexOf(fruit);

    if (index >= 0) {
      this.Interast.splice(index, 1);
    }
  }
  onChangeAddress(event) {

    let Fval = this.registerForm.value
    this.AddressHome = event
    if (event == 1) {
      this.homeTextF = true
      this.comapanyTextF = false
    } else if (event == 2) {

      this.comapanyTextF = true
      this.homeTextF = false
    }


  }
  back() {
    this.router.navigate(['/Home']);
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  close() {
    this.modalService.dismissAll()
  }
  methodvalue(i) {


    if (i == "1") {
      this.Hide = 1


    }

  }
  updatimage() {
    this.objectList
    if (this.imgURL == null) {
      alert("please Select image")
      return false
    } else {
      let data = {
        id: this.objectList[0].id,
        Mobilenumber: this.Mobilenumber,
        Photo: this.imgURL,
        age: this.objectList[0].age,
        Interast: this.objectList[0].Interast,
        Firstname: this.objectList[0].Firstname,
        LastName: this.objectList[0].LastName,
        Address: this.objectList[0].Address,
        Address1: this.objectList[0].Address1,
        Address2: this.objectList[0].Address2
      }
      this.restservice.updatedata(this.id, data).subscribe(res => {
        this.data = res
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.close()
          this.router.navigate([currentUrl]);
        });
      })
    }


  }
  methodvalue2(i) {
    if (i == "2") {
      this.Hide = 0
    }
  }
  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

}
