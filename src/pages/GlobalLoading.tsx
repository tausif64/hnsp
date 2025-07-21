import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoading } from "@/lib/selectors";

const GlobalLoading: React.FC = () => {
    const isLoading = useSelector(selectIsLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white backdrop-blur-sm">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent rounded-full animate-spin"></div>
            {/* Optional text */}
            <p className="mt-4 text-white text-lg font-medium">Loading...</p>
        </div>
    );
};

export default GlobalLoading;
