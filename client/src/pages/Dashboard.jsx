import React, { useEffect, useState } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { useUser } from "@clerk/react"
import CreationItem from '../components/CreationItem'

const Dashboard = () => {

  const { user, isLoaded } = useUser();   // ✅ FIX

  const [creations, setCreations] = useState([])

  const plan = user?.publicMetadata?.plan;

  const getDashboardData = async () => {
    setCreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  // ⛔ Prevent crash before Clerk loads
  if (!isLoaded) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className='h-full overflow-y-scroll p-6'>
      <div className='flex justify-start gap-4 flex-wrap'>

        {/* Total creation */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm font-bold text-black'>Total Creation</p>
            <h2 className='text-lg font-semibold'>{creations.length}</h2>
          </div>

          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white' />
          </div>
        </div>

        {/* Active plan */}
        <div className='flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border-gray-200'>
          <div className='text-slate-600'>
            <p className='text-sm font-bold text-black'>Active Plan</p>
            <h2 className='text-lg font-semibold'>
              {plan === "premium" ? "Premium" : "Free"} plan
            </h2>
          </div>

          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>

      </div>



      <div className='space-y-3'>
        <p className='mt-6 mb-4'>Recent Creations </p>

        {
          creations.map((item)=> <CreationItem key={item.id} item={item} />)
        }

      </div>
    </div>
  )
}

export default Dashboard