import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User } from '../types/index'
// TODO: 型
type Props = {
  handleClickSignin: (user: User) => void
}

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Email Address' })
    .min(1, { message: 'Required' }),
  password: z.string().min(8, { message: 'Required' }),
})

type Schema = z.infer<typeof schema>

const SignIn = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  return (
    <div>
      <form
        onSubmit={handleSubmit((user: User) => {
          console.log(user)
          props.handleClickSignin(user)
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
