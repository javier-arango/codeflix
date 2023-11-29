import { AuthForm } from '@components/AuthForm'
import { Logo } from '@components/foundation'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

export default function Login() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen w-full lg:py-0">
        <Logo className="flex items-center mb-6 text-2xl uppercase font-semibold" />

        <Card className="w-full md:mt-0 sm:max-w-md xl:p-0 p-6 space-y-4 md:space-y-6 sm:p-8">
          <CardHeader>
            <h1 className="text-lg">Create an Account</h1>
          </CardHeader>
          <CardBody>
            <AuthForm type="register" />
          </CardBody>
        </Card>
      </div>
    </section>
  )
}
