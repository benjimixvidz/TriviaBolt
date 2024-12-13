export interface Database {
  public: {
    Tables: {
      game_sessions: {
        Row: {
          id: string;
          status: 'lobby' | 'in_progress' | 'ended';
          created_at: string;
        };
        Insert: {
          id?: string;
          status: 'lobby' | 'in_progress' | 'ended';
          created_at?: string;
        };
        Update: {
          id?: string;
          status?: 'lobby' | 'in_progress' | 'ended';
          created_at?: string;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          id: string;
          game_session_id: string;
          category: string;
          question_text: string;
          correct_answer: string;
          incorrect_answers: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          game_session_id: string;
          category: string;
          question_text: string;
          correct_answer: string;
          incorrect_answers: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          game_session_id?: string;
          category?: string;
          question_text?: string;
          correct_answer?: string;
          incorrect_answers?: string[];
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "questions_game_session_id_fkey";
            columns: ["game_session_id"];
            referencedRelation: "game_sessions";
            referencedColumns: ["id"];
          }
        ];
      };
      player_scores: {
        Row: {
          id: string;
          game_session_id: string;
          player_id: string;
          score: number;
        };
        Insert: {
          id?: string;
          game_session_id: string;
          player_id: string;
          score?: number;
        };
        Update: {
          id?: string;
          game_session_id?: string;
          player_id?: string;
          score?: number;
        };
        Relationships: [
          {
            foreignKeyName: "player_scores_game_session_id_fkey";
            columns: ["game_session_id"];
            referencedRelation: "game_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "player_scores_player_id_fkey";
            columns: ["player_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
  };
}