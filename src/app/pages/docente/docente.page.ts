import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
  private router = inject(Router);

  asignaturas = [
    { nombre: 'DISEÑO Y GESTIÓN DE REQUISITOS', id: 'PRY1111' },
    { nombre: 'HABILIDADES BÁSICAS DE COMUNICACIÓN', id: 'PLC1101' },
    { nombre: 'INGLÉS BÁSICO I', id: 'INU1101' },
    { nombre: 'MODELAMIENTO DE BASE DE DATOS', id: 'MDY1131' },
    { nombre: 'NIVELACIÓN MATEMÁTICA', id: 'MAT1110' },
    { nombre: 'PROGRAMACIÓN DE ALGORITMOS', id: 'PGY1121' },
    { nombre: 'PROCESO DE PORTAFOLIO', id: 'APY4478' },
  ];

  irMostrarQR(asignaturaId: string, asignaturaNombre){
    this.router.navigate([`/mostrar-qr/${asignaturaId}/${asignaturaNombre}`]);
  }

  constructor() { }

  ngOnInit() {}

}
