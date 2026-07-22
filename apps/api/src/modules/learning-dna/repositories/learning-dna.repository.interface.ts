import { LearningDnaEntity } from '../domain/entities/learning-dna.entity';
import { AdaptivePathNodeEntity } from '../domain/entities/adaptive-path-node.entity';

export interface ILearningDnaRepository {
  findDnaByStudentId(studentId: string): Promise<LearningDnaEntity | null>;
  upsertDna(studentId: string, data: any): Promise<LearningDnaEntity>;
  findAdaptivePath(studentId: string): Promise<AdaptivePathNodeEntity[]>;
  createAdaptiveNodes(nodes: any[]): Promise<AdaptivePathNodeEntity[]>;
}
