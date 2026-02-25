export const dynamic = "force-dynamic";

import { serve } from "inngest/next";
// rest of your code
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";


// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   syncUserCreation,
   syncUserUpdation,
   syncUserDeletion
  ],
});