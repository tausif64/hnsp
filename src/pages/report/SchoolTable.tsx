import * as XLSX from "xlsx";
import DataTable, { type TableColumn } from "react-data-table-component";
import { Button } from "@/components/ui/button";
import type { SchoolData } from "@/config/interface";
import AddSchool from "@/components/my-component/AddSchool";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useEffect, useState } from "react";
import { getSchoolData } from "@/store/school/schoolSlice";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import UpdateSchool from "@/components/my-component/UpdateSchool";
import DeleteSchool from "@/components/my-component/DeleteSchool";
import { Input } from "@/components/ui/input";


const SchoolTable: React.FC = () => {

    const { schools } = useSelector((state: RootState) => state.school);
    const dispatch = useAppDispatch();

    const [term, setTerm] = useState("");
    const [results, setResults] = useState<SchoolData[]>(schools);


    useEffect(() => {
        const fetchSchoolData = async () => {
            if (!schools || schools.length === 0) {
                await dispatch(getSchoolData());
            }
        };

        fetchSchoolData();
    }, [dispatch, schools]);


    const columns: TableColumn<SchoolData>[] = [
        {
            name: "S.No.",
            sortable: false,
            cell: (_row: SchoolData, index: number) => index + 1,
            width: "70px",
        },
        {
            name: "School ID",
            selector: (row) => row.schoolId || '',
            sortable: true,
            width: "110px",
        },
        {
            name: "School Name",
            selector: (row) => row.schoolName || '',
            sortable: true,
        },
        {
            name: "GP",
            selector: (row) => row.gp || '',
            sortable: true,
            width: "100px",
        },
        {
            name: "Block",
            selector: (row) => row.block || '',
            sortable: true,
            width: "100px",
        },
        {
            name: "Teacher Name",
            selector: (row) => row.teacherName || '',
            sortable: true,
            width: "180px",
        },
        {
            name: <>Total No. <br />of Students</>,
            selector: (row) => row.totalStudents ?? 0, // default to 0 if undefined
            sortable: true,
            width: "140px",
        },
        {
            name: "Siksha Sathi",
            selector: (row) => row.sikshaSathi || '',
            sortable: true,
        },
        {
            name: "Actions",
            cell: (row) => <div className=" flex gap-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link className=" h-10 w-10 p-2 flex items-center justify-center rounded-md" to={'/report/schools/view/' + row.schoolId}><Eye /></Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View</p>
                    </TooltipContent>
                </Tooltip>
                <UpdateSchool school={row} />
                {typeof row.id === "number" && <DeleteSchool schoolId={row.id} />}
            </div>,
        },
    ];

    const handleOnExport = (): void => {
        if (results.length !== 0) {
            const transformedData = results.map((row, index) => ({
                "S.No.": index + 1,
                "School ID": row.schoolId || '',
                "School Name": row.schoolName || '',
                "GP": row.gp || '',
                "Block": row.block || '',
                "Teacher Name": row.teacherName || '',
                "Total No. of Students": row.totalStudents ?? 0,
                "Siksha Sathi": row.sikshaSathi || '',
            }));

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(transformedData);
            const createdDate = new Date();
            const date = `${createdDate.getDate()}-${createdDate.getMonth() + 1}-${createdDate.getFullYear()}`;

            XLSX.utils.book_append_sheet(wb, ws, "Schools");
            XLSX.writeFile(wb, `Schools_${date}.xlsx`);
        } else {
            toast.error("No Data is available");
        }
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            const filtered = schools.filter(d =>
                d.schoolName.toLowerCase().includes(term.toLowerCase())
            );
            setResults(filtered);
        }, 300);
        return () => clearTimeout(timer);
    }, [schools, term]);


    return (
        <div className="special-padding">
            <DataTable
                columns={columns}
                data={results}
                pagination
                fixedHeader
                fixedHeaderScrollHeight="550px"
                highlightOnHover
                striped
                actions={
                    <>
                        <Input type="search" onChange={(e) => setTerm(e.target.value)} className="max-w-sm" placeholder="School Name" disabled={schools.length === 0} />
                        <AddSchool />
                        <Button type="button" onClick={handleOnExport} disabled={results.length === 0} >
                            Export
                        </Button>
                    </>
                }
            />
        </div>
    );
};

export default SchoolTable;
