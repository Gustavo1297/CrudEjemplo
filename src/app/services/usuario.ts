import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { usuario } from '../models/usuarios';
import {Observable, combineLatest} from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
/**/
Url = 'https://localhost:44338/api/usuario/';


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'aplication/.json'
  })
};
  
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(30)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  /*Comparara contraseñas */
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  /*Metodo que traera todos los usuarios a nuestra app de angular*/
    getListUsuario():  Observable<usuario[]>{
      return this.http.get<usuario[]>(this.Url);
    }
    /*Metodo para eliminar usuarios*/
    deleteUsuario(id:number): Observable<usuario>{
      return this.http.delete<usuario>(this.Url + id );
    }
    /*Metodo Guardar usuario*/
    guardarUsuario(Usuario: usuario){
      console.log("aqui etan"+Usuario);
      return this.http.post(this.Url, Usuario);
    }

    /*Actualizar usuario */
    actualizarUsuario(id: number, Usuario){
      return this.http.put<usuario>(this.Url + id, Usuario);
    }
    /*
    register(user: Any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  } */

    /*Cargar un solo usuario*/
    cargarUsuario(id:number): Observable<usuario> {
      return this.http.get<usuario>(this.Url + id);
    }

    
  }

