import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test-Angular6';
  
  message
  resmsg($event){
    this.message = $event
    console.log(this.message)
  }
}
