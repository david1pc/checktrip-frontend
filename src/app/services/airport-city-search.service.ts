import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AirportCitySearchService {
    constructor(private http: HttpClient) {
    }

    searchslocations(keyword:string): Observable<any> {
        let parametros: string = `?subType=AIRPORT&keyword=${keyword}&page%5Blimit%5D=100&page%5Boffset%5D=0&sort=analytics.travelers.score&view=LIGHT`;
        let urlApi:string = 'https://test.api.amadeus.com/v1/reference-data/locations'+parametros;
        return this.http.get<any>(urlApi);
    }
}
