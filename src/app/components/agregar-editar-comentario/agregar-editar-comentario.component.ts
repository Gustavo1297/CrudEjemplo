import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { usuario } from 'src/app/models/usuarios'
import { ComentarioService } from 'src/app/services/usuario';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {
 form_usuarios: FormGroup;
 idUsuario =0;
 accion = 'Registro';
 loading = false;
 usuarios: usuario;
  constructor(private fb: FormBuilder,
     private usuarioServicio:ComentarioService,
     private redireccion: Router, private toastr: ToastrService) {
    this.form_usuarios = this.fb.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required],
      confirmpwd: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      rol: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    
  }
  guardarUsuario( ) {
    var pwd = this.form_usuarios.get('pwd').value
    var pwd1 = this.form_usuarios.get('confirmpwd').value
    if(pwd == pwd1){
      console.log(this.form_usuarios.get('pwd').value);
    console.log("Entro al metodo");
    if(this.accion === 'Registro' ){
      console.log("Paso Registro");
      const  user: usuario = 
      {
          usuarios: this.form_usuarios.get('usuario').value,
          pwd :this.form_usuarios.get('pwd').value,
          name_usuarios: this.form_usuarios.get('nombre').value,
          correo: this.form_usuarios.get('correo').value,
          id_rol: parseInt(this.form_usuarios.get('rol').value)
          
      };
      console.log("Mostrar arreglo");
        console.log(user);
        /* La siguiente linea es la que hara el insert en la base de datos*/
        this.usuarioServicio.guardarUsuario(user).subscribe( data =>
    {
          this.toastr.success('Registro Agregado', 'Se Agrego un Usuario');
          this.redireccion.navigate(['listaUsuarios']);
    })
    }
    console.log(this.form_usuarios);
    }else{
      this.toastr.info('Contraseña', 'Las Contraseñas no coinciden');
    }
  }
  

}
