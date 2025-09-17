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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blacklisted_access_token: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          token: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          token: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          token?: string
        }
        Relationships: []
      }
      enterprise_profile: {
        Row: {
          company_name: string
          created_at: string
          id: string
          is_active: boolean
          owner_id: string
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          is_active?: boolean
          owner_id: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          is_active?: boolean
          owner_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_profile_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      otp_log: {
        Row: {
          created_at: string
          id: string
          is_used: boolean
          otp_code: string
          otp_expires_at: string | null
          otp_type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_used?: boolean
          otp_code: string
          otp_expires_at?: string | null
          otp_type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_used?: boolean
          otp_code?: string
          otp_expires_at?: string | null
          otp_type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "otp_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_type: string
          created_at: string
          email: string
          enterprise_id: string | null
          full_name: string | null
          id: string
          is_active: boolean
          is_email_verified: boolean
          is_staff: boolean
          phone_number: string | null
          role: Database["public"]["Enums"]["app_role"]
          token_version: number
          updated_at: string
          user_id: string
        }
        Insert: {
          account_type?: string
          created_at?: string
          email: string
          enterprise_id?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          is_email_verified?: boolean
          is_staff?: boolean
          phone_number?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          token_version?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          account_type?: string
          created_at?: string
          email?: string
          enterprise_id?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          is_email_verified?: boolean
          is_staff?: boolean
          phone_number?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          token_version?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_enterprise_id_fkey"
            columns: ["enterprise_id"]
            isOneToOne: false
            referencedRelation: "enterprise_profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          id: string
          profile_picture_url: string | null
          updated_at: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          profile_picture_url?: string | null
          updated_at?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ensure_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          account_type: string
          created_at: string
          email: string
          enterprise_id: string | null
          full_name: string | null
          id: string
          is_active: boolean
          is_email_verified: boolean
          is_staff: boolean
          phone_number: string | null
          role: Database["public"]["Enums"]["app_role"]
          token_version: number
          updated_at: string
          user_id: string
        }
      }
      generate_otp: {
        Args: {
          p_otp_type: string
          p_user_id: string
          p_valid_for_minutes?: number
        }
        Returns: string
      }
      get_user_role: {
        Args: { p_user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_wallet_access: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      validate_otp: {
        Args: { p_otp_code: string; p_otp_type: string; p_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "ADMIN" | "ENTERPRISE" | "SUPPORT" | "USER"
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
  public: {
    Enums: {
      app_role: ["ADMIN", "ENTERPRISE", "SUPPORT", "USER"],
    },
  },
} as const
