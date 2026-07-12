import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

import JobApplicationForm from "@/components/forms/job-application-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditApplicationPage({ params }: Props) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return notFound();
  }

  const application = await db.jobApplication.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!application) {
    return notFound();
  }

  async function updateApplication(data: any) {
    "use server";

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const result = await db.jobApplication.updateMany({
      where: {
        id,
        userId: session.user.id,
      },
      data,
    });

    if (result.count === 0) {
      throw new Error("Application not found or you do not have permission to edit it");
    }

    revalidatePath(`/dashboard/applications/${id}`);
    revalidatePath("/dashboard/applications");

    redirect("/dashboard/applications");
  }

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h1 className="mb-6 text-3xl font-bold">Edit Application</h1>

      <JobApplicationForm
        defaultValues={{
          companyName: application.companyName,
          jobRole: application.jobRole,
          location: application.location,
          applicationDate: application.applicationDate,
          workMode: application.workMode,
          employmentType: application.employmentType,
          status: application.status,
          interviewRound: application.interviewRound ?? undefined,
          salary: application.salary ?? "",
          jobUrl: application.jobUrl ?? "",
          notes: application.notes ?? "",
        }}
        onSubmit={updateApplication}
      />
    </div>
  );
}