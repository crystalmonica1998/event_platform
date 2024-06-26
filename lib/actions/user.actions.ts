'use server'

import { UserParams } from '@/types'
import { handleError } from '../utils'
import { connectToDatabase } from '../database'
import User from '../database/models/user.model'
import { revalidatePath } from 'next/cache'
import Event from '../database/models/event.model'
import Order from '../database/models/order.model'

export const createUser = async (user: UserParams) => {
  try {
    await connectToDatabase();

    const checkUser = await User.findOne({ id: user.id })

    if(checkUser) {
      return JSON.parse(JSON.stringify(checkUser));
    } else {
      const newUser = await User.create(user);
      return JSON.parse(JSON.stringify(newUser));
    }

  } catch (error) {
    handleError(error)
  }
}

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase()

    const user = await User.findOne({ id: userId })

    if (!user) throw new Error('User not found')

    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      )
    ])

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    handleError(error)
  }
}
