import { Component, OnInit } from '@angular/core';
import { Despesa } from 'src/app/models/despesa';
import { Receita } from 'src/app/models/receita';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DespesaService } from './../../service/despesas/despesa.service';
import { ReceitaService } from './../../service/receitas/receita.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  auxObject = {count: 100, data: []};
  listDespesas: Despesa[];
  listReceitas: Receita[];

  constructor(private router: Router, private receitaService: ReceitaService, private despesaService: DespesaService) { }

  ngOnInit(): void {
    this.populateDespesas();
    this.populateReceitas();
  }

  populateDespesas(){
    this.despesaService.getAllDespesas().subscribe(
      data => {
        console.log(data);
        this.listDespesas = data;
      }
    );
    /*for (let i = 0; i < this.auxObject.count; i++) {
        this.auxObject.data.push({
          id: i,
          data: '2' + '1' + '/' + '12' + '/' + '20' + i,
          valor: 'R$' +  i + i + i + i,
          tipo: 'ALUGUEL',
          descricao: 'caro, podendo ser até maior que' + i,
          fixo: true
      });
        this.listDespesas = this.auxObject.data;
    }
    this.auxObject.data = [];*/
  }

  populateReceitas(){
    this.receitaService.getAllReceitas().subscribe(
      data => {
        console.log(data);
        this.listReceitas = data;
      }
    );
/*    for (let i = 0; i < this.auxObject.count; i++) {
        this.auxObject.data.push({
          id: i,
          data: '2' + '1' + '/' + '12' + '/' + '20' + i,
          valor: 'R$' +  i + i + i + i,
          tipo: 'SALÁRIO',
          descricao: 'COM ADICIONAL DE R$: ' + i,
          fixo: true
      });
        this.listReceitas = this.auxObject.data;
    }
    this.auxObject.data = [];*/
  }

  edit(receita: Receita){
    this.receitaService.getReceitaFromScreen(receita);
    this.router.navigate(['/receitas-form']);
  }
  editDespesa(despesa: Despesa){
    this.despesaService.getDespesaFromScreen(despesa);
    this.router.navigate(['/despesas-form']);
  }

  deleteReceita(receita: Receita){
    Swal.fire({
      title: 'Você tem mesmo certeza?',
      text: 'Deseja mesmo deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.receitaService.deleteReceitas(receita.id).subscribe(
          data => {
            console.log(data);
            Swal.fire(
              'Deletado!',
              'Deletado com Sucesso.',
              'success'
            );
          }
        );
      }
    });
  }
  
  deleteDespesa(despesa: Despesa){
    Swal.fire({
      title: 'Você tem mesmo certeza?',
      text: 'Deseja mesmo deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.despesaService.deleteDespesas(despesa.id).subscribe(
          data => {
            console.log(data);
            Swal.fire(
              'Deletado!',
              'Deletado com Sucesso.',
              'success'
            );
          }
        );
      }
    });
  }
  
  }
  