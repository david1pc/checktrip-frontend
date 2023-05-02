import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, NavbarComponent, PaginaNoEncontradaComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, PaginaNoEncontradaComponent],
})
export class SharedModule {}
