import { useState, useEffect, Suspense } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import {
  fetchSigninPost,
  fetchSignoutPost,
  fetchSigninGet,
  fetchCsrfTokeGet,
} from '../queries'
import { User } from '../types'
import SignIn from './SignIn'

const Main = () => {
  const [user, setUser] = useState<User>({
    email: 'taro@example.com',
    password: 'password',
  })
  const [csrfToken, setCsrfToken] = useState<string>('')

  const signinMutation = useMutation((user: User) => fetchSigninPost(user))
  const signoutMutation = useMutation((csrfToken: string) =>
    fetchSignoutPost(csrfToken)
  )

  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)

  const handleChangeEmail = (e: any) => {
    setUser((prev) => ({ ...prev, email: e.target.value }))
  }
  const handleChangePassword = (e: any) => {
    setUser((prev) => ({ ...prev, password: e.target.value }))
  }

  const handleClickSignin = () => {
    console.log('called')
    signinMutation.mutate(user, {
      onSuccess: async (res: any) => {
        const json = await res.json()
        if (json.isSuccess) {
          setIsSignIn(true)
        }
      },
    })
  }

  useEffect(() => {
    ;(async () => {
      const json = await fetchSigninGet()
      console.log(json)
      if (json.isSuccess) {
        setIsSignIn(true)
      }
    })()
  }, [setIsSignIn])

  useEffect(() => {
    ;(async () => {
      const csrfValue: string = await fetchCsrfTokeGet()
      setCsrfToken(csrfValue)
      console.log('cookie:', csrfValue)
    })()
  }, [])
  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="flex justify-center items-center w-screen h-[100vh]">
        {isSignIn ? (
          <div>
            <button
              className="h-12 w-32 bg-green-500 rounded-md text-white font-bold"
              onClick={() =>
                signoutMutation.mutate(csrfToken, {
                  onSuccess: async (res: any) => {
                    const json = await res.json()
                    if (json.isSuccess) {
                      setIsSignIn(false)
                    }
                  },
                })
              }
            >
              SignOut
            </button>
          </div>
        ) : (
          <SignIn
            user={user}
            handleChangeEmail={handleChangeEmail}
            handleChangePassword={handleChangePassword}
            handleClickSignin={handleClickSignin}
          />
        )}
      </div>
    </Suspense>
  )
}

export default Main
