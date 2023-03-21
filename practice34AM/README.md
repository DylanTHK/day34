# Practice34AM

## Documentation
https://openweathermap.org/current

## img format for Icon
https://openweathermap.org/img/wn/10d@4x.png
https://openweathermap.org/img/wn/{{ icon }}@4x.png

## Built-in API request by city name (API Call format)
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
d1972195e49e953b1600e991eff9724a
https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=d1972195e49e953b1600e991eff9724a

## Practice #1
1. import forms and httpmodule
2. create form in html
- input
- fromGroup, ngSubmit
- validation (disabled button if empty)

3. add code in ts (app.component.ts)
- oninit (create form)
- getWeather() method
- form builder

4. create service app (weather.service.ts)
- @Injectable()
- link model.ts to this file (do in app.module.ts > providers)
- constructor( private http: HttpClient) { }
- getWeather()

5. create model.ts (from weather[{...}])
- main
- description
- icon

### getWeather() method (inside weather.service.ts)
- set HttpParams


Sequence #1
1. fill city name
2. click button
3. call app.component.ts's getWeather()
4. calls weatherSvc
- get weather and API

## Practice #2 (Broadcasting received data)
1. broadcast data from weather.service.ts to weather-display.ts


## Tips
1. always subscribe to observables (otherwise, no data will be transferred)
2. Binding & Subscription
- Event / property binding (communication between components)
- Broadcasting (reserve for Http requests)
3. Do exercises with promise first (Learn observables later)


## Lessons Learnt
1. Module imports
- add HttpClientModule under imports
- add services under providers

