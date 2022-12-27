import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectID> {
  public transform(value: any): ObjectID {
    try {
      const transformedObjectId: ObjectID = ObjectID.createFromHexString(value);
      return transformedObjectId;
    } catch (error) {
      throw new BadRequestException('Validation failed (ObjectId is expected)');
    }
  }
}