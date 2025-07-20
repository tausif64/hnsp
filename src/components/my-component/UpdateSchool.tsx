import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { updateSchool, RESET_SCHOOL } from "@/store/school/schoolSlice";
import type { RootState } from "@/store/store";
import type { SchoolData } from "@/config/interface";
import { SquarePen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// Editable field schema
const schoolSchema = z.object({
  id: z.number().optional(),
  schoolName: z.string().min(1, "School name is required"),
  gp: z.string().min(1, "GP is required"),
  block: z.string().min(1, "Block is required"),
  teacherName: z.string().min(1, "Teacher name is required"),
  sikshaSathi: z.string().min(1, "Siksha Sathi is required"),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

interface UpdateSchoolProps {
  school: SchoolData;
}

const UpdateSchool = ({ school }: UpdateSchoolProps) => {
  const dispatch = useAppDispatch();
  const { isSuccess } = useSelector((state: RootState) => state.school);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      id: school.id,
      schoolName: school.schoolName,
      gp: school.gp,
      block: school.block,
      teacherName: school.teacherName,
      sikshaSathi: school.sikshaSathi,
    },
  });

  const onSubmit = async (data: SchoolFormData) => {
    await dispatch(updateSchool({ ...school, ...data }));
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setOpen(false);
      dispatch(RESET_SCHOOL());
    }
  }, [isSuccess, reset, dispatch]);

  useEffect(() => {
    if (open) {
      reset({
        id: school.id,
        schoolName: school.schoolName,
        gp: school.gp,
        block: school.block,
        teacherName: school.teacherName,
        sikshaSathi: school.sikshaSathi,
      });
    }
  }, [open, school, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild className="h-10 w-10 p-2.5 flex items-center justify-center rounded-md">
          <DialogTrigger asChild >
            <SquarePen  />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-center !text-4xl mb-8">Update School</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 grid-cols-12">
            {[
              { id: "schoolName", label: "School Name" },
              { id: "gp", label: "GP" },
              { id: "block", label: "Block" },
              { id: "teacherName", label: "Teacher Name" },
              { id: "sikshaSathi", label: "Siksha Sathi" },
            ].map(({ id, label }) => (
              <div key={id} className="grid gap-1 col-span-12 md:col-span-6">
                <Label htmlFor={id}>{label}</Label>
                <Input id={id} {...register(id as keyof SchoolFormData)} className="h-12" />
                {errors[id as keyof SchoolFormData] && (
                  <p className="text-sm text-red-500">
                    {errors[id as keyof SchoolFormData]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="mt-5">
            <Button type="button" variant="outline" className="h-12" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="h-12">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateSchool;
