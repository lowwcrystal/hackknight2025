"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "@/utils/supabase/client";

export default function UpdatePasswordForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setError(null);

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        const {error} = await supabase.auth.updateUser({password});
        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            // Optionally show a success message before redirect
            router.push("/dashboard");
        }
    };

    return (
        <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
        >
            <h1 className="text-xl font-semibold text-center">Update Password</h1>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            />

            <input
                type="password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "Updating..." : "Update Password"}
            </button>
        </form>
    );
}
