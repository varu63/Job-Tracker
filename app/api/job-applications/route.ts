import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { JobApplicationSchema } from "@/lib/validations/job";



export async function POST(req: NextRequest) {
  
  try {
    // Get the current session
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();

    // Validate with Zod
    const result = JobApplicationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Save to database
    const application = await db.jobApplication.create({
      data: {
        companyName: result.data.companyName,
        jobRole: result.data.jobRole,
        location: result.data.location,
        applicationDate: result.data.applicationDate,

        workMode: result.data.workMode,
        employmentType: result.data.employmentType,

        status: result.data.status,
        interviewRound: result.data.interviewRound,

        salary: result.data.salary || null,
        jobUrl: result.data.jobUrl || null,
        notes: result.data.notes || null,

        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Application created successfully.",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}