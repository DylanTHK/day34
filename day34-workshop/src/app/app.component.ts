import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Day34 Workshop - Weather App';

  form!: FormGroup;

  constructor(private fb:FormBuilder) { };

  ngOnInit(): void {
      this.form = this.fb.group({
        city: this.fb.control('singapore', [Validators.required])
      });
  }

  getWeather() {
    const city = this.form.get("city")?.value;
    console.info(">>> City Detected: ", city);
  }
}
