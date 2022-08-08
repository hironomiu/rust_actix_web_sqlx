import React from 'react'

type Props = {
  handleClickSignout: () => void
}
const SignOut = (props: Props) => {
  return (
    <div>
      <button
        className="h-12 w-32 bg-green-500 rounded-md text-white font-bold"
        onClick={props.handleClickSignout}
      >
        SignOut
      </button>
    </div>
  )
}

export default SignOut
