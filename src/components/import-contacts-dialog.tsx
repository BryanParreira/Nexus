// components/import-contacts-dialog.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportContactsDialog = ({
  open,
  onOpenChange,
}: ImportContactsDialogProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (file) {
      console.log("Importing file:", file.name);
      setFile(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
          <DialogDescription>
            Upload a CSV file to import multiple contacts at once
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!file ? (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <input
                type="file"
                id="file-upload"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <Upload className="w-12 h-12 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Click to upload CSV</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    or drag and drop
                  </p>
                </div>
              </label>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">CSV Format Requirements:</h4>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Include headers: name, email, phone, company, position</li>
              <li>Email is required for each contact</li>
              <li>Use comma-separated values</li>
              <li>Maximum 1000 contacts per import</li>
            </ul>
          </div>

          <Button variant="outline" size="sm" className="w-full">
            Download Sample CSV
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file}>
            Import Contacts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportContactsDialog;