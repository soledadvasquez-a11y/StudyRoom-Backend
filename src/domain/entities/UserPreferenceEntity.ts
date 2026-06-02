export interface UserPreferenceEntity {
  id?: string;
  user_id: string;
  selected_character: string;
  selected_room: string;
  nickname?: string;
  created_at?: Date;
  updated_at?: Date;
}