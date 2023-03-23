import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { Weather } from "./model";

const API_KEY = "a09057affb6e66963f18700222170122";
const URL = "https://api.openweathermap.org/data/2.5/weather";

@Injectable()
export class WeatherService {

    weatherSubject = new Subject<Weather[]>();

    constructor(private httpClient: HttpClient) { };

    // method to take in city and make API call
    getWeatherRequest(city: string): Promise<Weather[]> {
        console.info(">>> INSIDE SERVICE");
        // prepare params (for API call)
        const params = new HttpParams().set('q', city).set('appid', API_KEY);
        console.info(">>> params: ", {params});

        // make the api call with httpClient (observable)
        const response = this.httpClient.get<Weather[]>(URL, {params});

        // get promise from observable (json payload)
        return firstValueFrom(response)
            // extract particular attribute from json
            .then((data:any) => {
                const w = data["weather"] as Weather[];
                return w;
            })
            // fires data from promise to subject (using then to resolve)
            .then(data => {
                this.weatherSubject.next(data);
                return data;
            })

    }

}