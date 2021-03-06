import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReceitaService } from 'src/app/service/receitas/receita.service';
import { Tipo } from 'src/app/models/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.scss']
})
export class ReceitaComponent implements OnInit {
  listTiposReceita: Tipo[] = [
    {value: '0', viewValue: 'Saúde'},
    {value: 'salario', viewValue: 'salario'},
    {value: '1', viewValue: 'Transporte'},
    {value: '2', viewValue: 'Educação'},
    {value: '3', viewValue: 'Lazer'},
    {value: '4', viewValue: 'Trabalho'},
    {value: '5', viewValue: 'Alimento'},
    {value: '6', viewValue: 'Domicilio'},
    {value: '7', viewValue: 'Emprestimo'},
    {value: '8', viewValue: 'Outro'},
  ];
  startDate = new Date(1990, 0, 1);
  formReceita = new FormGroup ({
    data: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
    fixo: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, public receitaService: ReceitaService) { }

  ngOnInit(): void {

    this.receitaService.botaoEdit.subscribe( edit => {
      console.log(edit);
      if (edit){
        this.formReceita.get('data').setValue(edit.data);
        this.formReceita.get('valor').setValue(edit.valor);
        this.formReceita.get('tipo').setValue(edit.tipo);
        this.formReceita.get('descricao').setValue(edit.descricao);
        this.formReceita.get('fixo').setValue(edit.fixo);
      }
    });

  }

  salvar(){
    if (this.formReceita.valid){
      Swal.fire({
        icon: 'success',
        title: 'Eeeeba...',
        text: 'Receita salva com sucesso'
      });
      this.router.navigate(['/dashboard']);
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Preencha corretamente todos os campos'
      });
    }
  }

}
