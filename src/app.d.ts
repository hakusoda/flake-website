import type { Session, SupabaseClient } from '@supabase/supabase-js';
export interface Database {
	flake: {
		Views: {}
		Tables: {
			active_servers: {
				Row: {
					id: number
					job_id: string
					players: {
						id: number
					}[]
					place_id: number
					shutdown: boolean
					server_ip: string
					created_at: string
					instance_id: number
					universe_id: number
					flake_version?: string
				}
				Insert: {}
				Update: {
					shutdown: boolean
				}
			}
			cloud_instances: {
				Row: {
					id: number
					owner: string
					access_key: string
					created_at: string
				}
				Insert: {}
				Update: {}
			}
		}
		Functions: {}
	}
	public: {
		Views: {}
		Tables: {
			user_flags: {
				Row: {
					user_id: number
					flake_beta: boolean
				}
				Insert: {}
				Update: {}
			}
		}
		Functions: {}
	}
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database, 'flake', Database['flake']>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export { };