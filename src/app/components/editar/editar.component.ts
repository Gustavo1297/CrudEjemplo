

import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/usuario';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  form_usuarios: FormGroup;
Usuario:  usuario;
idUsuario:number;
constructor(private fb: FormBuilder, private route: ActivatedRoute,
  private usuarioService:ComentarioService,
  private redireccion: Router, private toastr: ToastrService) {
 this.form_usuarios = this.fb.group({
   usuario: ['', Validators.required],
   pwd: ['', Validators.required],
   nombre: ['', Validators.required],
   correo: ['', Validators.required],
   rol: ['', Validators.required]
 });
 if(+this.route.snapshot.paramMap.get('id')>0){
   this.idUsuario = +this.route.snapshot.paramMap.get('id');
 }
}

  ngOnInit(): void {
    this.cargarUsuario();
  }
  
  actualizarUsuario(){
    console.log(this.form_usuarios);
    const updateUsuarios:  usuario = {
          
          id_usuario: this.Usuario.id_usuario,
          usuarios: this.form_usuarios.get('usuario').value,
          pwd :this.form_usuarios.get('pwd').value,
          name_usuarios: this.form_usuarios.get('nombre').value,
          correo: this.form_usuarios.get('correo').value,
          id_rol: parseInt(this.form_usuarios.get('rol').value)
    };
    console.log("Saliendo del update")
    console.log(this.idUsuario);
    this.usuarioService.actualizarUsuario(this.idUsuario, updateUsuarios).subscribe(data =>{
      this.redireccion.navigate(['listaUsuarios']);
    });
    this.toastr.success('Registro Actulizado', 'Se Actulizo Correctamente');
  }

  cargarUsuario(){
    if (this.idUsuario >0) {
      this.usuarioService.cargarUsuario(this.idUsuario).subscribe(data => {
        this.Usuario = data;
        this.form_usuarios.patchValue ({
          usuario: data.usuarios,
          nombre: data.name_usuarios,
          correo: data.correo,
          rol: data.id_rol,
          
      });
      console.log("Se Edito Correctamente");
      })
    }/*Fin de metodo Carga Usuario a editar */

    }/*Fin el export class */
}

