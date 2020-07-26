import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComentarioService } from 'src/app/services/usuario';
import { usuario } from 'src/app/models/usuarios';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form_login: FormGroup;
  constructor(private redireccion: Router) { }

  ngOnInit(): void {
  }

  Login(){
    var correo = this.form_login.get('correo').value
    var pwd = this.form_login.get('pwd').value
    console.log(correo);
    console.log(pwd);
  }
}
