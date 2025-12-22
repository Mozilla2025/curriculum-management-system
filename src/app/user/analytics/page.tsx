'use client'

import { BarChart3, PieChart, TrendingUp, Clock, Star, CheckCircle } from 'lucide-react'
import { mockAnalyticsData } from '@/lib/mock-data'

export default function AnalyticsPage() {
  const { summaryStats, chartData, recentActivity, topSchools } = mockAnalyticsData
  
  return (
    <div className="max-w-[1820px] mx-auto space-y-6 animate-fade-in">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Curricula by School Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-must-green to-must-teal rounded-xl flex items-center justify-center">
                <PieChart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Curricula by School</h2>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 
              flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-16 h-16 text-must-green mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Interactive Pie Chart
                </p>
                <p className="text-sm text-gray-500">
                  Visual distribution of curricula across schools
                </p>
                
                {/* Legend */}
                <div className="mt-6 space-y-2">
                  {chartData.map((item) => (
                    <div key={item.school} className="flex items-center justify-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-700">
                        {item.school}: {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary Stats Sidebar */}
        <div className="space-y-4 flex flex-col">
          {summaryStats.map((stat, index) => {
            const Icon = index === 0 ? CheckCircle : index === 1 ? Clock : Star
            const gradients = [
              'from-must-green to-must-teal',
              'from-must-gold to-amber-400',
              'from-blue-500 to-blue-600'
            ]
            
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6
                  hover:-translate-y-1 transition-transform duration-300 flex-1"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradients[index]} 
                    rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-3xl font-black text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Monthly Trends Chart - Full Width */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-must-gold to-amber-400 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Monthly Trends</h2>
        </div>
        
        <div className="h-80 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 
          flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-must-gold mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Monthly Progress Chart
            </p>
            <p className="text-sm text-gray-500 max-w-md">
              Track curriculum submissions, approvals, and reviews over time
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-must-green" />
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg
                  hover:bg-must-green/5 transition-colors group"
              >
                <div className="w-2 h-2 rounded-full bg-must-green" />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Performing Schools */}
        <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-must-gold" />
            Top Performing Schools
          </h3>
          
          <div className="space-y-4">
            {topSchools.map((school, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-must-green text-white rounded-full 
                  flex items-center justify-center font-bold text-sm">
                  #{index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900 mb-1">
                    {school.school}
                  </div>
                  <div className="text-xs text-gray-600">
                    {school.count} curricula
                  </div>
                </div>
                
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(school.count / Math.max(...topSchools.map(s => s.count))) * 100}%`,
                      backgroundColor: school.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}