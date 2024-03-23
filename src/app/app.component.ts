import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from 'nanisng/button';

@Component({
  standalone: true,
  imports: [RouterModule, ButtonComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  count = 0;
  color = signal('secondary');
  loading = signal(false);

  makeDanger(){
    if(this.count % 2 === 0){
      this.color.set('danger');
    }else{
      this.color.set('secondary');
    }
    this.count++;
  }

  makeLoading(){
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }
}
