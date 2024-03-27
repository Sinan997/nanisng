import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'nanisng/button';
import { InputTextComponent } from 'nanisng/input-text';

@Component({
  selector: 'app-input-text-intro',
  standalone: true,
  imports: [FormsModule, InputTextComponent, ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './input-text-intro.component.html',
})
export class InputTextIntroComponent {
  title = '';
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: [''],
  });

  get name() {
    return this.form.controls.name.value;
  }

  save() {
    console.log(this.form.value);
  }
}
