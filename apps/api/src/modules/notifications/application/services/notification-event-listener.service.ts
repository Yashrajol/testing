import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { NOTIFICATION_REPOSITORY_TOKEN, NotificationChannel, NotificationType, NotificationPriority, TargetAudienceRole, DeliveryStatus } from '../../constants/notifications.constants';
import { INotificationRepository } from '../../repositories/notification.repository.interface';
import { NotificationDeliveryService } from './notification-delivery.service';

@Injectable()
export class NotificationEventListenerService implements OnModuleInit {
  private readonly logger = new Logger(NotificationEventListenerService.name);

  constructor(
    @Inject(NOTIFICATION_REPOSITORY_TOKEN)
    private readonly repo: INotificationRepository,
    private readonly deliveryService: NotificationDeliveryService,
  ) {}

  onModuleInit() {
    this.logger.log('[NotificationEventListener] Initialized event subscribers for Attendance, Assignments, Assessments, Learning DNA, Growth Engine, and Academics');
  }

  /**
   * Automatic notification trigger when an assignment is created
   */
  async handleAssignmentCreated(event: { assignmentId: string; title: string; batchId: string; dueDate: Date }): Promise<void> {
    this.logger.log(`[EventSubscriber] Received AssignmentCreated event for batch ${event.batchId}`);
    // Example: Trigger in-app & push notification to batch students
    const notif = await this.repo.createNotification({
      recipientId: `batch-students:${event.batchId}`,
      recipientRole: TargetAudienceRole.STUDENT,
      type: NotificationType.ASSIGNMENT_CREATED,
      title: 'New Assignment Assigned',
      body: `Assignment "${event.title}" has been assigned. Due on ${new Date(event.dueDate).toLocaleDateString()}.`,
      channel: NotificationChannel.IN_APP,
      priority: NotificationPriority.MEDIUM,
      status: DeliveryStatus.PENDING,
    });
    await this.deliveryService.dispatch(notif);
  }

  /**
   * Automatic notification trigger when an assignment is graded
   */
  async handleAssignmentGraded(event: { submissionId: string; studentId: string; score: number; totalPoints: number }): Promise<void> {
    this.logger.log(`[EventSubscriber] Received AssignmentGraded event for student ${event.studentId}`);
    const notif = await this.repo.createNotification({
      recipientId: event.studentId,
      recipientRole: TargetAudienceRole.STUDENT,
      type: NotificationType.ASSIGNMENT_GRADED,
      title: 'Assignment Graded',
      body: `Your submission has been graded. Score: ${event.score}/${event.totalPoints}.`,
      channel: NotificationChannel.IN_APP,
      priority: NotificationPriority.HIGH,
      status: DeliveryStatus.PENDING,
    });
    await this.deliveryService.dispatch(notif);
  }

  /**
   * Automatic notification trigger when attendance threshold is crossed (< 75%)
   */
  async handleLowAttendanceAlert(event: { studentId: string; attendancePercentage: number }): Promise<void> {
    this.logger.warn(`[EventSubscriber] Received LowAttendanceAlert event for student ${event.studentId} (${event.attendancePercentage}%)`);
    const notif = await this.repo.createNotification({
      recipientId: event.studentId,
      recipientRole: TargetAudienceRole.STUDENT,
      type: NotificationType.LOW_ATTENDANCE_WARNING,
      title: 'Low Attendance Warning',
      body: `Your attendance has dropped to ${event.attendancePercentage}%, below the required 75% threshold.`,
      channel: NotificationChannel.SMS,
      priority: NotificationPriority.URGENT,
      status: DeliveryStatus.PENDING,
    });
    await this.deliveryService.dispatch(notif);
  }

  /**
   * Automatic notification trigger when leave request is approved
   */
  async handleLeaveApproved(event: { applicantId: string; leaveType: string }): Promise<void> {
    this.logger.log(`[EventSubscriber] Received LeaveApproved event for user ${event.applicantId}`);
    const notif = await this.repo.createNotification({
      recipientId: event.applicantId,
      recipientRole: TargetAudienceRole.STUDENT,
      type: NotificationType.LEAVE_APPROVED,
      title: 'Leave Approved',
      body: `Your ${event.leaveType} leave request has been approved.`,
      channel: NotificationChannel.IN_APP,
      priority: NotificationPriority.MEDIUM,
      status: DeliveryStatus.PENDING,
    });
    await this.deliveryService.dispatch(notif);
  }
}
