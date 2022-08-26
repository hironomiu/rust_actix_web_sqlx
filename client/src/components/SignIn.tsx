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
  const signinMutation = useMutation((user: User) => fetchSigninPost(user))
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const setIsSignIn = useSetRecoilState(isSignInAtom)

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
    <div>
      <form
        onSubmit={handleSubmit((user: User) => {
          console.log(user)
          handleClickSignin(user)
        })}
        className="my-2 sm:flex"
      >
        <div>
          <input
            {...register('email')}
            className=" border-2 h-12 mx-2 px-2 rounded"
          />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
        <div>
          <input
            type="password"
            {...register('password')}
            className=" border-2 h-12 mx-2 px-2 rounded"
          />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>

        <input
          type="submit"
          value="SignIn"
          className="h-12 w-32 bg-green-500 rounded-md text-white font-bold mx-2"
        />
      </form>
    </div>
  )
}

export default SignIn
