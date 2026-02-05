 import {
   PieChart,
   Pie,
   Cell,
   ResponsiveContainer,
   Legend,
   Tooltip,
 } from 'recharts';
 import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
 
 const data = [
   { name: 'Electricity', value: 35, color: 'hsl(45 100% 50%)' },
   { name: 'Water', value: 28, color: 'hsl(210 70% 50%)' },
   { name: 'Gas', value: 15, color: 'hsl(24 100% 50%)' },
   { name: 'Sanitation', value: 12, color: 'hsl(145 74% 40%)' },
   { name: 'Municipal', value: 10, color: 'hsl(280 60% 50%)' },
 ];
 
 const chartConfig = {
   electricity: { label: 'Electricity', color: 'hsl(45 100% 50%)' },
   water: { label: 'Water', color: 'hsl(210 70% 50%)' },
   gas: { label: 'Gas', color: 'hsl(24 100% 50%)' },
   sanitation: { label: 'Sanitation', color: 'hsl(145 74% 40%)' },
   municipal: { label: 'Municipal', color: 'hsl(280 60% 50%)' },
 };
 
 export default function UsageDonutChart() {
   return (
     <ChartContainer config={chartConfig} className="h-64 w-full">
       <PieChart>
         <Pie
           data={data}
           cx="50%"
           cy="50%"
           innerRadius={60}
           outerRadius={80}
           paddingAngle={3}
           dataKey="value"
           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
           labelLine={false}
         >
           {data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={entry.color} />
           ))}
         </Pie>
         <Tooltip 
           content={<ChartTooltipContent />}
           formatter={(value: number) => [`${value}%`, 'Usage Share']}
         />
       </PieChart>
     </ChartContainer>
   );
 }