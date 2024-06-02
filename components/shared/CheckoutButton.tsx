import { getUserById } from '@/lib/actions/user.actions'
import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

const CheckoutButton = async ({ event }: { event: IEvent }) => {
  const user = await currentUser()
  if (!user) return null

  const userId = user.id

  const activeUser = await getUserById(userId)

  const hasEventFinished = new Date(event.endDateTime) < new Date()

  return (
    <div className='flex items-center gap-3'>
        {/* Cannot buy past event */}
        {hasEventFinished ? (
            <p className='p-2 text-red-400'>
                Sorry, tickets are no longer available.
            </p>
        ) : (
            <>
                <SignedOut>
                    <Button asChild className='button rounded-full' size='lg'>
                        <Link href='/sign-in'>
                            Get Tickets
                        </Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <Checkout event={event} userId={activeUser._id} />
                </SignedIn>
            </>
        )}
    </div>
  )
}

export default CheckoutButton
