import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent implements OnInit, OnDestroy {

  constructor(private router: Router) { }

  ngOnInit(): void {
    document.querySelector('html').style.background = 'linear-gradient(to right,  #00934e, #67cf43,#fadf1a)';
  }

  ngOnDestroy(){
    document.querySelector('html').style.background = 'none';
  }

  backToLogin(){
    this.router.navigate(['/login']);
  }
}
