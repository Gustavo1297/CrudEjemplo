import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarEditarComentarioComponent } from './components/agregar-editar-comentario/agregar-editar-comentario.component';
import { VerComentariosComponent } from './components/ver-usuario/ver-comentarios.component';
import { ListComentariosComponent } from './components/list-comentarios/list-comentarios.component';
import { EditarComponent} from './components/editar/editar.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [

  {path: 'agregar', component: AgregarEditarComentarioComponent },
  {path: 'editar/:id', component: EditarComponent},
  {path: 'ver/:id', component: VerComentariosComponent},
  {path: '', component: ListComentariosComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
