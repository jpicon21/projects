export interface PlayerCardProps {
  props: PlayerCardPropsList;
}

interface PlayerCardPropsList {
  ln: string;
  fn: string;
  num: string;
  pos: string;
  pts: string;
  reb: string;
  ast: string;
  stl: string;
  headshot: string;
  slug: string;
  color: string;
  logo: string;
}