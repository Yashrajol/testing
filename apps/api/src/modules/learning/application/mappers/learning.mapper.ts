import { LearningEntityType } from '../../constants/learning.constants';
import { LearningEntityResponseDto } from '../dtos/learning-response.dto';
import { CourseEntity } from '../../domain/entities/course.entity';
import { CurriculumEntity } from '../../domain/entities/curriculum.entity';
import { ChapterEntity } from '../../domain/entities/chapter.entity';
import { TopicEntity } from '../../domain/entities/topic.entity';
import { LessonEntity } from '../../domain/entities/lesson.entity';
import { LearningObjectiveEntity } from '../../domain/entities/learning-objective.entity';
import { LearningResourceEntity } from '../../domain/entities/resource.entity';

export class LearningMapper {
  static toResponseDto(type: LearningEntityType, entity: any): LearningEntityResponseDto {
    const res: LearningEntityResponseDto = {
      id: entity.id,
      entityType: type,
      title: entity.title,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      details: {},
    };

    if (entity instanceof CourseEntity) {
      res.details = { subjectId: entity.subjectId, code: entity.code, description: entity.description, version: entity.version };
    } else if (entity instanceof CurriculumEntity) {
      res.details = { courseId: entity.courseId, version: entity.version, status: entity.status };
    } else if (entity instanceof ChapterEntity) {
      res.details = { subjectId: entity.subjectId, curriculumId: entity.curriculumId, sequence: entity.sequence };
    } else if (entity instanceof TopicEntity) {
      res.details = { chapterId: entity.chapterId, sequence: entity.sequence };
    } else if (entity instanceof LessonEntity) {
      res.details = { chapterId: entity.chapterId, topicId: entity.topicId, content: entity.content, sequence: entity.sequence };
    } else if (entity instanceof LearningObjectiveEntity) {
      res.details = { lessonId: entity.lessonId, bloomsTaxonomy: entity.bloomsTaxonomy, difficulty: entity.difficulty, estimatedMinutes: entity.estimatedMinutes, skills: entity.skills, competencies: entity.competencies, prerequisites: entity.prerequisites };
    } else if (entity instanceof LearningResourceEntity) {
      res.details = { lessonId: entity.lessonId, type: entity.type, url: entity.url, metadata: entity.metadata };
    }

    return res;
  }
}
