import SignUpForm from "@/app/components/SignUpForm";

export default function Page() {
    return (
        <div className="bg-gradient-to-b from-white via-orange-50 to-white
 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignUpForm/>
            </div>
        </div>
    );
}