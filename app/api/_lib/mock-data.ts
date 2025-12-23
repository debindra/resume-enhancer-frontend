// Mock data for dashboard and billing APIs
// In production, replace with real database queries

export interface MockUserProfile {
  user_id: string
  tier: string
  credits_remaining: number
  credits_total: number
}

export interface MockResumeOptimization {
  id: string
  user_id: string
  resume_name: string
  job_title: string
  ats_score: number
  created_at: string
}

export interface MockCreditUsageLog {
  id: string
  user_id: string
  event_type: string
  credits_used: number
  remaining_after: number
  created_at: string
}

// In-memory mock data (replace with database in production)
const mockUserProfiles: Record<string, MockUserProfile> = {}
const mockResumeOptimizations: MockResumeOptimization[] = []
const mockCreditUsageLogs: MockCreditUsageLog[] = []

export async function getUserProfile(userId: string): Promise<MockUserProfile> {
  // Return existing profile or create default
  if (!mockUserProfiles[userId]) {
    mockUserProfiles[userId] = {
      user_id: userId,
      tier: 'freemium',
      credits_remaining: 3,
      credits_total: 3
    }
  }
  return mockUserProfiles[userId]
}

export async function updateUserProfile(userId: string, updates: Partial<MockUserProfile>): Promise<MockUserProfile> {
  const profile = await getUserProfile(userId)
  mockUserProfiles[userId] = { ...profile, ...updates }
  return mockUserProfiles[userId]
}

export async function getResumeOptimizations(userId: string, limit: number = 10): Promise<MockResumeOptimization[]> {
  return mockResumeOptimizations
    .filter(opt => opt.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}

export async function addResumeOptimization(optimization: Omit<MockResumeOptimization, 'id' | 'created_at'>): Promise<MockResumeOptimization> {
  const newOptimization: MockResumeOptimization = {
    ...optimization,
    id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString()
  }
  mockResumeOptimizations.push(newOptimization)
  return newOptimization
}

export async function addCreditUsageLog(log: Omit<MockCreditUsageLog, 'id' | 'created_at'>): Promise<MockCreditUsageLog> {
  const newLog: MockCreditUsageLog = {
    ...log,
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString()
  }
  mockCreditUsageLogs.push(newLog)
  return newLog
}

export async function getDashboardStats(userId: string) {
  const profile = await getUserProfile(userId)
  const optimizations = await getResumeOptimizations(userId, 100) // Get all for stats

  const totalOptimizations = optimizations.length
  const thisMonth = new Date()
  thisMonth.setDate(1)
  thisMonth.setHours(0, 0, 0, 0)

  const thisMonthOptimizations = optimizations.filter(
    opt => new Date(opt.created_at) >= thisMonth
  ).length

  const averageScoreImprovement = totalOptimizations > 0
    ? optimizations.reduce((sum, opt) => sum + opt.ats_score, 0) / totalOptimizations
    : 15.3 // Default mock value

  const bestAtsScore = totalOptimizations > 0
    ? Math.max(...optimizations.map(opt => opt.ats_score))
    : 0

  return {
    total_optimizations: totalOptimizations,
    this_month_optimizations: thisMonthOptimizations,
    average_score_improvement: averageScoreImprovement,
    best_ats_score: bestAtsScore,
    credits_remaining: profile.credits_remaining,
    credits_total: profile.credits_total,
    tier: profile.tier
  }
}