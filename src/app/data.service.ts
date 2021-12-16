import { MoviesApi } from './moviesApi';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private movies = new BehaviorSubject<any>(['Spiderman','Infinity-War']);
  movie = this.movies.asObservable();
  
  constructor(private http: HttpClient) { }

  changeMovies(movie){
    this.movies.next(movie);
  }
  apiURL_Movies = 'http://34.125.193.39:8101/movies-api';
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
  };
  
  /**
   * ============================= 
   *    API USUARIOS
   * =============================
   */

  getMovies(): Observable<MoviesApi> {
    return this.http.get<MoviesApi>(this.apiURL_Movies + '/movies', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }   

  postMovie(payload): Observable<MoviesApi> {
    return this.http.post<MoviesApi>(this.apiURL_Movies + '/movie', JSON.stringify(payload), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}