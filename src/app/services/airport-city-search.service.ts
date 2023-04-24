import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AirportCitySearchService {
    constructor(private http: HttpClient) {
    }

    searchslocations(): Observable<any> {

        let parametros: string = '?subType=CITY&keyword=MUC&page%5Blimit%5D=10&page%5Boffset%5D=0&sort=analytics.travelers.score&view=FULL';
        let urlApi:string = 'https://test.api.amadeus.com/v1/reference-data/locations'+parametros;
        return this.http.get<any>(urlApi);
    }
}
