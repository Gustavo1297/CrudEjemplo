import { Component, OnInit } from '@angular/core';
import { usuario} from 'src/app/models/usuarios'
import { ComentarioService } from 'src/app/services/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent implements OnInit {
listaUsuarios: usuario[]; /*Array de Usuarios*/
loading = false;
  
  constructor(private Usuarioservice: ComentarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarUsuario(); /*Se carga cuando manden llamar la vista */
  }
  cargarUsuario(){
    this.loading = true;
    this.Usuarioservice.getListUsuario().subscribe(data => { 
      this.loading = false;
      /*LLama al servicio y tambien al metodo de lista de usuarios y se suscribe */
      this.listaUsuarios = data /*Llena la lista de usuarios con la data que recibe */
    });
  }

  deleteUsuario(id:number){
    console.log("Entro al metodo");
    this.Usuarioservice.deleteUsuario(id).subscribe(data => {
      this.cargarUsuario()
      this.loading = false;
    });
    this.toastr.success('Registro Eliminado','Se Elimino Corretamente');
  }

}
