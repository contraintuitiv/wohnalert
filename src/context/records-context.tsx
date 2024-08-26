"use client"
import { Record } from "@prisma/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetchJson } from "../../lib/fetch";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {  useSettings } from "./settings-context";
import { filtersToQueryString } from "../../lib/util";

const RecordsContext = createContext<{
    records: Record[];
    updateRecords: (records: Record[]) => void;
}>({
    records: [],
    updateRecords: () => { },
});


  
export const RecordsProvider = ({ children, initialRecords }: { children: ReactNode, initialRecords?: Record[] }) => {

    const { settings } = useSettings()

    const { data, isLoading } = useSWR(`/api/record?${filtersToQueryString(settings.filters)}`, fetchJson<Record[]>, { fallbackData: initialRecords })

    const [records, setRecords] = useState<Record[]>([]);

    const updateRecords = (records: Record[]) => {
        setRecords(records);
    };

    useEffect(() => {
        setRecords(data || [])
    }, [data])


    return <RecordsContext.Provider value={{ records, updateRecords }}>
        {isLoading ? <LoadingSpinner /> : children}
    </RecordsContext.Provider>
};

export const useRecords = () => useContext(RecordsContext);