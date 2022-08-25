import { useEffect, Suspense } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'
import { useMutation } from '@tanstack/react-query'
import { fetchSigninPost, fetchSignoutPost, fetchSigninGet } from '../queries'
import { User } from '../types'
import SignIn from './SignIn'
import SignOut from './SignOut'
import Sample from './Sample'

const Main = () => {
  const signinMutation = useMutation((user: User) => fetchSigninPost(user))
  const signoutMutation = useMutation((bool: boolean) => fetchSignoutPost())

  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)

  const handleClickSignin = (user: User) => {
    signinMutation.mutate(user, {
      onSuccess: async (res: any) => {
        const json = await res.json()
        if (json.isSuccess) setIsSignIn(true)
      },
    })
  }

  const handleClickSignout = () =>
    // TODO: mutateの引数（不要なので指定しない方法を探す）
    signoutMutation.mutate(false, {
      onSuccess: async (res: any) => {
        const json = await res.json()
        if (json.isSuccess) setIsSignIn(false)
      },
    })

  useEffect(() => {
    ;(async () => {
      const json = await fetchSigninGet()
      console.log(json)
      if (json.isSuccess) {
        setIsSignIn(true)
      }
    })()
  }, [setIsSignIn])

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="flex justify-center items-center w-screen h-[100vh]">
        {isSignIn ? (
          <div>
            <Sample />
            <SignOut handleClickSignout={handleClickSignout} />
          </div>
        ) : (
          <SignIn handleClickSignin={handleClickSignin} />
        )}
      </div>
    </Suspense>
  )
}

export default Main
