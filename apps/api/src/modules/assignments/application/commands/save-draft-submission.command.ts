import { SaveDraftSubmissionDto } from '../dtos/submission-request.dto';

export class SaveDraftSubmissionCommand {
  constructor(public readonly dto: SaveDraftSubmissionDto) {}
}
