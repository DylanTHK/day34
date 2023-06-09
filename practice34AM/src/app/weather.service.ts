import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { Weather } from "./model";

const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = { API_KEY };

@Injectable()
export class WeatherService {

    // temporary subject to hold data
    onWeather = new Subject<Weather[]>();

    constructor(private httpClient: HttpClient) { };

    // api call with HttpClient
    getWeatherAsObservable(city: string) {
        const params = new HttpParams()
            .set("q", city)
            .set("appid", API_KEY);

        return this.httpClient.get<Weather[]>(WEATHER_URL, {params});
    }

    getCurrentWeather(city: string): Promise<Weather[]> {
        // convert obeservable to promise
        return firstValueFrom(this.getWeatherAsObservable(city))
            // extract entire body
            .then((data: any) => {
                // extract weather Object from json, pass back to Promise
                const w = data["weather"] as Weather[];
                return w;
            })
            .then(data => {
                // fire event to onWeather Subject
                this.onWeather.next(data);
                return data;
            })
        
    }
}