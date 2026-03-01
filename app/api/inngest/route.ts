import { serve } from "inngest/next";
import { inngest } from "@/config/inngest";
import {
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/config/inngest";

const handler = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  ],
});

export const GET = handler;
export const POST = handler;
export const PUT = handler;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
