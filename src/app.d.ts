import type { Session, SupabaseClient } from '@supabase/supabase-js';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export { };