import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { deleteSchool, RESET_SCHOOL } from "@/store/school/schoolSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Trash2 } from "lucide-react";


const DeleteSchool = ({ schoolId }: { schoolId: number }) => {
    const dispatch = useAppDispatch();
    const { isSuccess, isLoading, isError } = useSelector((state: RootState) => state.school);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        await dispatch(deleteSchool(schoolId));
    };

    // Close dialog on success and call optional callback
    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            dispatch(RESET_SCHOOL());
        }
    }, [isSuccess, dispatch]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Tooltip>
                <TooltipTrigger asChild className=" h-10 w-10 p-2.5 flex items-center justify-center rounded-md">
                    <DialogTrigger asChild >
                        <DialogTrigger asChild >
                            <Trash2 />
                        </DialogTrigger>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this school? This action cannot be undone.</p>
                {isError && (
                    <p className="text-red-600 mt-2">{typeof isError === "string" ? isError : "Failed to delete."}</p>
                )}
                <DialogFooter className="mt-5">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="ml-2"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteSchool;
