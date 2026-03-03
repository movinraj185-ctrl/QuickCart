import connectDB from "@/config/db";
import Order from "@/models/order";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// initialize database connection once
connectDB();

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  try {
    const order = await Order.create({ ...body, user: user.id });
    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    return new NextResponse("Failed to create order", { status: 500 });
  }
}

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  try {
    // @ts-ignore
    const orders = await Order.find({ user: user.id }).sort({ date: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Fetch orders error:", error);
    return new NextResponse("Failed to fetch orders", { status: 500 });
  }
}
