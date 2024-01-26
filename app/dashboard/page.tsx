import { Card } from '@/app/dashboard/dashboard/cards';
import RevenueChart from '@/app/dashboard/dashboard/revenue-chart';
import LatestInvoices from '@/app/dashboard/dashboard/latest-invoices';
import { lusitana } from '@/app/fonts/lusitana';
import { fetchCardData } from '@/app/lib/data';

import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/dashboard/skeletons';


export default async function Page() {
 const { totalPaidInvoices, totalPendingInvoices, numberOfInvoices, numberOfCustomers} = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}