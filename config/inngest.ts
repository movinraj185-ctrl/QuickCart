import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "QuickCart-next",
  isDev: process.env.NODE_ENV !== "production",
});




export const syncUserCreation = inngest.createFunction(
    
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk.user.created'
    },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;

            const userData = {
                _id: id,
                name: first_name + ' ' + last_name,
                email: email_addresses[0].email_address,
                imageUrl: image_url,
            }
            await connectDB()
            await User.create(userData)
            console.log(`✓ User ${id} synced from Clerk`, userData);
        } catch (error) {
            console.error('Error syncing user creation:', error);
            throw error;
        }
    }

)

export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk.user.updated'
    },
    async ({ event }) => {
        try {
            const { id, first_name, last_name, email_addresses, image_url } = event.data;

            const userData = {
                _id: id,
                name: first_name + ' ' + last_name,
                email: email_addresses[0].email_address,
                imageUrl: image_url,
            }
            await connectDB()
            await User.findByIdAndUpdate(id, userData)
            console.log(`✓ User ${id} updated from Clerk`, userData);
        } catch (error) {
            console.error('Error syncing user update:', error);
            throw error;
        }
    }
)

    // inngest function to delete user from database
    export const syncUserDeletion = inngest.createFunction(
        {
            id: 'delete-user-with-clerk'
        },
        {
            event: 'clerk.user.deleted'
        },
        async ({ event }) => {
            try {
                const { id } = event.data;
                await connectDB()
                await User.findByIdAndDelete(id)
                console.log(`✓ User ${id} deleted from Clerk`, );
            } catch (error) {
                console.error('Error syncing user deletion:', error);
                throw error;
            }
        }
    )
