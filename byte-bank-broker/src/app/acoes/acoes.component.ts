import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AcoesService } from './acoes.service';
import { switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(() => {
      console.log('fluxo inicial');
    })
  );
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    tap(() => console.log('fluxo do filtro')),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
    tap(() => console.log)
  );

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$)

  constructor(private acoesService: AcoesService) { }

}

//O operador switchMap tem o papel de manipular o fluxo dos dados, e não o resultado, por isso nesse caso a Elisa trocou o fluxo de produtos pelo fluxo de detalhes do produto.
