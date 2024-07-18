export interface GameDetails {
  name: string;
  guid: string;
  deck?: string;
  original_release_date?: Date;
  imgURL?: string,
  platforms?: Object[],
}

export interface GameEntry {
  id: number,
  user_id: number | null,
  guid: string, 
  game_title: string,
  status: number,
  user_rating: number | null,
  completion_data: Date | null
}