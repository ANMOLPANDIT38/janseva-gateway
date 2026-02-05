 import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Legend,
   Area,
   AreaChart,
 } from 'recharts';
 import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
 
 const data = [
   { month: 'Jan', transactions: 1850000, users: 18500 },
   { month: 'Feb', transactions: 2100000, users: 21000 },
   { month: 'Mar', transactions: 1950000, users: 19500 },
   { month: 'Apr', transactions: 2400000, users: 24000 },
   { month: 'May', transactions: 2650000, users: 26500 },
   { month: 'Jun', transactions: 2200000, users: 22000 },
   { month: 'Jul', transactions: 2800000, users: 28000 },
   { month: 'Aug', transactions: 3100000, users: 31000 },
   { month: 'Sep', transactions: 2900000, users: 29000 },
   { month: 'Oct', transactions: 3200000, users: 32000 },
   { month: 'Nov', transactions: 3500000, users: 35000 },
   { month: 'Dec', transactions: 3800000, users: 38000 },
 ];
 
 const chartConfig = {
   transactions: {
     label: 'Transactions (₹)',
     color: 'hsl(220 70% 45%)',
   },
   users: {
     label: 'Active Users',
     color: 'hsl(145 74% 30%)',
   },
 };
 
 export default function TransactionTrendsChart() {
   const formatValue = (value: number) => {
     if (value >= 1000000) {
       return `₹${(value / 1000000).toFixed(1)}M`;
     }
     if (value >= 1000) {
       return `₹${(value / 1000).toFixed(0)}K`;
     }
     return `₹${value}`;
   };
 
   return (
     <ChartContainer config={chartConfig} className="h-64 w-full">
       <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
         <defs>
           <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor="hsl(220 70% 45%)" stopOpacity={0.3} />
             <stop offset="95%" stopColor="hsl(220 70% 45%)" stopOpacity={0} />
           </linearGradient>
           <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
             <stop offset="5%" stopColor="hsl(145 74% 30%)" stopOpacity={0.3} />
             <stop offset="95%" stopColor="hsl(145 74% 30%)" stopOpacity={0} />
           </linearGradient>
         </defs>
         <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
         <XAxis 
           dataKey="month" 
           tick={{ fontSize: 12 }}
           tickLine={false}
           axisLine={false}
         />
         <YAxis 
           tick={{ fontSize: 12 }}
           tickLine={false}
           axisLine={false}
           tickFormatter={formatValue}
         />
         <Tooltip 
           content={<ChartTooltipContent />}
           formatter={(value: number) => formatValue(value)}
         />
         <Legend />
         <Area
           type="monotone"
           dataKey="transactions"
           stroke="var(--color-transactions)"
           strokeWidth={2}
           fill="url(#colorTransactions)"
           name="Transactions"
         />
       </AreaChart>
     </ChartContainer>
   );
 }