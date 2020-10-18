export interface Acoes extends Array<Acao> {}

export interface Acao {
  acao: number;
  codigo: string;
  descricao: string;
  preco: number;
}

export interface AcoesAPI {
  payload: Acoes;
}
