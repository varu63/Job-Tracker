import { z } from "zod";

export const JobApplicationSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters"),

  jobRole: z
    .string()
    .min(2, "Job role is required"),

  location: z
    .string()
    .min(2, "Location is required"),

  applicationDate: z.coerce.date({
  message: "Application date is required",
}),
  workMode: z.enum([
    "REMOTE",
    "HYBRID",
    "ONSITE",
  ]),

  employmentType: z.enum([
    "INTERNSHIP",
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
  ]),

  status: z.enum([
    "SAVED",
    "APPLIED",
    "ASSESSMENT",
    "INTERVIEW_SCHEDULED",
    "HR_INTERVIEW",
    "TECHNICAL_INTERVIEW",
    "FINAL_INTERVIEW",
    "OFFER_RECEIVED",
    "ACCEPTED",
    "REJECTED",
    "WITHDRAWN",
  ]),

  interviewRound: z.enum([
    "NOT_STARTED",
    "ROUND_1",
    "ROUND_2",
    "ROUND_3",
    "HR",
    "MANAGER",
    "FINAL",
  ]),

  salary: z
    .string()
    .optional(),

  jobUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export type JobApplicationType = z.infer<typeof JobApplicationSchema>;
export type JobApplicationInput = z.input<typeof JobApplicationSchema>;