import { IEvent } from '@/lib/database/models/event.model'
import Link from 'next/link'
import React from 'react'

type CardPropsType = {
   event: IEvent,
   hasOrderLink?: boolean,
   hidePrice?: boolean 
}

const Card = ({ event, hasOrderLink, hidePrice }: CardPropsType) => {
  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transitio hover:shadow-lg md:min-h-[438px]'>
        <Link
            href={`/events/${event._id}`}
            style={{
                backgroundImage: `url(${event.imageUrl})`
            }}
            className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500'>
                {/* Is Event Creator ... */}
        </Link>
    </div>
  )
}

export default Card