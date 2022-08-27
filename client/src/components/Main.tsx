import { useEffect, Suspense } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'
import { fetchSigninGet } from '../queries'
import Sample from './Sample'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)

  useEffect(() => {
    if (!isSignIn) {
      navigate('/signin')
    }
  }, [isSignIn, navigate])

  useEffect(() => {
    ;(async () => {
      const json = await fetchSigninGet()
      if (json.isSuccess) {
        setIsSignIn(true)
      }
    })()
  }, [setIsSignIn])

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="flex flex-col justify-center items-center w-screen">
        <Sample />
      </div>
    </Suspense>
  )
}

export default Main
