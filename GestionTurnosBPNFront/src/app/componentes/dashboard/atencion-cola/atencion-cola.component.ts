import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Atencion } from './atenciones';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../usuario/services/usuario.service';
import { AtencionesService } from './atenciones.service';
import { Ticket } from '../../lista-espera/ticket';
import { GenerarTicketService } from '../../generarticket/generar-ticket.service';
import { Cliente } from '../../generarticket/cliente';
import { Servicio } from '../servicios/servicio';
import { ListaEsperaComponent } from '../../lista-espera/lista-espera.component';
import { WebSocketService } from '../webSocketService';



@Component({
  selector: 'app-atencion-cola',
  templateUrl: './atencion-cola.component.html',
  styleUrls: ['./atencion-cola.component.css']
})
export class AtencionColaComponent  implements AfterViewInit , OnInit{

  estadoFiltro:any;
  selectedRow: Ticket;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['TICKET', 'FECHA', 'CLIENTE', 'SERVICIO','ESTADO', 'ACCIONES'];
  dataSource = new MatTableDataSource<Ticket>;

  constructor(
    private atencionSerice:GenerarTicketService,
    private webSocketService: WebSocketService
    ) {
  }

  ngOnInit(): void {
    this.listarAtenciones();
    
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarAtenciones(){
    let idModulo = 3
    let estado = "Pendiente"
    return this.atencionSerice.listarTicketsPorEstadoYModulo(idModulo, estado).subscribe(
      {next: res => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        },
        error: error => {
          console.log("Ocurrio un error en la carga")
        }
      }
    )
  }

  seleccionarCliente(fila: any) {
    this.selectedRow = fila
    console.log(this.selectedRow)
  }


  llamarCliente(selectedRow: Ticket) {
    if (selectedRow) {
      this.webSocketService.connect();
  
      // Esperar un breve momento (por ejemplo, 500ms) para asegurarse de que la conexión se haya establecido correctamente
      setTimeout(() => {
        this.webSocketService.sendMessage(selectedRow);
      }, 500);
    } else {
      console.log('No se ha seleccionado ningún cliente.');
    }
  }
  
  

 

}


  

