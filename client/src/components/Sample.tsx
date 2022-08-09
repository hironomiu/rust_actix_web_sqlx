import { useEffect } from 'react'

const Sample = () => {
  useEffect(() => {
    const fetchGetSample = async () => {
      const response = await fetch('http://localhost:8686/api/v1/sample', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      })
      const json = await response.json()
      console.log(json)
      return json
    }
    fetchGetSample()
  })

  return <div>Sample</div>
}

export default Sample
