import { User } from '../types'

export const fetchSigninPost = async (user: User) => {
  console.log(user)
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

  return response
}

export const fetchSignoutPost = async (csrfToken: string) => {
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

  return response
}

export const fetchSigninGet = async () => {
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

  return json
}

export const fetchCsrfTokeGet = async () => {
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
  return csrfValue
}
