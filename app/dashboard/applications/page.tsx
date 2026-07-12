
import { db } from "@/lib/db";
import ApplicationsTable from "@/components/applications/applications-table";
import { headers } from "next/headers";
import { Prisma , WorkMode} from "@prisma/client";
import { redirect } from "next/navigation";
interface Props {
  searchParams: Promise<{
    search?: string;
    status?: string;
    workMode?: string;
    sort?: string;
    page?: string;
  }>;
}
import { auth } from "@/lib/auth"; 


const PAGE_SIZE = 10;

export default async function ApplicationsPage({
  searchParams,
}: Props) {
  const session = await auth.api.getSession({
    headers : await headers()
  });
if (!session?.user?.id) {
  redirect("/login"); // adjust to your actual login route
}

const userId = session.user.id;

  if (!session) return null;

  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status;
  const workMode = params.workMode;
  const sort = params.sort ?? "newest";
  const page = Number(params.page ?? "1");

 const where: Prisma.JobApplicationWhereInput = {
  userId,
  ...(workMode ? { workMode: workMode as WorkMode } : {}),
  ...(status ? { status: status as Prisma.JobApplicationWhereInput["status"] } : {}),
  ...(search
    ? {
        OR: [
          { companyName: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { jobRole: { contains: search, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : {}),
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