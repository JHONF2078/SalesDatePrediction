import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../material/material.component';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from '../../service/orders.service';
import { SalesDatePrediction } from '../../interface/orders-date-prediction';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-predicion-list',
  imports: [CommonModule, ...MATERIAL_IMPORTS],
  templateUrl: './date-predicion-list.component.html',
  styleUrl: './date-predicion-list.component.scss'
})
export class DatePredicionListComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions: Subscription = new Subscription();


  public dataSource = new MatTableDataSource<SalesDatePrediction>();

  @ViewChild(MatSort) order!: MatSort;
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  displayedColumns: string[] = ['companyName', 'lastOrderDate', 'possibleNextOrderDate', 'actions']; // Columnas mostradas en la tabla

  constructor(private ordersService: OrdersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadSalesDatePredictionss(); // Cargar libros al inicializar el componente
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Liberar la suscripción
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase(); // Aplicar filtro a la tabla
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.order; // Asignar ordenación a la tabla
    this.dataSource.paginator = this.pagination; // Asignar paginación a la tabla
  }

  loadSalesDatePredictionss(): void {
    const SalesDatePredictionsSubscription = this.ordersService.getSalesDatePredictions().subscribe(SalesDatePredictions => {
      console.log(SalesDatePredictions);
      this.dataSource.data = SalesDatePredictions; // Asignar datos de libros a la tabla
    });

    this.subscriptions.add(SalesDatePredictionsSubscription);
  }

  //openDialog(): Método que abre un diálogo para agregar o editar un libro.
  // openDialog(book ?: Book): void {
  //   const dialogRef = this.dialog.open(FormComponent, {
  //     width: '400px', // Ancho del diálogo
  //     data: book || {} // Datos pasados al diálogo
  //   });

  //   const dialogSubscription = dialogRef.afterClosed().subscribe((result: Book) => { // Especificar el tipo como Book
  //     console.log(result);
  //     if (result) {
  //       if (book) {
  //         const updateSubscription = this.booksService.updateBook(result).subscribe(() => this.loadBooks()); // Actualizar libro
  //         this.subscriptions.add(updateSubscription);
  //       } else {
  //         const addSubscription = this.booksService.addBook(result).subscribe(() => this.loadBooks()); // Agregar libro
  //         this.subscriptions.add(addSubscription);
  //       }
  //     }
  //   });
  //   this.subscriptions.add(dialogSubscription);
  // }

  // deleteBook(book: Book): void {
  //   const deleteSubscription = this.booksService.deleteBook(book.libroId).subscribe(() => this.loadBooks()); // Eliminar libro
  //   this.subscriptions.add(deleteSubscription);
}
