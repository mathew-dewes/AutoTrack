export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      files: {
        Row: {
          created_at: string
          file_type: string
          file_url: string
          id: string
          log_id: string
        }
        Insert: {
          created_at?: string
          file_type: string
          file_url: string
          id?: string
          log_id: string
        }
        Update: {
          created_at?: string
          file_type?: string
          file_url?: string
          id?: string
          log_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "logs"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          cost: number
          cost_per_litre: number | null
          created_at: string
          date: string
          fuel_litres: number | null
          id: string
          notes: string | null
          odometer: number
          service_type: Database["public"]["Enums"]["Service_type"] | null
          type: Database["public"]["Enums"]["Log_type"]
          user_id: string
          vehicle_id: string
          vendor: string | null
        }
        Insert: {
          cost: number
          cost_per_litre?: number | null
          created_at?: string
          date: string
          fuel_litres?: number | null
          id?: string
          notes?: string | null
          odometer: number
          service_type?: Database["public"]["Enums"]["Service_type"] | null
          type: Database["public"]["Enums"]["Log_type"]
          user_id: string
          vehicle_id: string
          vendor?: string | null
        }
        Update: {
          cost?: number
          cost_per_litre?: number | null
          created_at?: string
          date?: string
          fuel_litres?: number | null
          id?: string
          notes?: string | null
          odometer?: number
          service_type?: Database["public"]["Enums"]["Service_type"] | null
          type?: Database["public"]["Enums"]["Log_type"]
          user_id?: string
          vehicle_id?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          email_sent_at: string | null
          id: string
          message: string
          odometer_interval: number
          odometer_trigger: number
          sent: boolean
          type: Database["public"]["Enums"]["Service_type"]
          user_id: string
          vehicle_id: string
          vehicle_name: string
        }
        Insert: {
          created_at?: string
          email_sent_at?: string | null
          id?: string
          message: string
          odometer_interval: number
          odometer_trigger: number
          sent?: boolean
          type: Database["public"]["Enums"]["Service_type"]
          user_id: string
          vehicle_id: string
          vehicle_name: string
        }
        Update: {
          created_at?: string
          email_sent_at?: string | null
          id?: string
          message?: string
          odometer_interval?: number
          odometer_trigger?: number
          sent?: boolean
          type?: Database["public"]["Enums"]["Service_type"]
          user_id?: string
          vehicle_id?: string
          vehicle_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_rules: {
        Row: {
          created_at: string
          id: string
          interval_days: number
          interval_km: number
          name: string
          service_type: Database["public"]["Enums"]["Service_type"]
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          interval_days: number
          interval_km: number
          name: string
          service_type: Database["public"]["Enums"]["Service_type"]
          vehicle_id: string
        }
        Update: {
          created_at?: string
          id?: string
          interval_days?: number
          interval_km?: number
          name?: string
          service_type?: Database["public"]["Enums"]["Service_type"]
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_rules_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          created_at: string
          current_odometer: number
          id: string
          licence_plate_number: string
          make: string
          model: string
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string
          current_odometer: number
          id?: string
          licence_plate_number: string
          make: string
          model: string
          user_id: string
          year: number
        }
        Update: {
          created_at?: string
          current_odometer?: number
          id?: string
          licence_plate_number?: string
          make?: string
          model?: string
          user_id?: string
          year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_highest_spending_vehicle: {
        Args: { p_user_id: string }
        Returns: {
          licence_plate: string
          make: string
          model: string
          total_spend: number
        }[]
      }
      get_monthly_spend: {
        Args: { p_user_id: string }
        Returns: {
          month: string
          spend: number
        }[]
      }
      get_recent_services: {
        Args: { p_user_id: string }
        Returns: {
          odometer: number
          vehicle_id: string
        }[]
      }
      get_total_cost_per_vehicle: {
        Args: { p_user_id: string }
        Returns: {
          cost: number
          vehicle_id: string
        }[]
      }
      get_upcoming_services: {
        Args: { p_user_id: string }
        Returns: {
          odometer_trigger: number
          vehicle_id: string
        }[]
      }
      get_vehicle_service_status: {
        Args: { p_user_id: string }
        Returns: {
          current_odometer: number
          distance_to_service: number
          make: string
          model: string
          odometer_trigger: number
          vehicle_id: string
        }[]
      }
    }
    Enums: {
      Log_type: "fuel" | "repair"
      Service_type: "oil_change" | "brakes" | "tyres" | "WOF" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      Log_type: ["fuel", "repair"],
      Service_type: ["oil_change", "brakes", "tyres", "WOF", "other"],
    },
  },
} as const
