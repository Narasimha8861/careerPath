import { useState } from "react";
import { MarketTrend } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { CHART_COLORS } from "@/lib/constants";

interface MarketTrendsChartProps {
  trends: MarketTrend[];
}

export function MarketTrendsChart({ trends }: MarketTrendsChartProps) {
  const [activeChart, setActiveChart] = useState<"demand" | "growth">("demand");
  
  // Transform data for demand chart
  const demandData = trends.reduce((acc: any[], trend) => {
    const demandValue = trend.demand === "High" 
      ? 3 
      : trend.demand === "Medium" 
        ? 2 
        : 1;
    
    acc.push({
      name: trend.industry,
      value: demandValue,
      demand: trend.demand,
      fill: trend.demand === "High" 
        ? CHART_COLORS[0] 
        : trend.demand === "Medium" 
          ? CHART_COLORS[1] 
          : CHART_COLORS[2]
    });
    
    return acc;
  }, []);
  
  // Transform data for growth chart
  const growthData = trends.reduce((acc: any[], trend) => {
    const growthValue = trend.growth === "Growing" 
      ? 3 
      : trend.growth === "Stable" 
        ? 2 
        : 1;
    
    acc.push({
      name: trend.industry,
      value: growthValue,
      growth: trend.growth,
      fill: trend.growth === "Growing" 
        ? CHART_COLORS[0] 
        : trend.growth === "Stable" 
          ? CHART_COLORS[1] 
          : CHART_COLORS[4]
    });
    
    return acc;
  }, []);
  
  const chartData = activeChart === "demand" ? demandData : growthData;
  
  // Sort data by value in descending order
  chartData.sort((a, b) => b.value - a.value);
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card className="shadow-md border">
          <CardContent className="p-3">
            <p className="font-medium text-sm">{label}</p>
            {activeChart === "demand" ? (
              <p className="text-sm">Demand: <span className="font-medium">{payload[0].payload.demand}</span></p>
            ) : (
              <p className="text-sm">Growth: <span className="font-medium">{payload[0].payload.growth}</span></p>
            )}
          </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeChart === "demand" 
              ? "bg-primary text-white" 
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveChart("demand")}
        >
          Demand
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            activeChart === "growth" 
              ? "bg-primary text-white" 
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setActiveChart("growth")}
        >
          Growth
        </button>
      </div>
      
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--foreground)', fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--foreground)', fontSize: 12 }}
              tickFormatter={(value) => {
                if (activeChart === "demand") {
                  return value === 1 
                    ? "Low" 
                    : value === 2 
                      ? "Medium" 
                      : "High";
                } else {
                  return value === 1 
                    ? "Declining" 
                    : value === 2 
                      ? "Stable" 
                      : "Growing";
                }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="value" 
              name={activeChart === "demand" ? "Demand Level" : "Growth Trend"} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
