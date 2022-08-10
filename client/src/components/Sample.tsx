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
    <div>
      {data.map((d: any) => (
        <div key={d.id}>{d.title}</div>
      ))}
    </div>
  )
}

export default Sample
