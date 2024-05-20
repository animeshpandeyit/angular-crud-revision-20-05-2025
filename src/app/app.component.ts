import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular-crud-revision-20-05-2025';

  userform: FormGroup;

  formDataStored: any = [];

  isEditInProgress = false;

  constructor(private _formBuilder: FormBuilder) {
    this.userform = this._formBuilder.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      dateofbirth: [''],
      education: [''],
      companyName: [''],
    });
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('angularCrud');
    if (storedData) {
      this.formDataStored = JSON.parse(storedData);
    }
  }

  userformSubmit() {
    const currentValue = this.userform.value;
    currentValue.id = this.formDataStored.length + 1;
    this.formDataStored.push(currentValue);
    localStorage.setItem('angularCrud', JSON.stringify(this.formDataStored));
    this.userform.reset();
  }

  edit(id: number) {
    const confirmation = confirm('Are you sure you want to edit this');
    if (confirmation) {
      this.isEditInProgress = true;
      const index = this.formDataStored.findIndex(
        (fromData: any) => fromData.id === id
      );
      const valueToEdit = this.formDataStored[index];
      this.userform.patchValue(valueToEdit);
    }
  }

  update() {
    const confirmation = confirm('Are you sure you want to update this');

    if (confirmation) {
      const updateData = this.userform.value;
      const index = this.formDataStored.findIndex(
        (value: any) => value.id === updateData.id
      );

      if (index !== -1) {
        this.formDataStored[index] = updateData;
        localStorage.setItem(
          'angularCrud',
          JSON.stringify(this.formDataStored)
        );
        this.userform.reset();
      }
    }
  }

  delete(id: number) {
    const confirmation = confirm('Are you sure you want to delete this');

    if (confirmation) {
      const index = this.formDataStored.findIndex(
        (item: any) => item.id === id
      );

      if (index !== -1) {
        this.formDataStored.splice(index, 1);
        localStorage.setItem(
          'angularCrud',
          JSON.stringify(this.formDataStored)
        );
        this.userform.reset();
      }
    }
  }
}
