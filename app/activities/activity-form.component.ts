import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import  {} from '@angular'

@Component({
  moduleId: module.id,
  selector: 'activity-form',
  templateUrl: 'activity-form.template.html'
})
export class ActivityFormComponent implements OnInit {
  form: FormGroup;
  formErrors = {
    name: '',
    username: ''
  };
  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be 3 characters.',
      maxlength: 'Name can\'t be longer than 6 characters.'
    },
    username: {
      required: 'Username is required.',
      minlength: 'Username must be 3 characters.'
    }
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // build the data model for our form
    this.buildForm();
  }

  buildForm() {
    // build our form
    this.form = this.fb.group({
      activityName: ['', [Validators.minLength(3), Validators.maxLength(6)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(6)]],
      username: ['', Validators.minLength(3)]
    });

    // watch for changes and validate
    this.form.valueChanges.subscribe(data => this.validateForm());
  }

  validateForm() {
    for (let field in this.formErrors) {
      // clear that input field errors
      this.formErrors[field] = '';

      // grab an input field by name
      let input = this.form.get(field);

      if (input.invalid && input.dirty) {
        // figure out the type of error
        // loop over the formErrors field names
        for (let error in input.errors) {
          // assign that type of error message to a variable
          this.formErrors[field] = this.validationMessages[field][error];
        }
      }
    }
  }

  processForm() {
    console.log('processing', this.form.value);
  }

}