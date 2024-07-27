import React, { useEffect, useState } from 'react'
import AddNewButton from './components/AddNewButton'
import AddSurveyModal from './components/addSurveyModal'
import SurveyCard from './components/SurveyCard'
import { getAllSurveiesApi } from '../../../Apis/survey/getSurveies'
import { toast } from 'react-toastify'

export default function DashboardPage() {

  const [addsutveyModal, setAddSurveyModla] = useState(false)

  const [surveies, setSurveies] = useState([])


  useEffect(() => {

    getAllSurveiesApi()
      .then(res => {

        setSurveies(res.surveies)

      }).catch(e => {
        toast.error("")
      })


  }, [])


  return (
    <>
      <AddSurveyModal open={addsutveyModal} setOpen={setAddSurveyModla} />
      <div className='p-4 h-full border flex flex-col overflow-y-auto overflow-x-hidden'>
        <h2 className='text-lg font-bold'>پرسشنامه های من</h2>
        <div className='flex flex-wrap  gap-4 flex-1 mt-8'>
          <AddNewButton handleAddSurvey={() => setAddSurveyModla(true)} />
          {
            surveies.map(item => <SurveyCard {...item} />)
          }
        </div>

      </div>
    </>
  )
}
