import { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'

type User = {
  email: string
  password: string
}
const Main = () => {
  const [user, setUser] = useState<User>({
    email: 'taro@example.com',
    password: 'password',
  })
  const [csrfToken, setCsrfToken] = useState<string>('')

  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)
  const fetchSigninPost = async () => {
    const response = await fetch('http://localhost:8686/api/v1/auth/signin', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        // 'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ ...user }),
    })

    const json = await response.json()
    console.log('response:', await json)
    if (json.isSuccess) {
      setIsSignIn(true)
    }
  }

  const fetchSignoutPost = async () => {
    console.log(csrfToken)
    const response = await fetch('http://localhost:8686/api/v1/auth/signout', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        // 'Csrf-Token': csrfToken,
      },
      body: JSON.stringify({ csrf: csrfToken }),
    })

    console.log('response:', await response.json())
    setIsSignIn(false)
  }

  const handleChangeEmail = (e: any) => {
    setUser((prev) => ({ ...prev, email: e.target.value }))
  }
  const handleChangePassword = (e: any) => {
    setUser((prev) => ({ ...prev, password: e.target.value }))
  }

  useEffect(() => {
    const fetchSigninGet = async () => {
      const response = await fetch('http://localhost:8686/api/v1/auth/signin', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        headers: {
          // 'CSRF-Token': data.csrfToken,
        },
      })
      const json = await response.json()

      console.log(json)
      if (json.isSuccess) {
        setIsSignIn(true)
      }
    }
    ;(async () => {
      await fetchSigninGet()
    })()
  }, [setIsSignIn])

  useEffect(() => {
    const fetchCsrfTokeGet = async () => {
      const response = await fetch('http://localhost:8686/csrf', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        redirect: 'follow',
        headers: {
          // 'CSRF-Token': data.csrfToken,
        },
      })
      const json = await response.json()
      console.log(json)
      const csrfValue = document.cookie.split('=')[1]
      setCsrfToken(csrfValue)
      console.log('cookie:', csrfValue)
    }
    ;(async () => {
      fetchCsrfTokeGet()
    })()
  }, [])
  return (
    <div className="flex justify-center items-center w-screen h-[100vh]">
      {isSignIn ? (
        <div>
          <button
            className="h-12 w-32 bg-green-500 rounded-md text-white font-bold"
            onClick={fetchSignoutPost}
          >
            SignOut
          </button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="email"
            value={user.email}
            onChange={handleChangeEmail}
            className=" border-2 h-12 mx-2 px-2 rounded"
          />
          <input
            className="border-2 h-12 px-2 mx-2 rounded"
            type="password"
            placeholder="password"
            value={user.password}
            onChange={handleChangePassword}
          />
          <button
            className="h-12 w-32 bg-green-500 rounded-md text-white font-bold mx-2"
            onClick={fetchSigninPost}
          >
            SignIn
          </button>
        </div>
      )}
    </div>
  )
}

export default Main
