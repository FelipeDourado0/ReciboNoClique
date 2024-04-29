interface ReciboModel {
  nomeBeneficiario: string;
  cpfCnpjBeneficiario: string;
  nomePagador: string;
  cpfCnpjPagador: string;
  valor: string;
  motivo: string;
  dataPagamento: Date;
}

export { ReciboModel };
