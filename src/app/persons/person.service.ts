import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private personsUrl = 'api/persons';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createPerson(person: Person): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Person Id must be null for the Web API to assign an Id
    const newPerson = { ...person, id: null };
    return this.http.post<Person>(this.personsUrl, newPerson, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePerson(id: number): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.personsUrl}/${id}`;
    return this.http.delete<Person>(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePerson(person: Person): Observable<Person> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.personsUrl}/${person.id}`;
    return this.http.put<Person>(url, person, { headers })
      .pipe(
        // Return the person on an update
        map(() => person),
        catchError(this.handleError)
      );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
