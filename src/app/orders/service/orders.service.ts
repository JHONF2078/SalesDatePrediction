import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of, tap } from 'rxjs';
import { SalesDatePrediction } from '../interface/orders-date-prediction';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = `${environment.apiUrl}/Customers/WithOrderInfo`; // URL base obtenida de environment

  constructor(private http: HttpClient) {
    this.loadSalesDatePredictionss(); // Cargar los libros al inicializar el servicio
  }

  private booksSubject = new BehaviorSubject<SalesDatePrediction[]>([]);

  ListSalesDatePredictions$ = this.booksSubject.asObservable();

  /**
   * Obtiene la lista de libros desde la API y la almacena en el BehaviorSubject.
   */
  private loadSalesDatePredictionss(): void {
    this.http.get<SalesDatePrediction[]>(this.apiUrl).subscribe(books => {
      this.booksSubject.next(books);
    });
  }

  getSalesDatePredictions(): Observable<SalesDatePrediction[]> {
    return this.ListSalesDatePredictions$; // Se retorna directamente sin redundancias
  }

  /**
  * Agrega un nuevo libro y actualiza la lista reactiva.
  */
  // addBook(salesDatePrediction: SalesDatePrediction): Observable<SalesDatePrediction> {
  //   return this.http.post<SalesDatePrediction>(this.apiUrl, salesDatePrediction).pipe(
  //     tap(newBook => {
  //       const updatedBooks = [...this.booksSubject.value, newBook];
  //       this.booksSubject.next(updatedBooks);
  //     })
  //   );
  // }

  /**
    * Actualiza un libro en la API y actualiza la lista reactiva.
    */
  // updateBook(salesDatePrediction: SalesDatePrediction): Observable<SalesDatePrediction> {
  //   return this.http.put<SalesDatePrediction>(`${this.apiUrl}/${salesDatePrediction.libroId}`, salesDatePrediction).pipe(
  //     tap(updatedBook => {
  //       const updatedBooks = this.booksSubject.value.map(b =>
  //         b.libroId === updatedBook.libroId ? updatedBook : b
  //       );
  //       this.booksSubject.next(updatedBooks);
  //     })
  //   );
  // }

  /**
 * Elimina un libro de la API y actualiza la lista reactiva.
 */
  // deleteBook(libroId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${libroId}`).pipe(
  //     tap(() => {
  //       const updatedBooks = this.booksSubject.value.filter(salesDatePrediction => salesDatePrediction.libroId !== libroId);
  //       this.booksSubject.next(updatedBooks);
  //     })
  //   );
  // }

}
