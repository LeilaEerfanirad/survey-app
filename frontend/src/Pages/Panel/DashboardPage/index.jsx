import React, { useState } from 'react'
import AddNewButton from './components/AddNewButton'
import AddSurveyModal from './components/addSurveyModal'
import SurveyCard from './components/SurveyCard'

export default function DashboardPage() {

  const [addsutveyModal, setAddSurveyModla] = useState(false)
  return (
    <>
      <AddSurveyModal open={addsutveyModal} setOpen={setAddSurveyModla} />
      <div className='p-4 h-full border flex flex-col overflow-y-auto overflow-x-hidden'>
        <h2 className='text-lg font-bold'>پرسشنامه های من</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 flex-1 mt-4'>
          <AddNewButton handleAddSurvey={() => setAddSurveyModla(true)} />
          <SurveyCard />
          <SurveyCard />
          <SurveyCard />
          <SurveyCard />

        </div>

      </div>
    </>
  )
}
