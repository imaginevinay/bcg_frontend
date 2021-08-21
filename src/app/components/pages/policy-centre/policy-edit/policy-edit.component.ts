import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SpinnerOverlayService } from 'src/app/shared/services/spinner-overlay.service'
import { FormTemplate } from 'src/app/shared/constants/templates'
@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.component.html',
  styleUrls: ['./policy-edit.component.scss']
})
export class PolicyEditComponent implements OnInit {

  formGroup: FormGroup;
  post: any;
  form_template = FormTemplate
  requiredError: string = "This field is required";
  premiumLengthError: string = "Premium value should be > $500 and <$1 million"
  isSubmit:boolean = false;
  breakpoint: any;
  constructor(
    public spinner: SpinnerOverlayService,
    public dialogRef: MatDialogRef<PolicyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    this.calculateWindowSize();
    console.log('on open dialog data', this.data)
    this.createForm();
  }

  calculateWindowSize() {
    let innerwidth = window.innerWidth;
    if(innerwidth >= 1100) this.breakpoint = 4;
    if(innerwidth > 850 && innerwidth <= 1099) this.breakpoint = 3;
    if(innerwidth >600 && innerwidth <= 849 ) this.breakpoint = 2;
    if(innerwidth <= 600) this.breakpoint = 1;
  }

  createForm() {
    let group = {};
    for(let key in this.data) {
      if(key !== 'Premium') {
        if(key === 'Policy_id' || key === 'Customer_id' || key === 'Date of Purchase') {
          group[key] = new FormControl({value : this.data[key], disabled : true}, Validators.required)
        } else {
          group[key] = new FormControl(this.data[key], Validators.required)
        }
      } else {
        group[key] = new FormControl(this.data[key], [Validators.required, Validators.max(999999), Validators.min(500)]) 
      }
    }
    this.formGroup = new FormGroup(group)
    
    console.log('form ready', this.formGroup)
  }

  onSubmit(){
    this.isSubmit = true;
    console.log('final form data', this.formGroup);
    if(this.formGroup.valid) {
      this.dialogRef.close({event : 'updateData', data : this.formGroup.value})
    }    
  }

  onResize(event) {
    let innerwidth = event.target.innerWidth;
    if(innerwidth >= 1100) this.breakpoint = 4;
    if(innerwidth > 850 && innerwidth <= 1099) this.breakpoint = 3;
    if(innerwidth >600 && innerwidth <= 849 ) this.breakpoint = 2;
    if(innerwidth <= 600) this.breakpoint = 1;
  }

}
