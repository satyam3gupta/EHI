import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  contactList = [];
  editContactIndex = -1;
  showcontent: boolean = false;
  status: any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(12)]],
      status: ['active', Validators.required]
    });
  }

  get f() { return this.registerForm.get('status'); }

  addContact() {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.editContactIndex === -1) {

      this.contactList.push(this.registerForm.value);
    } else {
      this.contactList[this.editContactIndex] = this.registerForm.value;
      this.editContactIndex = -1;
    }
    this.registerForm.reset();
  }
  viewContact(index) {
    // tslint:disable-next-line: prefer-const
    for (let key in this.contactList[index]) {
      if (this.registerForm.controls[key]) {
        this.registerForm.controls[key].setValue(this.contactList[index][key]);
      }
    }
    this.editContactIndex = index;
  }
  deleteContact(index) {
    if (this.editContactIndex === index) {
      alert('The selected contact is under process so it can\'t be deleted.');
      return;
    }
    this.contactList.splice(index, 1);
  }
}