export const Router = {
  // App URL
  appUrlBase: process.env.REACT_APP_URL,
  appHome: '/',
  appLogin: '/login',
  appSignUp: '/signup',
  appLogout: '/logout',
  appResetPassword: '/reset-password',
  appResetPasswordConfirm: '/reset-password-confirm/:token',
  appServicesBriefcase: '/dashboard/services-briefcase',
  appSchedule: '/dashboard/schedule',

  // API URI
  apiUrlBase: process.env.REACT_APP_API_URL,
  apiLogin: '/api/login/',
  apiPatientSignUp: '/api/patient-signup/',
  apiProfessionalSignUp: '/api/professional-signup/',
  apiResetPassword: '/api/reset-password/',
  apiResetPasswordConfirm: '/api/reset-password/confirm/',
  apiGlobalProfession: '/api/global-professions/',
  apiServices: '/api/services/',
  apiServicesByProfession: '/api/services-by-profession/',
  apiGlobalServices: '/api/global-services/',
  apiAttentionMethod: '/api/attention-methods/',
  apiAttentionMethodService: '/api/attention-methods-service/',
  apiAvailabilities: '/api/availabilities/',
  apiAppointments: '/api/schedules/',
  apiReschedule: '/api/reschedule/',
}
