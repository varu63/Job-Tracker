// lib/dashboard.ts

import { db } from "@/lib/db";

export async function getDashboardData(userId: string) {
  const applications = await db.jobApplication.findMany({
    where: {
      userId,
    },
    orderBy: {
      applicationDate: "desc",
    },
  });

  const totalApplications = applications.length;

  const applied = applications.filter(
    (job) => job.status === "APPLIED"
  ).length;

  const interviews = applications.filter((job) =>
    [
      "INTERVIEW_SCHEDULED",
      "HR_INTERVIEW",
      "TECHNICAL_INTERVIEW",
      "FINAL_INTERVIEW",
    ].includes(job.status)
  ).length;

  const offers = applications.filter(
    (job) => job.status === "OFFER_RECEIVED"
  ).length;

  // Monthly chart
  const monthlyData = [
    { month: "Jan", total: 0 },
    { month: "Feb", total: 0 },
    { month: "Mar", total: 0 },
    { month: "Apr", total: 0 },
    { month: "May", total: 0 },
    { month: "Jun", total: 0 },
    { month: "Jul", total: 0 },
    { month: "Aug", total: 0 },
    { month: "Sep", total: 0 },
    { month: "Oct", total: 0 },
    { month: "Nov", total: 0 },
    { month: "Dec", total: 0 },
  ];

  applications.forEach((job) => {
    const month = new Date(job.applicationDate).getMonth();
    monthlyData[month].total++;
  });

  // Status chart
  const statusData = [
    {
      status: "Applied",
      value: applied,
    },
    {
      status: "Interview",
      value: interviews,
    },
    {
      status: "Offer",
      value: offers,
    },
  ];

  return {
    applications,
    totalApplications,
    applied,
    interviews,
    offers,
    monthlyData,
    statusData,
  };
}