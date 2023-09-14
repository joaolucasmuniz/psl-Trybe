export type NewsInfo = {
  id : number,
  tipo : string,
  titulo : string,
  introducao : string,
  data_publicacao : string,
  produto_id : number,
  produtos : string,
  editorias : string,
  imagens : string,
  produtos_relacionados : string,
  destaque : boolean,
  link : string
};

export type Newsdata = {
  count: number,
  page: number,
  totalPages: number,
  nextPage: number,
  previousPage: number,
  showingFrom: number,
  showingTo: number,
  items: NewsInfo[]
};

export type CardProps = {
  titulo : string,
  introducao : string,
  dataPublicacao : string,
  link : string,
  id : number
  imagens?: string
};

export type ImagesApi = {
  float_fulltext: string,
  float_intro: string,
  image_fulltext: string,
  image_fulltext_alt: string,
  image_fulltext_caption: string,
  image_intro: string,
  image_intro_alt: string,
  image_intro_caption: string,
};
