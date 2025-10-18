export default async function Page({searchParams,}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;
    const errorMessage = decodeURIComponent(params.error ?? "Unknown error occurred");

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm border border-gray-200 rounded-xl p-6 shadow-sm bg-white text-center">
                <h1 className="text-xl font-semibold mb-3 text-red-600">Error</h1>
                <p className="text-gray-700 mb-4">{errorMessage}</p>

                <a
                    href="/auth/login"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Login
                </a>
            </div>
        </div>
    );
}
