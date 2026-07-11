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
}

export default function ApplicationsTable({
  applications,
}: Props) {
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
                  asChild
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
      <AddButton/>
    </div>
  );
}