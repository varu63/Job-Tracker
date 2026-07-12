"use client";

import Link from "next/link";
import DeleteApplicationDialog from "@/components/applications/delete-application-dialog";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import AddButton from "./add-button";

interface Props {
  applications: any[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export default function ApplicationsTable({
  applications,
  total,
  currentPage,
  pageSize,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.companyName}</TableCell>

              <TableCell>{job.jobRole}</TableCell>

              <TableCell>{job.status}</TableCell>

              <TableCell>
                {new Date(
                  job.applicationDate
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>{job.location}</TableCell>

              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                >
                  <Link
                    href={`/dashboard/applications/${job.id}`}
                  >
                    Edit
                  </Link>
                </Button>

                <DeleteApplicationDialog
                  id={job.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between px-4 py-3 border-t">
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} ({total} total)
        </span>

        <div className="flex gap-2">
          <Button
           
            size="sm"
            variant="outline"
            disabled={!hasPrevious}
          >
            <Link
              href={`/dashboard/applications?page=${currentPage - 1}`}
              aria-disabled={!hasPrevious}
              tabIndex={hasPrevious ? undefined : -1}
              className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
            >
              Previous
            </Link>
          </Button>

          <Button
          
            size="sm"
            variant="outline"
            disabled={!hasNext}
          >
            <Link
              href={`/dashboard/applications?page=${currentPage + 1}`}
              aria-disabled={!hasNext}
              tabIndex={hasNext ? undefined : -1}
              className={!hasNext ? "pointer-events-none opacity-50" : ""}
            >
              Next
            </Link>
          </Button>
        </div>
      </div>

      <AddButton />
    </div>
  );
}