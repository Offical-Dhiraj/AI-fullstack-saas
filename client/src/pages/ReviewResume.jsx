import { FileText, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const ReviewResume = () => {

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('resume', input)


      const { data } = await axios.post('/api/ai/resume-review', formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)

    }
  }

  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-col md:flex-row gap-6 text-slate-700'>

      {/* LEFT */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full md:w-1/2 p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#6a03d8]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-sm font-medium'>Upload Resume</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept='application/pdf'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600'
          required
        />

        <p className='text-sm text-gray-500 font-light mt-1'>Support PDF Resume only.</p>

        <button disabled={loading}
          type="submit"
          className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#C341F6] to-[#8E37EB]
           text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'
        >


          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
              : <FileText className='w-5' />


          }

          Resume Review
        </button>
      </form>

      {/* RIGHT */}
      <div
        className='w-full md:w-1/2 p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[400px]'
      >
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
                <FileText className='w-9 h-9' />
                <p>Upload your resume and click "Resume Review" to get Started</p>
              </div>
            </div>
          ) : (
            <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
              <div>
                <Markdown className="reset-tw">{content}</Markdown>
              </div>

            </div>
          )
        }


      </div>

    </div >
  )
}

export default ReviewResume