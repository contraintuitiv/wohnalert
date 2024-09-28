import { RecordsProvider } from '@/context/records-context';
import { prisma } from '../../../lib/prisma';
import RecordsTable from '../records-table';
import { SettingsProvider } from '@/context/settings-context';
import Filter from '../filter';

export default async function Home({ params }: { params: { recordId: string[] } }) {

    const records = await prisma.record.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <SettingsProvider>
            <RecordsProvider initialRecords={records}>
                <main>
                    <div className="px-4 sm:p-6">
                        <Filter />
                    </div>
                    <div>
                        <RecordsTable recordId={parseInt(params.recordId?.[0])} />
                    </div>
                </main>
            </RecordsProvider>
        </SettingsProvider>
    );
}
