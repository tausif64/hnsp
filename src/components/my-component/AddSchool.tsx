import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addSchool, RESET_SCHOOL } from "@/store/school/schoolSlice";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";


// Zod schema
const schoolSchema = z.object({
    schoolName: z.string().min(1, "School name is required"),
    gp: z.string().min(1, "GP is required"),
    block: z.string().min(1, "Block is required"),
    teacherName: z.string().min(1, "Teacher name is required"),
    sikshaSathi: z.string().min(1, "Siksha Sathi is required"),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

const AddSchool = () => {
    const dispatch = useAppDispatch();
    const { isSuccess } = useSelector((state: RootState) => state.school);

    const [open, setOpen] = useState(false); // Dialog control

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SchoolFormData>({
        resolver: zodResolver(schoolSchema),
    });

    const onSubmit = async (data: SchoolFormData) => {
        await dispatch(addSchool(data));
    };

    // Close dialog and reset form on successful submission
    useEffect(() => {
        if (isSuccess) {
            reset();
            setOpen(false); // Close dialog
            dispatch(RESET_SCHOOL()); // Clear success state
        }
    }, [isSuccess, reset, dispatch]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add School</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle className="text-center !text-4xl mb-8">Add New School</DialogTitle>
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
                        <Button
                            type="button"
                            variant="outline"
                            className="h-12"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="h-12">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddSchool;
