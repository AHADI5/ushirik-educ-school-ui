// src/events-utc.js
import { SchedulerEvent } from '@progress/kendo-react-scheduler';

const displayDate = new Date('2023-05-22T00:00:00Z');

const sampleDataWithCustomSchema = [
  {
    TaskID: 1,
    start: new Date('2023-05-22T09:00:00Z'),
    end: new Date('2023-05-22T10:00:00Z'),
    title: 'Math Class',
    description: 'Mathematics class with Mr. John',
    RoomID: 1,
    PersonIDs: [1],
  },
  {
    TaskID: 2,
    start: new Date('2023-05-22T11:00:00Z'),
    end: new Date('2023-05-22T12:00:00Z'),
    title: 'Science Class',
    description: 'Science class with Mrs. Smith',
    RoomID: 2,
    PersonIDs: [2],
  },
  // Add more sample events as needed
];

const customModelFields = {
  id: 'TaskID',
  start: 'start',
  end: 'end',
  title: 'title',
  description: 'description',
  RoomID: 'RoomID',
  PersonIDs: 'PersonIDs',
};

export { sampleDataWithCustomSchema, displayDate, customModelFields };
