import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'nanisng/button';
import { InputTextComponent } from 'nanisng/input-text';

@Component({
  selector: 'app-input-text-intro',
  standalone: true,
  imports: [FormsModule, InputTextComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './input-text-intro.component.html',
})
export class InputTextIntroComponent {
  title = 'Angular';
  fb = inject(FormBuilder);

  form = this.fb.group({
    name: [''],
  });

  save() {
    console.log(this.form.value);
  }
}
