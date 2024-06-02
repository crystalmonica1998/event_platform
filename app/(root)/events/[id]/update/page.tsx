import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type UpdateEventProps = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
  const user = await currentUser()
  if (!user) return null

  const event = await getEventById(id)

  type UserValuesProps = {
    firstName: string
    lastName: string
    userId: string
  }

  const userValues: UserValuesProps = {
    firstName: user.firstName!,
    lastName: user.lastName!,
    userId: user.id
  }

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>
          Update Event
        </h3>
      </section>

      <div className='wrapper my-8'>
        <EventForm userValues={userValues} type='Update' eventId={event._id} event={event} />
      </div>
    </>
  )
}

export default UpdateEvent
