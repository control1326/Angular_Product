import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
  private productUrl = 'api/products/products.json';
constructor(private http: HttpClient){}
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log('All', JSON.stringify(data))),
        catchError(this.handleError)
        );
    }
    getProduct(id: number): Observable<IProduct | undefined> {
      return this.getProducts().pipe(
        map((products: IProduct[]) => products.find(p => p.productId == id))
      );

    } 

private handleError(err: HttpErrorResponse){
// in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
}

}