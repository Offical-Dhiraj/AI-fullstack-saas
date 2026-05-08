import React, { useEffect, useState } from 'react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchCreations = async () => {

    try {

      const { data } = await axios.get(
        '/api/user/get-published-creations'
      )

      if (data.success) {
        setCreations(data.message)
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    fetchCreations()

  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading...
      </div>
    )
  }

  return (

    <div className="p-6 md:p-10">

      <h1 className="text-3xl font-bold mb-8">
        Community Creations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {creations.map((creation) => (

          <div
            key={creation.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md"
          >

            <img
              src={creation.content}
              alt="generated"
              className="w-full h-64 object-cover"
            />

            <div className="p-4">

              <p className="text-gray-700">
                {creation.prompt}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Community