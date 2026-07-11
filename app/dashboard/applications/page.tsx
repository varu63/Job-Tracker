import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import ApplicationsTable from "@/components/applications/applications-table";
import { headers } from "next/headers";
interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    workMode?: string;
    sort?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 10;

export default async function ApplicationsPage({
  searchParams,
}: Props) {
  const session = await auth.api.getSession({
    headers : await headers()
  });

  if (!session) return null;

  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status;
  const workMode = params.workMode;
  const sort = params.sort ?? "newest";
  const page = Number(params.page ?? "1");

  const where = {
    userId: session.user.id,

    ...(search && {
      OR: [
        {
          companyName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          jobRole: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),

    ...(status &&
      status !== "ALL" && {
        status,
      }),

    ...(workMode &&
      workMode !== "ALL" && {
        workMode,
      }),
  };

  const orderBy =
    sort === "oldest"
      ? { applicationDate: "asc" as const }
      : sort === "company"
      ? { companyName: "asc" as const }
      : { applicationDate: "desc" as const };

  const [applications, total] = await Promise.all([
    db.jobApplication.findMany({
      where,
      orderBy,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),

    db.jobApplication.count({
      where,
    }),
  ]);

  return (
    <ApplicationsTable
      applications={applications}
      total={total}
      currentPage={page}
      pageSize={PAGE_SIZE}
    />
  );
}