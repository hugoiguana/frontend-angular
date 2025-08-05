import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports : [FormsModule]
})
export class LoginComponent {


  onSubmit(formData: NgForm) {
    console.log(formData);

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log(`enteredEmail = ${enteredEmail}`);
    console.log(`enteredPassword = ${enteredPassword}`);

    console.log(`Form status = ${formData.form.status}`);
    console.log(`Form pristine = ${formData.form.pristine}`);
    console.log(`Form touched = ${formData.form.touched}`);
    console.log(`Form errors = ${formData.form.errors}`);

    console.log(`Email errors = ${JSON.stringify(formData.form.controls['email'].errors)}`);
    console.log(`Email password = ${JSON.stringify(formData.form.controls['password'].errors)}`);

    if (formData.form.valid) {
      console.log('The form is valid');
    }
  }
  
}
