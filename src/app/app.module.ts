import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule,MatCheckboxModule,MatChipsModule,MatFormFieldModule,MatIconModule} from '@angular/material/';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    MainComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
