import { useEffect, Suspense } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'
import { useMutation } from '@tanstack/react-query'
import { fetchSignoutPost, fetchSigninGet } from '../queries'
import SignOut from './SignOut'
import Sample from './Sample'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const signoutMutation = useMutation((bool: boolean) => fetchSignoutPost())

  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)

  const handleClickSignout = () =>
    // TODO: mutateの引数（不要なので指定しない方法を探す）
    signoutMutation.mutate(false, {
      onSuccess: async (res: any) => {
        const json = await res.json()
        if (json.isSuccess) setIsSignIn(false)
      },
    })

  useEffect(() => {
    if (!isSignIn) {
      navigate('/signin')
    }
  }, [])
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
        {
          isSignIn ? (
            <div>
              <Sample />
              <SignOut handleClickSignout={handleClickSignout} />
            </div>
          ) : null
          // <SignIn handleClickSignin={handleClickSignin} />
        }
      </div>
    </Suspense>
  )
}

export default Main
