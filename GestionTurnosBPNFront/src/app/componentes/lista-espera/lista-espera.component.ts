import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from './ticket';
import { ListaEsperaService } from './listaespera.service';
import { Subscription, interval } from 'rxjs';
import { WebSocketService } from '../dashboard/webSocketService';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalLlamarClienteComponent } from './modal-llamar-cliente/modal-llamar-cliente.component';





@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.component.html',
  styleUrls: ['./lista-espera.component.css']
})
export class ListaEsperaComponent implements AfterViewInit, OnInit{

  llamadoClienteSubscription: Subscription;

  fechaActual: Date;
  datosCliente: Ticket | null = null;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['CODIGO', 'NOMBRE', 'MODULO', 'ESTADO'];
  dataSource = new MatTableDataSource<Ticket>;
  modalRef: MatDialogRef<ModalLlamarClienteComponent>;
 

  constructor(
    private webSocketService: WebSocketService,
    private servicio: ListaEsperaService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.webSocketService.disconnect();
    if (this.llamadoClienteSubscription) {
      this.llamadoClienteSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.obtenerEventoLLamado()

    interval(1000).subscribe(() => {
      this.fechaActual = new Date();
    });

    interval(2000).subscribe(() => {
      this.listadoGeneralTicket();
    });

  }


 
  obtenerEventoLLamado(){

    this.webSocketService.connect();
    this.webSocketService.response.subscribe((data: Ticket) => {
    
      this.abrirDialogLlamarCliente(data);
    })
  }


  abrirDialogLlamarCliente(data: Ticket): void {  
    
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.modalRef = this.dialog.open(ModalLlamarClienteComponent, {
      width: '550px',
      data: data
    });

  }


  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;

  }

  listadoGeneralTicket(){
    return this.servicio.listarTicket().subscribe(
      {next: res => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        },
        error: error => {
          console.log("Ocurrio un error en la carga")
        }
      }
    )
  
  }




}
