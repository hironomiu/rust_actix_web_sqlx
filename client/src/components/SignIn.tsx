import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// TODO: 型
type Props = {
  user: any
  handleChangeEmail: any
  handleChangePassword: any
  handleClickSignin: () => void
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
      <input
        type="email"
        placeholder="email"
        value={props.user.email}
        onChange={props.handleChangeEmail}
        className=" border-2 h-12 mx-2 px-2 rounded"
      />
      <input
        className="border-2 h-12 px-2 mx-2 rounded"
        type="password"
        placeholder="password"
        value={props.user.password}
        onChange={props.handleChangePassword}
      />
      <button
        className="h-12 w-32 bg-green-500 rounded-md text-white font-bold mx-2"
        onClick={props.handleClickSignin}
      >
        SignIn
      </button>
      <form
        onSubmit={handleSubmit((d: any) => {
          console.log(d)
          props.handleClickSignin()
        })}
        className="my-2 flex"
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
            {...register('password')}
            className=" border-2 h-12 mx-2 px-2 rounded"
          />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>

        <input
          type="submit"
          className="h-12 w-32 bg-green-500 rounded-md text-white font-bold mx-2"
        />
      </form>
    </div>
  )
}

export default SignIn
