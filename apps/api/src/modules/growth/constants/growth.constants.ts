export const GROWTH_REPOSITORY_TOKEN = Symbol('IGrowthRepository');

export enum ReadinessLevel {
  BEGINNER = 'BEGINNER',
  DEVELOPING = 'DEVELOPING',
  READY = 'READY',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export enum GoalStatus {
  ON_TRACK = 'ON_TRACK',
  AT_RISK = 'AT_RISK',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
}

export enum InsightTargetAudience {
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  TEACHER = 'TEACHER',
  ORGANIZATION = 'ORGANIZATION',
}
