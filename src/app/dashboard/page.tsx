import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {data, error} = await supabase.auth.getClaims();
    if (error || !data?.claims) {
        redirect("/auth/login");
    }

    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p>Welcome! You are logged in.</p>
            <LogoutButton/>
        </main>
    );
}
