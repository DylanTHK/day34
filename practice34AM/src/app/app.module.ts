import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { WeatherDisplayComponent } from './components/weather-display.component';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  // add services here
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
