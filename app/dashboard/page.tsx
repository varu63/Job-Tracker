import { Briefcase, Send, Users, Award } from "lucide-react";
import { getDashboardData } from "@/lib/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonthlyApplicationsChart from "@/components/charts/monthly-applications-chart";
import ApplicationStatusChart from "@/components/charts/application-status-chart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import AddButton from "@/components/applications/add-button"

export default async function DashboardPage() {

const session = await auth.api.getSession({
  headers: await headers(),
});



if (!session) return null;



const {
  applications,
  totalApplications,
  applied,
  interviews,
  offers,
  monthlyData,
  statusData,
} = await getDashboardData(session.user.id);
;

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Track your job applications and hiring progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Applications
              </p>

              <h2 className="text-3xl font-bold">
                {totalApplications}
              </h2>
            </div>

            <Briefcase className="h-8 w-8 text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">
                <Badge>Applied</Badge>
              </p>

              <h2 className="text-3xl font-bold">
                {applied}
              </h2>
            </div>

            <Send className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Interviews
              </p>

              <h2 className="text-3xl font-bold">
                {interviews}
              </h2>
            </div>

            <Users className="h-8 w-8 text-orange-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Offers
              </p>

              <h2 className="text-3xl font-bold">
                {offers}
              </h2>
            </div>

            <Award className="h-8 w-8 text-purple-600" />
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Monthly Applications
            </CardTitle>

            <CardDescription>
              Applications submitted this year.
            </CardDescription>
          </CardHeader>

          <CardContent>
  <MonthlyApplicationsChart
  data={monthlyData} />
</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Application Status
            </CardTitle>

            <CardDescription>
              Current application distribution.
            </CardDescription>
          </CardHeader>

          <CardContent>
  <ApplicationStatusChart data={statusData} />
</CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>
            Recent Applications
          </CardTitle>

          <CardDescription>
            Your latest job applications.
          </CardDescription>
        </CardHeader>

        <CardContent>
          
          {applications.slice(0, 5).map((job) => (
  <div
    key={job.id}
    className="flex items-center justify-between rounded-lg border p-4"
  >
    <div>
      <h3 className="font-semibold">
        {job.companyName}
      </h3>

      <p className="text-sm text-muted-foreground">
        {job.jobRole}
      </p>
    </div>

    <Badge>{job.status}</Badge>
    
  </div>
))}
        </CardContent>
      </Card>
      <AddButton/>
    </div>
  );
}