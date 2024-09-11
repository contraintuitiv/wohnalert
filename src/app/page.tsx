import { RecordsProvider } from '@/context/records-context';
import { prisma } from '../../lib/prisma';
import RecordsMap from './records-map';
import RecordsTable from './records-table-old';
import { SettingsProvider } from '@/context/settings-context';
import Filter from './filter';
export default async function Home() {
    const data = await prisma.record.findMany({
        distinct: ['borough'],
        select: {
            borough: true,
        },
    });
    const boroughs: string[] = data.map(str => str.borough);

    const records = await prisma.record.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <SettingsProvider>
            <RecordsProvider initialRecords={records}>
                <main className="p-5">
                    <div className="mb-5">
                        <Filter initialBoroughs={boroughs} />
                    </div>
                    <div>
                        <RecordsTable />
                    </div>
                </main>
            </RecordsProvider>
        </SettingsProvider>
    );
}
