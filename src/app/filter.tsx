"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, useSettings } from "@/context/settings-context"
import { useState } from "react"
import { isNumeric } from "validator"

export default function Filter({ initialBoroughs }: { initialBoroughs: string[] }) {
    const { settings, updateSettings } = useSettings()

    const [showFilter, setShowFilter] = useState(false)
    const [maxRent, setMaxRent] = useState(settings.filters.maxRent)
    const [minSize, setMinSize] = useState(settings.filters.minSize)
    const [minRooms, setMinRooms] = useState(settings.filters.minRooms)

    const allBoroughsChecked = !settings.filters.boroughs || settings.filters.boroughs.length === initialBoroughs.length || settings.filters.boroughs.length === 0


    const handleBoroughClick = (borough: string) => {
        const newSettings = JSON.parse(JSON.stringify(settings)) as Settings
        if (!newSettings.filters.boroughs) {
            newSettings.filters.boroughs = [borough]
        } else {
            const index = newSettings.filters.boroughs.findIndex(item => item === borough);
            if (index !== -1) {
                newSettings.filters.boroughs.splice(index, 1)
            } else {
                newSettings.filters.boroughs.push(borough)
            }
        }
        updateSettings(newSettings)
    }


    const updateFilters = () => {
        const newSettings = { ...settings }
        if (maxRent) settings.filters.maxRent = maxRent
        if (minSize) settings.filters.minSize = minSize
        if (minRooms) settings.filters.minRooms = minRooms
        updateSettings(newSettings)
    }


    return <>
        <h3 onClick={() => setShowFilter(!showFilter)} className="cursor-pointer hover:underline">
            {showFilter ? '▲' : '▼'} Filter <span className="text-gray-500 text-sm">{settings.filters.boroughs?.join(", ")}{maxRent && ` - max. ${maxRent}€`}{minSize && ` - min. ${minSize}m²`}{minRooms && minRooms > 0 && ` - min. ${minRooms} Zimmer`}</span>
        </h3>
        {showFilter &&
            <div className="flex space-x-5 border border-black rounded-sm p-3">
                <div>
                    Bezirke: <div>
                        {initialBoroughs.map(borough => <div key={borough} className="flex items-center space-x-2">
                            <Checkbox
                                id={borough}
                                checked={settings.filters.boroughs?.includes(borough)}
                                onClick={() => handleBoroughClick(borough)}
                            />
                            <Label htmlFor={borough}>{borough}</Label>
                        </div>)}
                        <div>
                            <Checkbox
                                id="alle"
                                checked={allBoroughsChecked}
                                onClick={() => {

                                    const newSettings = { ...settings }
                                    delete (newSettings.filters.boroughs)
                                    updateSettings(newSettings)
                                }}
                            />
                            <Label htmlFor="alle">alle</Label>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Label htmlFor="maxRent">maximale Miete</Label>
                        <Input
                            type="number"
                            placeholder="450.33"
                            step="50"
                            min="0"
                            value={maxRent}
                            onChange={(e) => { if (isNumeric(e.target.value)) { setMaxRent(parseFloat(e.target.value)) } }}
                        />
                        <Button type="submit" onClick={updateFilters}>filtern</Button>
                    </div>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Label htmlFor="minSize">minimale Größe (m²)</Label>
                        <Input
                            type="number"
                            placeholder="50.5"
                            value={minSize}
                            step="10"
                            min="0"
                            onChange={(e) => { if (isNumeric(e.target.value)) { setMinSize(parseFloat(e.target.value)) } }}
                        />
                        <Button type="submit" onClick={updateFilters}>filtern</Button>
                    </div>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Label htmlFor="minRooms">mind. Zimmer</Label>
                        <Input
                            type="number"
                            placeholder="50.5"
                            min="0"
                            value={minRooms}
                            onChange={(e) => { if (isNumeric(e.target.value)) { setMinRooms(parseFloat(e.target.value)) } }}
                        />
                        <Button type="submit" onClick={updateFilters}>filtern</Button>
                    </div>

                </div>

            </div>}
    </>
}