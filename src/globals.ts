export interface GameDetails {
  name: string;
  guid: string;
  deck?: string;
  original_release_date?: Date;
  imgURL?: string,
  platforms?: Object[],
}