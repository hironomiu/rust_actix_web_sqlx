import { useEffect, useState } from 'react'

const Sample = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchGetSample = async () => {
      const response = await fetch('http://localhost:8686/api/v1/sample', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      })
      const json = await response.json()
      console.log(json)
      setData(json)
      return json
    }
    fetchGetSample()
  }, [])

  return (
    <ul>
      {data.map((d: any) => (
        <li key={d.id} className="my-2">
          {d.title}:{d.body}
        </li>
      ))}
    </ul>
  )
}

export default Sample
