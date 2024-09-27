import { Record } from '@prisma/client';

export default function TestComponent({
    initialBoroughs,
    initialRecords,
}: {
    initialBoroughs: string[];
    initialRecords: Record[];
}) {
    console.log("TESTCOMPPPPPPP")
    console.log("testcomp boroughs", initialBoroughs);
    console.log("testcomp records", initialRecords);

    return <>Testkomponente {JSON.stringify(initialBoroughs)}</>
}
