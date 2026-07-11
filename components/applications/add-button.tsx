import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


const AddButton = () => {
  return (
    <Link
  href="/dashboard/applications/new"
  className="fixed bottom-6 right-6 z-50"
>
  <Button
    size="lg"
    className="h-14 rounded-full shadow-lg"
  >
    <Plus className="h-5 w-5" />
    <span className="ml-2 hidden sm:inline">
      Add Application
    </span>
  </Button>
</Link>
  )
}

export default AddButton
