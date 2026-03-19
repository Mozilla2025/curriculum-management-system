'use client'

import { useState } from 'react'
import {
  User,
  Shield,
  Bell,
  Database,
  Sun,
  Moon,
  Eye,
  Settings,
  Lock,
  Users,
  Zap,
} from 'lucide-react'
import {
  SettingItem,
  SettingsSection,
  SettingsHeader,
  SystemActions,
  SettingsFooter,
  NotificationToast,
} from '@/components/admin/settings'

interface SystemSettings {
  // User Preferences
  darkMode: boolean
  focusMode: boolean
  emailNotifications: boolean

  // Security Settings
  twoFactorAuth: boolean
  sessionTimeout: boolean
  encryptionEnabled: boolean
  passwordExpiry: boolean

  // Notification Settings
  newCurriculumAlerts: boolean
  approvalStatusUpdates: boolean
  weeklyReports: boolean
  systemAlerts: boolean
  securityNotifications: boolean
  maintenanceNotifications: boolean

  // Data Management
  autoBackup: boolean
  dataRetention: boolean
  logsArchiving: boolean

  // Admin-Specific: System Configuration
  maintenanceMode: boolean
  debugMode: boolean
  apiRateLimiting: boolean
  systemWideAnnouncements: boolean

  // Admin-Specific: User Management
  enableUserRegistration: boolean
  requireEmailVerification: boolean
  autoUserDeactivation: boolean
  enforcePasswordPolicy: boolean

  // Admin-Specific: Performance
  cacheEnabled: boolean
  performanceMonitoring: boolean
  loadBalancing: boolean
  autoScaling: boolean

  // Admin-Specific: Audit & Compliance
  auditLogging: boolean
  complianceReporting: boolean
  dataExportControl: boolean
  accessLogging: boolean
}

const defaultSettings: SystemSettings = {
  darkMode: false,
  focusMode: false,
  emailNotifications: true,
  twoFactorAuth: false,
  sessionTimeout: true,
  encryptionEnabled: true,
  passwordExpiry: true,
  newCurriculumAlerts: true,
  approvalStatusUpdates: true,
  weeklyReports: false,
  systemAlerts: true,
  securityNotifications: true,
  maintenanceNotifications: true,
  autoBackup: true,
  dataRetention: true,
  logsArchiving: true,
  maintenanceMode: false,
  debugMode: false,
  apiRateLimiting: true,
  systemWideAnnouncements: true,
  enableUserRegistration: true,
  requireEmailVerification: true,
  autoUserDeactivation: false,
  enforcePasswordPolicy: true,
  cacheEnabled: true,
  performanceMonitoring: true,
  loadBalancing: false,
  autoScaling: false,
  auditLogging: true,
  complianceReporting: true,
  dataExportControl: true,
  accessLogging: true,
}

interface SettingOption {
  key: keyof SystemSettings
  title: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
  isAction?: boolean
  isWarning?: boolean
}

interface SettingSection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  options: SettingOption[]
}

export function AdminSettingsClient() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [notification, setNotification] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error' | 'info'
  }>({ show: false, message: '', type: 'info' })

  const handleToggle = (key: keyof SystemSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    showNotification('Setting updated successfully', 'success')
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'export':
        showNotification('Exporting system data...', 'info')
        // Implement export functionality
        break
      case 'clearCache':
        showNotification('Cache cleared successfully', 'success')
        // Implement cache clearing
        break
      case 'forceBackup':
        showNotification('Backup initiated...', 'info')
        // Implement backup functionality
        break
      case 'viewLogs':
        showNotification('Opening audit logs...', 'info')
        // Implement logs viewing
        break
      case 'resetSettings':
        if (
          confirm(
            'Are you sure you want to reset all settings to default? This action cannot be undone.'
          )
        ) {
          setSettings(defaultSettings)
          showNotification('All settings reset to default', 'success')
        }
        break
      default:
        break
    }
  }

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info'
  ) => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'info' }), 3000)
  }

  const sections: SettingSection[] = [
    {
      id: 'preferences',
      title: 'User Preferences',
      icon: User,
      gradient: 'from-must-green to-must-teal',
      options: [
        {
          key: 'darkMode',
          title: 'Dark Mode',
          description: 'Switch between light and dark themes system-wide',
          icon: settings.darkMode ? Moon : Sun,
        },
        {
          key: 'focusMode',
          title: 'Focus Mode',
          description: 'Highlight content on hover for better focus',
          icon: Eye,
        },
        {
          key: 'emailNotifications',
          title: 'Email Notifications',
          description: 'Receive updates about system changes and alerts',
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
          description: 'Enforce 2FA for all admin accounts',
        },
        {
          key: 'sessionTimeout',
          title: 'Session Timeout',
          description: 'Automatically log out after 30 minutes of inactivity',
        },
        {
          key: 'encryptionEnabled',
          title: 'Data Encryption',
          description: 'Enable end-to-end encryption for sensitive data',
        },
        {
          key: 'passwordExpiry',
          title: 'Password Expiry Policy',
          description: 'Require password changes every 90 days',
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
          description: 'Get weekly summary of system activities',
        },
        {
          key: 'systemAlerts',
          title: 'System Alerts',
          description: 'Critical system alerts and warnings',
        },
        {
          key: 'securityNotifications',
          title: 'Security Notifications',
          description: 'Get alerted on suspicious activities and security events',
        },
        {
          key: 'maintenanceNotifications',
          title: 'Maintenance Notifications',
          description: 'Receive maintenance schedule and update notifications',
        },
      ],
    },
    {
      id: 'data-management',
      title: 'Data Management',
      icon: Database,
      gradient: 'from-blue-500 to-blue-600',
      options: [
        {
          key: 'autoBackup',
          title: 'Auto Backup',
          description: 'Automatically backup system data daily at 2 AM',
        },
        {
          key: 'dataRetention',
          title: 'Data Retention',
          description: 'Retain curriculum data for 7 years per policy',
        },
        {
          key: 'logsArchiving',
          title: 'Logs Archiving',
          description: 'Archive audit logs monthly for long-term storage',
        },
      ],
    },
    {
      id: 'system-configuration',
      title: 'System Configuration',
      icon: Settings,
      gradient: 'from-red-500 to-red-600',
      options: [
        {
          key: 'maintenanceMode',
          title: 'Maintenance Mode',
          description: 'Put system in maintenance mode to restrict user access',
          isWarning: true,
        },
        {
          key: 'debugMode',
          title: 'Debug Mode',
          description: 'Enable verbose logging and error tracking',
          isWarning: true,
        },
        {
          key: 'apiRateLimiting',
          title: 'API Rate Limiting',
          description: 'Limit API requests to prevent abuse',
        },
        {
          key: 'systemWideAnnouncements',
          title: 'System-Wide Announcements',
          description: 'Display important announcements to all users',
        },
      ],
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      gradient: 'from-indigo-500 to-indigo-600',
      options: [
        {
          key: 'enableUserRegistration',
          title: 'Enable User Registration',
          description: 'Allow new users to register for accounts',
        },
        {
          key: 'requireEmailVerification',
          title: 'Require Email Verification',
          description: 'Users must verify email before account activation',
        },
        {
          key: 'autoUserDeactivation',
          title: 'Auto User Deactivation',
          description: 'Deactivate inactive users after 90 days',
        },
        {
          key: 'enforcePasswordPolicy',
          title: 'Enforce Password Policy',
          description: 'Require strong passwords (min 12 chars, special chars)',
        },
      ],
    },
    {
      id: 'performance',
      title: 'Performance Optimization',
      icon: Zap,
      gradient: 'from-yellow-500 to-yellow-600',
      options: [
        {
          key: 'cacheEnabled',
          title: 'Caching',
          description: 'Enable Redis caching for improved performance',
        },
        {
          key: 'performanceMonitoring',
          title: 'Performance Monitoring',
          description: 'Track and log system performance metrics',
        },
        {
          key: 'loadBalancing',
          title: 'Load Balancing',
          description: 'Distribute traffic across multiple servers',
        },
        {
          key: 'autoScaling',
          title: 'Auto-Scaling',
          description: 'Automatically scale resources based on demand',
        },
      ],
    },
    {
      id: 'audit-compliance',
      title: 'Audit & Compliance',
      icon: Lock,
      gradient: 'from-cyan-500 to-cyan-600',
      options: [
        {
          key: 'auditLogging',
          title: 'Audit Logging',
          description: 'Log all administrative actions and data modifications',
        },
        {
          key: 'complianceReporting',
          title: 'Compliance Reporting',
          description: 'Generate automated compliance reports',
        },
        {
          key: 'dataExportControl',
          title: 'Data Export Control',
          description: 'Restrict and log all data exports',
        },
        {
          key: 'accessLogging',
          title: 'Access Logging',
          description: 'Log all user access attempts and activities',
        },
      ],
    },
  ]

  return (
    <div className="max-w-[1820px] mx-auto space-y-8 animate-fade-in">
      <NotificationToast
        show={notification.show}
        message={notification.message}
        type={notification.type}
      />

      <SettingsHeader
        title="System Settings"
        description="Manage comprehensive system configuration and settings"
        icon={Settings}
      />

      {/* Settings Sections - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <SettingsSection
            key={section.id}
            title={section.title}
            icon={section.icon}
            gradient={section.gradient}
          >
            {section.options.map((option) => (
              <SettingItem
                key={option.key}
                title={option.title}
                description={option.description}
                isWarning={option.isWarning}
                icon={option.icon}
                isToggle={!option.isAction}
                isEnabled={settings[option.key as keyof SystemSettings]}
                onToggle={() =>
                  handleToggle(option.key as keyof SystemSettings)
                }
              />
            ))}
          </SettingsSection>
        ))}

        {/* System Actions - Full Width on Grid */}
        <div className="col-span-1 lg:col-span-2">
          <SystemActions
            onForceBackup={() => handleAction('forceBackup')}
            onClearCache={() => handleAction('clearCache')}
            onViewLogs={() => handleAction('viewLogs')}
            onExport={() => handleAction('export')}
            onResetSettings={() => handleAction('resetSettings')}
          />
        </div>
      </div>

      <SettingsFooter
        supportEmail="support@must.ac.ke"
        version="v2.1.0"
        lastUpdated="March 2026"
      />
    </div>
  )
}
