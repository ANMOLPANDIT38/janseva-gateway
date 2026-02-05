 import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   Legend,
 } from 'recharts';
 import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
 
 const data = [
   { department: 'Electricity', complaints: 450, resolved: 380 },
   { department: 'Water', complaints: 380, resolved: 320 },
   { department: 'Gas', complaints: 220, resolved: 195 },
   { department: 'Sanitation', complaints: 340, resolved: 280 },
   { department: 'Municipal', complaints: 290, resolved: 240 },
 ];
 
 const chartConfig = {
   complaints: {
     label: 'Total Complaints',
     color: 'hsl(24 100% 60%)',
   },
   resolved: {
     label: 'Resolved',
     color: 'hsl(145 74% 30%)',
   },
 };
 
 export default function DepartmentComplaintsChart() {
   return (
     <ChartContainer config={chartConfig} className="h-64 w-full">
       <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
         <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
         <XAxis 
           dataKey="department" 
           tick={{ fontSize: 12 }}
           tickLine={false}
           axisLine={false}
         />
         <YAxis 
           tick={{ fontSize: 12 }}
           tickLine={false}
           axisLine={false}
         />
         <Tooltip content={<ChartTooltipContent />} />
         <Legend />
         <Bar 
           dataKey="complaints" 
           fill="var(--color-complaints)" 
           radius={[4, 4, 0, 0]}
           name="Total"
         />
         <Bar 
           dataKey="resolved" 
           fill="var(--color-resolved)" 
           radius={[4, 4, 0, 0]}
           name="Resolved"
         />
       </BarChart>
     </ChartContainer>
   );
 }