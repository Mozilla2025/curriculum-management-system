'use client'

import { useState } from 'react'
import { User, Shield, Bell, Database, Sun, Moon, Eye, Download } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    focusMode: false,
    emailNotifications: true,
    twoFactorAuth: false,
    sessionTimeout: true,
    newCurriculumAlerts: true,
    approvalStatusUpdates: true,
    weeklyReports: false,
    autoBackup: true,
  })
  
  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }
  
  const sections = [
    {
      id: 'preferences',
      title: 'User Preferences',
      icon: User,
      gradient: 'from-must-green to-must-teal',
      options: [
        {
          key: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch between light and dark themes',
          icon: settings.darkMode ? Moon : Sun,
        },
        {
          key: 'emailNotifications',
          title: 'Email Notifications',
          description: 'Receive updates about curriculum changes',
        },
        {
          key: 'focusMode',
          title: 'Focus Mode',
          description: 'Highlight content on hover for better focus',
          icon: Eye,
        },
      ],
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      gradient: 'from-must-gold to-amber-400',
      options: [
        {
          key: 'twoFactorAuth',
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
        },
        {
          key: 'sessionTimeout',
          title: 'Session Timeout',
          description: 'Automatically log out after 30 minutes of inactivity',
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      icon: Bell,
      gradient: 'from-purple-500 to-purple-600',
      options: [
        {
          key: 'newCurriculumAlerts',
          title: 'New Curriculum Alerts',
          description: 'Get notified when new curricula are submitted',
        },
        {
          key: 'approvalStatusUpdates',
          title: 'Approval Status Updates',
          description: 'Receive notifications about approval status changes',
        },
        {
          key: 'weeklyReports',
          title: 'Weekly Reports',
          description: 'Get weekly summary of curriculum activities',
        },
      ],
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: Database,
      gradient: 'from-blue-500 to-blue-600',
      options: [
        {
          key: 'autoBackup',
          title: 'Auto Backup',
          description: 'Automatically backup your preferences and data',
        },
      ],
    },
  ]
  
  return (
    <div className="max-w-[1820px] mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center bg-white rounded-2xl shadow-soft border border-gray-200 p-8">
        <div className="w-16 h-16 bg-gradient-to-br from-must-green to-must-teal 
          rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          System Settings
        </h1>
        <p className="text-gray-600">
          Manage your preferences and account settings
        </p>
      </div>
      
      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section) => {
          const SectionIcon = section.icon
          
          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl shadow-soft border border-gray-200 p-6
                hover:shadow-medium transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className={`w-10 h-10 bg-gradient-to-br ${section.gradient} 
                  rounded-xl flex items-center justify-center`}>
                  <SectionIcon className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              
              <div className="space-y-6">
                {section.options.map((option) => {
                  const isAction = option.key === 'exportData'
                  const OptionIcon = option.icon
                  
                  return (
                    <div
                      key={option.key}
                      className="flex items-start justify-between gap-6 p-4 rounded-xl
                        hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {OptionIcon && <OptionIcon className="w-4 h-4 text-must-green" />}
                          <h3 className="font-semibold text-gray-900">
                            {option.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      
                      {isAction ? (
                        <button
                          onClick={() => alert('Exporting curriculum data...')}
                          className="flex items-center gap-2 px-4 py-2 bg-must-green 
                            text-white rounded-lg hover:bg-must-green-dark 
                            transition-colors font-semibold text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggle(option.key as keyof typeof settings)}
                          className={`relative w-14 h-7 rounded-full transition-colors ${
                            settings[option.key as keyof typeof settings]
                              ? 'bg-must-green'
                              : 'bg-gray-300'
                          }`}
                          role="switch"
                          aria-checked={settings[option.key as keyof typeof settings]}
                        >
                          <div
                            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full 
                              shadow-md transition-transform ${
                              settings[option.key as keyof typeof settings]
                                ? 'translate-x-7'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Footer Info */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-200 p-8 text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
          If you need assistance with any settings or have questions about your account,
          please contact our support team at{' '}
          <a href="mailto:support@must.ac.ke" className="text-must-green font-semibold hover:underline">
            support@must.ac.ke
          </a>
        </p>
        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            CurricFlow v2.1.0 • Last updated: January 2024
          </p>
        </div>
      </div>
    </div>
  )
}