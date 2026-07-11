"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobApplicationSchema, JobApplicationType } from "@/lib/validations/job";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobApplicationFormProps {
  onSubmit: (data: JobApplicationType) => Promise<void>;
  defaultValues?: Partial<JobApplicationType>;
}

export default function JobApplicationForm({
  onSubmit,
  defaultValues,
}: JobApplicationFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationType>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      companyName: "",
      jobRole: "",
      location: "",
      salary: "",
      jobUrl: "",
      notes: "",
      workMode: "REMOTE",
      employmentType: "INTERNSHIP",
      status: "APPLIED",
      interviewRound: "NOT_STARTED",
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Company Name */}
      <div className="space-y-2">
        <Label>Company Name</Label>

        <Input
          {...register("companyName")}
          placeholder="Google"
        />

        {errors.companyName && (
          <p className="text-sm text-red-500">
            {errors.companyName.message}
          </p>
        )}
      </div>

      {/* Job Role */}
      <div className="space-y-2">
        <Label>Job Role</Label>

        <Input
          {...register("jobRole")}
          placeholder="Frontend Developer"
        />

        {errors.jobRole && (
          <p className="text-sm text-red-500">
            {errors.jobRole.message}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label>Location</Label>

        <Input
          {...register("location")}
          placeholder="Bangalore"
        />
      </div>

      {/* Salary */}
      <div className="space-y-2">
        <Label>Salary</Label>

        <Input
          {...register("salary")}
          placeholder="₹12 LPA"
        />
      </div>

      {/* Work Mode */}
      <div className="space-y-2">
        <Label>Work Mode</Label>

        <Select
          value={watch("workMode")}
          onValueChange={(value) =>
            setValue("workMode", value as JobApplicationType["workMode"])
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="REMOTE">Remote</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
            <SelectItem value="ONSITE">Onsite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Employment Type */}
      <div className="space-y-2">
        <Label>Employment Type</Label>

        <Select
          value={watch("employmentType")}
          onValueChange={(value) =>
            setValue(
              "employmentType",
              value as JobApplicationType["employmentType"]
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="INTERNSHIP">Internship</SelectItem>
            <SelectItem value="FULL_TIME">Full Time</SelectItem>
            <SelectItem value="PART_TIME">Part Time</SelectItem>
            <SelectItem value="CONTRACT">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status</Label>

        <Select
          value={watch("status")}
          onValueChange={(value) =>
            setValue("status", value as JobApplicationType["status"])
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="SAVED">Saved</SelectItem>
            <SelectItem value="APPLIED">Applied</SelectItem>
            <SelectItem value="ASSESSMENT">Assessment</SelectItem>
            <SelectItem value="INTERVIEW_SCHEDULED">
              Interview Scheduled
            </SelectItem>
            <SelectItem value="OFFER_RECEIVED">
              Offer Received
            </SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Round */}
      <div className="space-y-2">
        <Label>Interview Round</Label>

        <Select
          value={watch("interviewRound")}
          onValueChange={(value) =>
            setValue(
              "interviewRound",
              value as JobApplicationType["interviewRound"]
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="NOT_STARTED">Not Started</SelectItem>
            <SelectItem value="ROUND_1">Round 1</SelectItem>
            <SelectItem value="ROUND_2">Round 2</SelectItem>
            <SelectItem value="ROUND_3">Round 3</SelectItem>
            <SelectItem value="HR">HR Round</SelectItem>
            <SelectItem value="FINAL">Final Round</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job URL */}
      <div className="space-y-2">
        <Label>Job URL</Label>

        <Input
          {...register("jobUrl")}
          placeholder="https://careers.company.com"
        />
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label>Notes</Label>

        <Textarea
          {...register("notes")}
          placeholder="Referral details, recruiter name, interview notes..."
          rows={5}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Application"}
      </Button>
    </form>
  );
}