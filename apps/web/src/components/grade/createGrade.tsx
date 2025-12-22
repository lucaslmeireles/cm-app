"use client";

import { Button } from "@/repo/ui/components/ui/button";
import { Card } from "@/repo/ui/components/ui/card";
import { Input } from "@/repo/ui/components/ui/input";
import { Label } from "@/repo/ui/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/repo/ui/components/ui/select";
import { useForm } from "react-hook-form";

export function CreateGrade() {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Create Grades</h2>
      <form className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="metric">Metric</Label>
          <Input id="metric" name="metric" placeholder="Enter metric" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Select id="type" name="type">
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hardskill">Hard Skill</SelectItem>
              <SelectItem value="softskill">Soft Skill</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="grade">Grade</Label>
          <Input id="grade" name="grade" placeholder="Enter grade" />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Card>
  );
}
