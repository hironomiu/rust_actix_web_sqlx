import React from 'react'

// TODO: 型
type Props = {
  user: any
  handleChangeEmail: any
  handleChangePassword: any
  handleClickSignin: () => void
}

const SignIn = (props: Props) => {
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
    </div>
  )
}

export default SignIn
