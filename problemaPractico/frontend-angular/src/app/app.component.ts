import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Inversiones Ripley';

  constructor(){}

  cambioTab($event: MatTabChangeEvent){
    // this.fetchAccounts(this.banks[$event.index].id)
    console.log($event);
  }

}

