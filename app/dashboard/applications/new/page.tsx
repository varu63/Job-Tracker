"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

export default function CreateApplicationPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    jobRole: "",
    location: "",
    salary: "",
    workMode: "",
    employmentType: "",
    status: "",
    interviewRound: "",
    jobUrl: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          applicationDate: date,
        }),
      });

      const data = await response.json();
      console.log( " this is the data",data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to save application");
      }

      alert("Application saved successfully!");

      setFormData({
        companyName: "",
        jobRole: "",
        location: "",
        salary: "",
        workMode: "",
        employmentType: "",
        status: "",
        interviewRound: "",
        jobUrl: "",
        notes: "",
      });

      setDate(undefined);
    } catch (error) {
      console.error(error);
      alert("Failed to save application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-5xl py-10 px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Create Job Application</CardTitle>

          <CardDescription>
            Add a new job application and track its progress.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Company & Role */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Company Name</Label>

                <Input
                  name="companyName"
                  placeholder="Google"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Job Role</Label>

                <Input
                  name="jobRole"
                  placeholder="Software Engineer Intern"
                  value={formData.jobRole}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Location & Salary */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Job Location</Label>

                <Input
                  name="location"
                  placeholder="Bengaluru"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Salary (Optional)</Label>

                <Input
                  name="salary"
                  placeholder="₹12 LPA"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Work Mode & Employment */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Work Mode</Label>

                <Select
                  value={formData.workMode}
                  onValueChange={(value) =>
                    handleSelectChange("workMode", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Work Mode" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="REMOTE">Remote</SelectItem>

                    <SelectItem value="HYBRID">Hybrid</SelectItem>

                    <SelectItem value="ONSITE">Onsite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Employment Type</Label>

                <Select
                  value={formData.employmentType}
                  onValueChange={(value) =>
                    handleSelectChange("employmentType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="INTERNSHIP">Internship</SelectItem>

                    <SelectItem value="FULL_TIME">Full Time</SelectItem>

                    <SelectItem value="CONTRACT">Contract</SelectItem>

                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Date & Status */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Application Date</Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start w-full">
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>

                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="SAVED">Saved</SelectItem>

                    <SelectItem value="APPLIED">Applied</SelectItem>

                    <SelectItem value="ASSESSMENT">Assessment</SelectItem>

                    <SelectItem value="INTERVIEW_SCHEDULED">
                      Interview Scheduled
                    </SelectItem>

                    <SelectItem value="OFFER_RECEIVED">Offer Received</SelectItem>

                    <SelectItem value="ACCEPTED">Accepted</SelectItem>

                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Interview Round */}
            <div className="space-y-2">
              <Label>Current Interview Round</Label>

              <Select
                value={formData.interviewRound}
                onValueChange={(value) =>
                  handleSelectChange("interviewRound", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Round" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="NOT_STARTED">Not Started</SelectItem>

                  <SelectItem value="ROUND_1">Round 1</SelectItem>

                  <SelectItem value="ROUND_2">Round 2</SelectItem>

                  <SelectItem value="ROUND_3">Round 3</SelectItem>

                  <SelectItem value="MANAGER">Manager Round</SelectItem>

                  <SelectItem value="HR">HR Round</SelectItem>

                  <SelectItem value="FINAL">Final Round</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job URL */}
            <div className="space-y-2">
              <Label>Job URL</Label>

              <Input
                name="jobUrl"
                placeholder="https://company.com/jobs/123"
                value={formData.jobUrl}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>

              <Textarea
                name="notes"
                rows={5}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Referral details..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
