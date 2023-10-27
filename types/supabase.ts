export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      "2023_match": {
        Row: {
          auto_cone_high: number | null
          auto_cone_low: number | null
          auto_cone_mid: number | null
          auto_cone_misses: number | null
          auto_cube_high: number | null
          auto_cube_low: number | null
          auto_cube_mid: number | null
          auto_cube_misses: number | null
          comments_defensive: boolean | null
          comments_fouls: number | null
          event: string
          match: string
          scouter: string
          team: number
          teleop_cone_high: number | null
          teleop_cone_low: number | null
          teleop_cone_mid: number | null
          teleop_cone_misses: number | null
          teleop_cube_high: number | null
          teleop_cube_low: number | null
          teleop_cube_mid: number | null
          teleop_cube_misses: number | null
          teleop_intakes_double: number | null
          teleop_intakes_single: number | null
        }
        Insert: {
          auto_cone_high?: number | null
          auto_cone_low?: number | null
          auto_cone_mid?: number | null
          auto_cone_misses?: number | null
          auto_cube_high?: number | null
          auto_cube_low?: number | null
          auto_cube_mid?: number | null
          auto_cube_misses?: number | null
          comments_defensive?: boolean | null
          comments_fouls?: number | null
          event: string
          match: string
          scouter?: string
          team: number
          teleop_cone_high?: number | null
          teleop_cone_low?: number | null
          teleop_cone_mid?: number | null
          teleop_cone_misses?: number | null
          teleop_cube_high?: number | null
          teleop_cube_low?: number | null
          teleop_cube_mid?: number | null
          teleop_cube_misses?: number | null
          teleop_intakes_double?: number | null
          teleop_intakes_single?: number | null
        }
        Update: {
          auto_cone_high?: number | null
          auto_cone_low?: number | null
          auto_cone_mid?: number | null
          auto_cone_misses?: number | null
          auto_cube_high?: number | null
          auto_cube_low?: number | null
          auto_cube_mid?: number | null
          auto_cube_misses?: number | null
          comments_defensive?: boolean | null
          comments_fouls?: number | null
          event?: string
          match?: string
          scouter?: string
          team?: number
          teleop_cone_high?: number | null
          teleop_cone_low?: number | null
          teleop_cone_mid?: number | null
          teleop_cone_misses?: number | null
          teleop_cube_high?: number | null
          teleop_cube_low?: number | null
          teleop_cube_mid?: number | null
          teleop_cube_misses?: number | null
          teleop_intakes_double?: number | null
          teleop_intakes_single?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "2023_match_scouter_fkey"
            columns: ["scouter"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      "2023_pit": {
        Row: {
          comments_generic: string | null
          driveraccuracy: string | null
          driverproficency: string | null
          driverreaction: string | null
          driverskill: string | null
          event: string
          experiencebuildseason: string | null
          robotcomments: string | null
          scouter: string
          team: number
        }
        Insert: {
          comments_generic?: string | null
          driveraccuracy?: string | null
          driverproficency?: string | null
          driverreaction?: string | null
          driverskill?: string | null
          event: string
          experiencebuildseason?: string | null
          robotcomments?: string | null
          scouter?: string
          team: number
        }
        Update: {
          comments_generic?: string | null
          driveraccuracy?: string | null
          driverproficency?: string | null
          driverreaction?: string | null
          driverskill?: string | null
          event?: string
          experiencebuildseason?: string | null
          robotcomments?: string | null
          scouter?: string
          team?: number
        }
        Relationships: [
          {
            foreignKeyName: "2023_pit_scouter_fkey"
            columns: ["scouter"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      achievement_queue: {
        Row: {
          achievement: string
          approved: boolean
          created_at: string
          event: string
          season: number
          user: string
        }
        Insert: {
          achievement: string
          approved?: boolean
          created_at?: string
          event: string
          season: number
          user: string
        }
        Update: {
          achievement?: string
          approved?: boolean
          created_at?: string
          event?: string
          season?: number
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "achievement_queue_achievement_fkey"
            columns: ["achievement"]
            referencedRelation: "achievements"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "achievement_queue_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      achievements: {
        Row: {
          description: string | null
          name: string
          points: number
          requirements: string
        }
        Insert: {
          description?: string | null
          name: string
          points: number
          requirements: string
        }
        Update: {
          description?: string | null
          name?: string
          points?: number
          requirements?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          event: string
          match: string | null
          scouter: string
          season: number
          team: number | null
          updated: string
        }
        Insert: {
          event: string
          match?: string | null
          scouter?: string
          season: number
          team?: number | null
          updated?: string
        }
        Update: {
          event?: string
          match?: string | null
          scouter?: string
          season?: number
          team?: number | null
          updated?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_scouter_fkey"
            columns: ["scouter"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          name: string
          team: number
          updated: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string
          team: number
          updated?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          team?: number
          updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      getavailableseasons: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gettableschema: {
        Args: {
          tablename: string
        }
        Returns: Json
      }
      ping: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
