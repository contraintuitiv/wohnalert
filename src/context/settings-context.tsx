"use client"
import { useSearchParams } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export interface Filters {
    boroughs?: string[]
    landlords?: string[]
    minRent?: number
    maxRent?: number
    minSize?: number
    maxSize?: number
    minRooms?: number
    maxRooms?: number
}

export interface Settings {
    filters: Filters
}

const SettingsContext = createContext<{
    settings: Settings;
    updateSettings: (settings: Settings) => void;
}>({
    settings: { filters: {} },
    updateSettings: () => { },
});


export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const query = useSearchParams().toString()

    const [settings, setSettings] = useState<Settings>({ filters: {} });

    const updateSettings = (settings: Settings) => {
        localStorage.setItem('settings', JSON.stringify(settings))
        setSettings(settings);
    };
    
    useEffect(() => {
        const savedSettings = localStorage.getItem('settings')
        if(savedSettings) updateSettings(JSON.parse(savedSettings))
    }, [])
    return <SettingsContext.Provider value={{ settings: settings, updateSettings: updateSettings }}>
        {children}
    </SettingsContext.Provider>
};

export const useSettings = () => useContext(SettingsContext);