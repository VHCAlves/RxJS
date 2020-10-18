import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

const API = 'http://localhost:3000/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private htttpClient: HttpClient) { }

  public getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.htttpClient
      .get<AcoesAPI>(API, { params })
      .pipe(
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB))));
  }
  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo)
      return 1;
    if (acaoA.codigo < acaoB.codigo)
      return -1;
    return 0;
  }
}

//pluck é um operador do rxjs que serve justamente para extrair dados do metodo
