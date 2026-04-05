import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FileQuestion className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Button render={<Link href="/" />}>Go Home</Button>
          <Button variant="outline" render={<Link href="/contact" />}>
            Contact Us
          </Button>
        </div>
      </div>
    </main>
  );
}
