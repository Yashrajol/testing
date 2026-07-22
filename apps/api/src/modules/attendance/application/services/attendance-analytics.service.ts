import { Injectable } from '@nestjs/common';
import { AttendanceRecordEntity } from '../../domain/entities/attendance-record.entity';
import { AttendanceStatus } from '../../constants/attendance.constants';
import { AttendanceSummaryMetrics, HeatmapCell, DefaulterItem } from '../../types/attendance.types';

@Injectable()
export class AttendanceAnalyticsService {
  calculateMetrics(records: AttendanceRecordEntity[]): AttendanceSummaryMetrics {
    const totalSessions = records.length;
    if (totalSessions === 0) {
      return {
        totalSessions: 0,
        presentCount: 0,
        absentCount: 0,
        lateCount: 0,
        halfDayCount: 0,
        leaveCount: 0,
        excusedCount: 0,
        percentage: 100.0,
        consecutiveAbsences: 0,
        isDefaulter: false,
      };
    }

    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let halfDayCount = 0;
    let leaveCount = 0;
    let excusedCount = 0;

    // Sort chronologically to count consecutive absences
    const sorted = [...records].sort((a, b) => a.date.getTime() - b.date.getTime());
    let consecutiveAbsences = 0;
    let currentConsecutive = 0;

    for (const r of sorted) {
      switch (r.status) {
        case AttendanceStatus.PRESENT:
          presentCount++;
          currentConsecutive = 0;
          break;
        case AttendanceStatus.LATE:
          lateCount++;
          presentCount++; // counts towards present
          currentConsecutive = 0;
          break;
        case AttendanceStatus.HALF_DAY:
          halfDayCount++;
          presentCount += 0.5;
          currentConsecutive = 0;
          break;
        case AttendanceStatus.ABSENT:
          absentCount++;
          currentConsecutive++;
          if (currentConsecutive > consecutiveAbsences) {
            consecutiveAbsences = currentConsecutive;
          }
          break;
        case AttendanceStatus.APPROVED_LEAVE:
        case AttendanceStatus.MEDICAL_LEAVE:
          leaveCount++;
          currentConsecutive = 0;
          break;
        case AttendanceStatus.EXCUSED:
          excusedCount++;
          currentConsecutive = 0;
          break;
        default:
          break;
      }
    }

    const percentage = Math.round((presentCount / totalSessions) * 10000) / 100;
    const isDefaulter = percentage < 75.0;

    return {
      totalSessions,
      presentCount: Math.floor(presentCount),
      absentCount,
      lateCount,
      halfDayCount,
      leaveCount,
      excusedCount,
      percentage,
      consecutiveAbsences,
      isDefaulter,
    };
  }

  generateHeatmap(records: AttendanceRecordEntity[]): HeatmapCell[] {
    return records.map((r) => ({
      date: r.date.toISOString().split('T')[0],
      status: r.status,
    }));
  }

  detectDefaulters(
    studentRecordsMap: Map<string, AttendanceRecordEntity[]>,
    minThreshold: number = 75.0,
  ): DefaulterItem[] {
    const defaulters: DefaulterItem[] = [];

    studentRecordsMap.forEach((records, studentId) => {
      const metrics = this.calculateMetrics(records);
      if (metrics.percentage < minThreshold) {
        let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
        if (metrics.percentage < 50) riskLevel = 'CRITICAL';
        else if (metrics.percentage < 65) riskLevel = 'HIGH';
        else if (metrics.percentage < 75) riskLevel = 'MEDIUM';

        defaulters.push({
          studentId,
          attendancePercentage: metrics.percentage,
          totalClasses: metrics.totalSessions,
          attendedClasses: metrics.presentCount,
          riskLevel,
        });
      }
    });

    return defaulters;
  }
}
