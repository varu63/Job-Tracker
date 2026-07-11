import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import { JobApplicationSchema } from "@/lib/validations/job";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: NextRequest,
  { params }: Props
) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const result = JobApplicationSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      result.error.flatten(),
      { status: 400 }
    );
  }

  const application = await db.jobApplication.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: result.data,
  });

  return NextResponse.json(application);
}

export async function DELETE(
  req: NextRequest,
  { params }:Props
) {
  try {
    const { id } = await params;

    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const application = await db.jobApplication.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!application) {
      return NextResponse.json(
        { message: "Application not found." },
        { status: 404 }
      );
    }

    await db.jobApplication.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Application deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}