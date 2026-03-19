"use client";

import React, { useState } from "react";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart
} from "recharts";
import { GlassCard } from "../components/ui";
import { Activity, Users, Server, DollarSign, ArrowUpRight, ArrowDownRight, Menu, Bell, Download, Filter, Search, Globe, ChevronRight } from "lucide-react";
import { Button, Avatar } from "../components/ui";

// --- Mock Data --- 

const revenueData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 3200 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 4300 },
  { name: "Jul", total: 3900 },
];

const trafficData = [
  { time: "00:00", visitors: 400, pageviews: 600 },
  { time: "04:00", visitors: 300, pageviews: 450 },
  { time: "08:00", visitors: 1200, pageviews: 1800 },
  { time: "12:00", visitors: 2800, pageviews: 4500 },
  { time: "16:00", visitors: 3200, pageviews: 5200 },
  { time: "20:00", visitors: 2100, pageviews: 3300 },
  { time: "23:59", visitors: 900, pageviews: 1200 },
];

const sourceData = [
  { name: "Direct", value: 400 },
  { name: "Referral", value: 300 },
  { name: "Social", value: 300 },
  { name: "Organic", value: 800 },
];

const serverMetrics = [
  { name: "0s", load: 40, memory: 55 },
  { name: "10s", load: 45, memory: 56 },
  { name: "20s", load: 60, memory: 58 },
  { name: "30s", load: 50, memory: 57 },
  { name: "40s", load: 75, memory: 60 },
  { name: "50s", load: 65, memory: 61 },
  { name: "60s", load: 55, memory: 59 },
];

const radarData = [
  { subject: 'Technology', A: 120, fullMark: 150 },
  { subject: 'Marketing', A: 98, fullMark: 150 },
  { subject: 'Sales', A: 86, fullMark: 150 },
  { subject: 'Design', A: 99, fullMark: 150 },
  { subject: 'Support', A: 85, fullMark: 150 },
  { subject: 'Engineering', A: 65, fullMark: 150 },
];

const transactionsData = [
  { id: "TX1029", user: "Alice Walker", date: "Today, 14:32", amount: "$120.50", status: "Completed" },
  { id: "TX1030", user: "John Doe", date: "Today, 13:15", amount: "$3,410.00", status: "Pending" },
  { id: "TX1031", user: "Sarah Smith", date: "Yesterday, 09:44", amount: "$45.00", status: "Completed" },
  { id: "TX1032", user: "Michael Chang", date: "Yesterday, 08:21", amount: "$99.99", status: "Failed" },
  { id: "TX1033", user: "Emma Frost", date: "Mar 17, 16:05", amount: "$1,250.00", status: "Completed" },
];

const topPagesData = [
  { path: "/home", views: "45.2K", bounce: "23%", barVal: 100 },
  { path: "/pricing", views: "24.1K", bounce: "15%", barVal: 65 },
  { docs: "/docs/api", views: "19.8K", bounce: "40%", barVal: 50 },
  { path: "/blog/release", views: "12.4K", bounce: "35%", barVal: 30 },
  { path: "/about", views: "8.9K", bounce: "45%", barVal: 20 },
];

const COLORS = ["#000000", "#737373", "#a1a1aa", "#d4d4d8", "#e4e4e7"];
const DARK_COLORS = ["#ffffff", "#a1a1aa", "#71717a", "#52525b", "#3f3f46"];

export default function AdminDashboard() {
  const colors = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches 
    ? DARK_COLORS 
    : COLORS;
    
  // Stat Card Component
  const StatCard = ({ title, value, icon: Icon, trend, isPositive }: any) => (
    <GlassCard variant="default" className="p-5 flex flex-col justify-between h-[130px]">
      <div className="flex justify-between items-start">
        <span className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-black/[0.04] dark:bg-white/[0.06] rounded-full">
          <Icon className="w-4 h-4 text-foreground" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-light tracking-tight">{value}</span>
        <div className={`flex items-center text-[11px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {trend}
        </div>
      </div>
    </GlassCard>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black selection:bg-primary/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-black/5 dark:border-white/5 mx-0 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-primary flex items-center justify-center text-primary-foreground font-bold">
              NW
            </div>
            <span className="font-semibold tracking-tight text-[15px]">Admin Control</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-black/5 dark:bg-white/5 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-[13px] w-48 text-foreground placeholder:text-muted-foreground" />
          </div>
          <Button variant="icon" className="relative hidden md:flex">
            <Globe className="w-5 h-5" />
          </Button>
          <Button variant="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
          </Button>
          <Avatar fallback="AD" size="sm" className="ring-2 ring-background ml-2" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-6 w-full">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
            <p className="text-[13px] text-muted-foreground">Monitor your application's performance and usage metrics in real-time.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="primary" size="sm">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value="$45,231" icon={DollarSign} trend="12.5%" isPositive={true} />
          <StatCard title="Active Users" value="2,345" icon={Users} trend="4.2%" isPositive={true} />
          <StatCard title="System Load" value="45%" icon={Server} trend="2.1%" isPositive={false} />
          <StatCard title="Active Sessions" value="1,123" icon={Activity} trend="8.4%" isPositive={true} />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Over Time */}
          <GlassCard variant="default" className="lg:col-span-2 p-5 flex flex-col gap-4 min-h-[350px]">
            <div className="flex justify-between items-center">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Revenue Overview</h2>
              <select className="bg-transparent border-0 text-[12px] font-medium text-foreground p-0 cursor-pointer focus:ring-0 appearance-none text-right">
                <option>Last 7 months</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <div className="flex-1 w-full h-full min-h-[250px] -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '10px', border: '1px solid rgba(128,128,128,0.2)', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Traffic Sources */}
          <GlassCard variant="default" className="p-5 flex flex-col gap-4 min-h-[350px]">
            <div className="flex justify-between items-center">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Traffic Sources</h2>
            </div>
            <div className="flex-1 w-full h-full min-h-[250px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="var(--background)"
                    strokeWidth={2}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '10px', border: '1px solid rgba(128,128,128,0.2)', fontSize: '12px' }}
                    itemStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <span className="text-2xl font-light">1.8K</span>
                <span className="block text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Traffic Bar Chart */}
          <GlassCard variant="default" className="p-5 flex flex-col gap-4 h-[300px]">
             <div className="flex justify-between items-center">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Daily Traffic (Hours)</h2>
            </div>
            <div className="flex-1 w-full -ml-4">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '10px', border: '1px solid rgba(128,128,128,0.2)', fontSize: '12px' }}
                  />
                  <Bar dataKey="pageviews" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="visitors" fill="var(--muted-foreground)" opacity={0.5} radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Server Load Line Chart */}
          <GlassCard variant="default" className="p-5 flex flex-col gap-4 h-[300px]">
             <div className="flex justify-between items-center">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Live Health & Capacity</h2>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Healthy
              </span>
            </div>
            <div className="flex-1 w-full -ml-4">
               <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serverMetrics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '10px', border: '1px solid rgba(128,128,128,0.2)', fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="load" stroke="var(--primary)" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="memory" stroke="var(--muted-foreground)" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Third Row: Tables & Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions Table */}
          <GlassCard variant="default" className="lg:col-span-2 p-5 flex flex-col gap-4 min-h-[350px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Recent Transactions</h2>
              <Button variant="ghost" size="sm" className="text-[12px]">View All <ChevronRight className="w-3 h-3 ml-1" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] text-left">
                <thead>
                  <tr className="border-b border-black/5 dark:border-white/5 text-muted-foreground font-semibold">
                    <th className="pb-3 px-2 font-semibold">Transaction ID</th>
                    <th className="pb-3 px-2 font-semibold">User</th>
                    <th className="pb-3 px-2 font-semibold">Date</th>
                    <th className="pb-3 px-2 font-semibold text-right">Amount</th>
                    <th className="pb-3 px-2 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData.map((tx, idx) => (
                    <tr key={idx} className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-2 font-medium">{tx.id}</td>
                      <td className="py-3 px-2 flex items-center gap-2">
                        <Avatar fallback={tx.user.charAt(0)} size="sm" className="w-6 h-6 text-[9px]" />
                        {tx.user}
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{tx.date}</td>
                      <td className="py-3 px-2 text-right font-medium">{tx.amount}</td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          tx.status === "Completed" ? "bg-green-500/10 text-green-500" :
                          tx.status === "Pending" ? "bg-amber-500/10 text-amber-500" :
                          "bg-red-500/10 text-red-500"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* User Demographics / Interests Radar */}
          <GlassCard variant="default" className="p-5 flex flex-col gap-4 min-h-[350px]">
            <div className="flex justify-between items-center">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">User Segments</h2>
            </div>
            <div className="flex-1 w-full min-h-[250px] flex items-center justify-center -ml-2">
               <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="currentColor" strokeOpacity={0.1} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Segment" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '10px', border: '1px solid rgba(128,128,128,0.2)', fontSize: '12px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Fourth Row: Top Pages & Composed Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
           {/* Top Performing Pages */}
           <GlassCard variant="default" className="p-5 flex flex-col gap-4">
             <div className="flex justify-between items-center mb-2">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Top Pages</h2>
            </div>
            <div className="flex flex-col gap-5 mt-1">
              {topPagesData.map((page, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[13px] font-medium font-mono">{page.path || page.docs}</span>
                    <div className="flex gap-4 text-[12px]">
                      <span className="font-semibold">{page.views}</span>
                      <span className="text-muted-foreground text-[11px]">{page.bounce}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${page.barVal}%` }} />
                  </div>
                </div>
              ))}
            </div>
           </GlassCard>

           {/* User Growth Composed Chart */}
           <GlassCard variant="default" className="p-5 flex flex-col gap-4">
             <div className="flex justify-between items-center">
              <h2 className="text-[13px] font-semibold text-muted-foreground uppercase tracking-wider">Retention & Churn</h2>
            </div>
             <div className="flex-1 w-full min-h-[250px] -ml-4">
               <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '10px', border: '1px solid rgba(128,128,128,0.2)', fontSize: '12px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="total" name="Retained" fill="var(--muted-foreground)" opacity={0.3} barSize={20} radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="total" name="New Signups" stroke="var(--primary)" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
           </GlassCard>
        </div>
      </main>
    </div>
  );
}
