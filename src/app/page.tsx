import { RecordsProvider } from '@/context/records-context';
import { prisma } from '../../lib/prisma';
import RecordsMap from './records-map';
import RecordsTable from './records-table';
import { SettingsProvider } from '@/context/settings-context';
import Filter from './filter';
import { captureMessage } from '@sentry/nextjs';

export default async function Home() {
    // const data = await prisma.record.findMany({
    //     // distinct: ['borough'],
    //     select: {
    //         borough: true,
    //     },
    // });


    const records = await prisma.record.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
    });


    // const boroughs: string[] = [...new Set(records.map(str => str.borough))];
    

    return (
        <SettingsProvider>
            <RecordsProvider initialRecords={records}>
                <main>
                    <div className="px-4 sm:p-6">
                        <Filter />
                    </div>
                    <div>
                        <RecordsTable />
                    </div>
                </main>
            </RecordsProvider>
        </SettingsProvider>
    );
}
