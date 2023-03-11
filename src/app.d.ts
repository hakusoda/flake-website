import type { Session, SupabaseClient } from '@supabase/supabase-js';
export interface Database {
	flake: {
		Views: {}
		Tables: {
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
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database, 'flake'>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export { };