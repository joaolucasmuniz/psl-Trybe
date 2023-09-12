function calculateDaysSincePublication(data_publicacao: string): string {
  const parts = data_publicacao.split(/[\s/:-]+/);
  const dateOfPublication = new Date(
    parseInt(parts[2], 10), // Ano
    parseInt(parts[1], 10) - 1, // Mês (subtrai 1 porque os meses em JavaScript são baseados em zero)
    parseInt(parts[0], 10), // Dia
    parseInt(parts[3], 10), // Horas
    parseInt(parts[4], 10), // Minutos
    parseInt(parts[5], 10), // Segundos
  );
  const dataAtual = new Date();
  const diferencaEmMilissegundos = dataAtual.getTime() - dateOfPublication.getTime();
  const diasPassados = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
  switch (diasPassados) {
    case 0:
      return 'Publicado hoje';
    case 1:
      return 'Publicado ontem';
    default:
      return `Publicado há ${diasPassados} dias`;
  }
}

export default calculateDaysSincePublication;
