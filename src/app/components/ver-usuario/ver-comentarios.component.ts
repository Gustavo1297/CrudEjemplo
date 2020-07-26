import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuarios'
import { ComentarioService } from 'src/app/services/usuario';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ver-comentarios',
  templateUrl: './ver-comentarios.component.html',
  styleUrls: ['./ver-comentarios.component.css']
})
export class VerComentariosComponent implements OnInit {
loading = false;
Usuario:  usuario;
idUsuario:number;
  constructor(private Usuarioservice: ComentarioService, private route: ActivatedRoute) { 
    this.idUsuario = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    console.log("Entro el metodo edicion");
    this.loading = true;
    this.Usuarioservice.cargarUsuario(this.idUsuario).subscribe(data => 
      {
        this.loading = false;
        this.Usuario = data;
      })
  }
}
