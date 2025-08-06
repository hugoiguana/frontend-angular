import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports : [FormsModule]
})
export class LoginComponent {

  readonly savedLoginFormLocalStorage = 'saved-login-form';

  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.getSavedEmailFromLocalStorageAndFillTheForm();
      const formValueChangesSubscription = this.saveEmailInLocalStorageWhenItChanges();
      this.destroyRef.onDestroy(() => formValueChangesSubscription?.unsubscribe());
    });

  }


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

    formData.form.reset();
  }

  private getSavedEmailFromLocalStorageAndFillTheForm() {
      const savedEmailFromLocalStorage = window.localStorage.getItem(this.savedLoginFormLocalStorage);

      if (savedEmailFromLocalStorage) {
        // this.form().setValue({
        //   email: JSON.parse(savedEmailFromLocalStorage).email,
        //   password: ''
        // });

        // The "setTimeout" is important because when the page is loaded the form is not completed rendered.
        setTimeout(() => {
          this.form().controls['email'].setValue(JSON.parse(savedEmailFromLocalStorage).email);
        }, 1);
      }
  }

  private saveEmailInLocalStorageWhenItChanges() : Subscription | undefined {
    return this.form().valueChanges?.pipe(debounceTime(500)
      ).subscribe({
        next: (value) => {
          window.localStorage.setItem(
            this.savedLoginFormLocalStorage,
            JSON.stringify({email : value.email})
          );
        }
      });
  }
  
}
