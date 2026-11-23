import OtpForm from '../features/auth/components/OtpForm'

export default function VerifyOtp() {
  return (
    <main className="flex min-h-dvh flex-col bg-white px-6 pb-6 pt-16 sm:grid sm:place-items-center sm:bg-linear-to-tr sm:from-white sm:via-white sm:to-[#c9f2dc] sm:py-8">
      <OtpForm />
    </main>
  )
}
