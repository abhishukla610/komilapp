"use client";

import { useCallback, useRef } from "react";
import { Upload, X, CheckCircle2, FileSpreadsheet } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  tallyFile: File | null;
  gstr2bFile: File | null;
  onTallyFile: (file: File | null) => void;
  onGstr2bFile: (file: File | null) => void;
}

const ACCEPTED_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
];
const ACCEPTED_EXTENSIONS = ".xlsx,.xls";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DropZone({
  label,
  description,
  file,
  onFile,
}: {
  label: string;
  description: string;
  file: File | null;
  onFile: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile &&
        (ACCEPTED_TYPES.includes(droppedFile.type) ||
          droppedFile.name.endsWith(".xlsx") ||
          droppedFile.name.endsWith(".xls"))
      ) {
        onFile(droppedFile);
      }
    },
    [onFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        onFile(selectedFile);
      }
    },
    [onFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFile(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [onFile]
  );

  return (
    <Card
      className={cn(
        "group cursor-pointer border-2 border-dashed transition-all hover:border-[var(--color-accent-gold)]/50 hover:shadow-md",
        file
          ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/10"
          : "border-muted-foreground/25"
      )}
    >
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="p-6"
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleChange}
          className="hidden"
        />

        <CardHeader className="p-0 pb-3">
          <CardTitle className="text-sm font-medium">{label}</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {file ? (
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="size-7 shrink-0"
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="flex size-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-[var(--color-accent-gold)]/10">
                <Upload className="size-5 text-muted-foreground transition-colors group-hover:text-[var(--color-accent-gold)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {description}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Drag and drop or click to browse
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground/50">
                  .xlsx or .xls files only
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

export function FileUpload({
  tallyFile,
  gstr2bFile,
  onTallyFile,
  onGstr2bFile,
}: FileUploadProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <DropZone
        label="Tally Purchase Register"
        description="Upload your Tally export"
        file={tallyFile}
        onFile={onTallyFile}
      />
      <DropZone
        label="GSTR-2B Portal Download"
        description="Upload your GSTR-2B file"
        file={gstr2bFile}
        onFile={onGstr2bFile}
      />
    </div>
  );
}
