import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import QRious from 'qrious';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/firebase/auth.service';

@Component({
  selector: 'app-mostrar-qr',
  templateUrl: './mostrar-qr.page.html',
  styleUrls: ['./mostrar-qr.page.scss'],
})
export class MostrarQrPage implements OnInit, OnDestroy {
  nombreUsuario: string;
  asignaturaId: string;
  asignaturaNombre: string;

  private userSubscription: Subscription | null = null;
  private route = inject(ActivatedRoute);

  qrData: string = '';
  showQRCode: boolean = false;
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  generarQR(asignaturaId: string) {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const día = String(fechaActual.getDate()).padStart(2, '0');

    const fecha = `${año}-${mes}-${día}`;
    this.qrData = `http://localhost:8100/asistencia/${asignaturaId}/${this.nombreUsuario}/${fecha}`;

    this.showQRCode = true;
    this.crearQR();
  }

  crearQR() {
    const qr = new QRious({
      element: this.qrCanvas.nativeElement,
      value: this.qrData,
      size: 256,
      level: 'M'
    });
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.asignaturaId = params.get('id');
      this.asignaturaNombre = params.get('nombre');
    });

    this.userSubscription = this.authService.authState$.subscribe((usuario) => {
      if (usuario && usuario.name) {
        this.nombreUsuario = usuario.name;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
