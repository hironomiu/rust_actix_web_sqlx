import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User } from '../types/index'
import { useMutation } from '@tanstack/react-query'
import { fetchSigninPost } from '../queries'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Email Address' })
    .min(1, { message: 'Required' }),
  password: z.string().min(8, { message: 'Required' }),
})

type Schema = z.infer<typeof schema>

const SignIn = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)
  const signinMutation = useMutation((user: User) => fetchSigninPost(user))

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const handleClickSignin = (user: User) => {
    signinMutation.mutate(user, {
      onSuccess: async (res: any) => {
        const json = await res.json()
        if (json.isSuccess) setIsSignIn(true)
      },
    })
  }

  useEffect(() => {
    if (isSignIn) {
      navigate('/')
    }
  }, [isSignIn, navigate])

  return (
    <div className="flex h-[40vh] justify-center items-center md:flex-row flex-col">
      <form
        onSubmit={handleSubmit((user: User) => {
          console.log(user)
          handleClickSignin(user)
        })}
        className="my-2 sm:flex flex md:flex-row flex-col md:items-start items-center"
      >
        <div>
          <input
            {...register('email')}
            className=" border-2 h-12 mx-2 md:my-0 my-2 px-2 rounded"
            placeholder="Email"
            data-testid="email"
          />
          <div className="h-8">
            {errors.email?.message && (
              <p className="mx-2 text-red-500 font-bold text-md">
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <input
            type="password"
            {...register('password')}
            className=" border-2 h-12 mx-2 md:my-0 my-2 px-2 rounded"
            placeholder="Password"
            data-testid="password"
          />
          <div className="h-8">
            {errors.password?.message && (
              <p className="mx-2 text-red-500 font-bold text-md">
                {errors.password?.message}
              </p>
            )}
          </div>
        </div>

        <input
          type="submit"
          value="SignIn"
          disabled={!isValid}
          data-testid="submit-button"
          className="h-12 w-48 bg-green-500 rounded-md text-white font-bold mx-2 md:my-0 my-2 hover:cursor-pointer disabled:bg-gray-500"
        />
      </form>
    </div>
  )
}

export default SignIn
