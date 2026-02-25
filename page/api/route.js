export const dynamic = "force-dynamic";
export const runtime = "nodejs";

let handler;

async function getHandler() {
  if (!handler) {
    const { serve } = await import("inngest/next");
    const { inngest } = await import("@/config/inngest");
    const {
      syncUserCreation,
      syncUserUpdation,
      syncUserDeletion,
    } = await import("@/config/inngest");

    handler = serve({
      client: inngest,
      functions: [
        syncUserCreation,
        syncUserUpdation,
        syncUserDeletion,
      ],
    });
  }

  return handler;
}

export async function GET(req, res) {
  const h = await getHandler();
  return h.GET(req, res);
}

export async function POST(req, res) {
  const h = await getHandler();
  return h.POST(req, res);
}

export async function PUT(req, res) {
  const h = await getHandler();
  return h.PUT(req, res);
}

