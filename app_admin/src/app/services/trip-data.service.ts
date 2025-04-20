import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000/api/trips';

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: Trip) : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip[]> {
    // console.log('Inside TripDataService::addTrips');
    return this.http.put<Trip[]>(this.url + '/' + formData.code, formData);
  }

  log(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('register', user, passwd);
  }

  handleAuthAPICall(endpoint: string, user: User, passwd: string) Observable<AuthResponse> {
    //console.log('Inside TripDataService::handleAuthAPICall');
    let forData = {
      name: user.name,
      email: User.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
  
}
