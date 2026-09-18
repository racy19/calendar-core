import type { CalendarDate } from '../types/calendar'

export type MockPalette =
  | "primary"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6

export interface MockCalendarEvent {
  id: string
  date: CalendarDate
  title: string
  palette: MockPalette
}

export const mockEvents: MockCalendarEvent[] = [
  {
    id: '1',
    date: '2026-09-01',
    title: 'Standup',
    palette: 1,
  },
  {
    id: '2',
    date: '2026-09-02',
    title: 'Design review',
    palette: 3,
  },
  {
    id: '3',
    date: '2026-09-03',
    title: 'Sprint planning',
    palette: 2,
  },
  {
    id: '4',
    date: '2026-09-04',
    title: 'Client demo',
    palette: 6,
  },
  {
    id: '5',
    date: '2026-09-05',
    title: 'Workshop UX',
    palette: 4,
  },

  {
    id: '6',
    date: '2026-09-07',
    title: 'Retrospektiva',
    palette: 5,
  },
  {
    id: '7',
    date: '2026-09-08',
    title: 'Sync s klientem',
    palette: "primary",
  },
  {
    id: '8',
    date: '2026-09-08',
    title: 'Code review',
    palette: 3,
  },
  {
    id: '9',
    date: '2026-09-09',
    title: '1:1 meeting',
    palette: 2,
  },
  {
    id: '10',
    date: '2026-09-10',
    title: 'Release prep',
    palette: 4,
  },
  {
    id: '11',
    date: '2026-09-12',
    title: 'Deploy v2.4',
    palette: 5,
  },

  {
    id: '12',
    date: '2026-09-14',
    title: 'Team standup',
    palette: 1,
  },
  {
    id: '13',
    date: '2026-09-15',
    title: 'Release review',
    palette: 6,
  },
  {
    id: '14',
    date: '2026-09-16',
    title: 'QA testing',
    palette: 2,
  },
  {
    id: '15',
    date: '2026-09-17',
    title: 'Prezentace Q3',
    palette: "primary",
  },
  {
    id: '16',
    date: '2026-09-17',
    title: 'Oběd s týmem',
    palette: 6,
  },
  {
    id: '17',
    date: '2026-09-18',
    title: 'UX research',
    palette: 3,
  },
  {
    id: '18',
    date: '2026-09-19',
    title: 'Sprint review',
    palette: 2,
  },
  {
    id: '19',
    date: '2026-09-19',
    title: 'Retro',
    palette: 5,
  },

  {
    id: '20',
    date: '2026-09-21',
    title: 'Planning Q4',
    palette: "primary",
  },
  {
    id: '21',
    date: '2026-09-21',
    title: 'Design sync',
    palette: 5,
  },
  {
    id: '22',
    date: '2026-09-22',
    title: 'Brainstorm',
    palette: 4,
  },
  {
    id: '23',
    date: '2026-09-23',
    title: 'Analýza dat',
    palette: 3,
  },
  {
    id: '24',
    date: '2026-09-24',
    title: 'Client call',
    palette: 6,
  },
  {
    id: '25',
    date: '2026-09-25',
    title: 'Testování',
    palette: 3,
  },

  {
    id: '26',
    date: '2026-09-28',
    title: 'Standup',
    palette: 1,
  },
  {
    id: '27',
    date: '2026-09-29',
    title: 'Demo den',
    palette: 2,
  },
  {
    id: '28',
    date: '2026-09-29',
    title: 'Oběd',
    palette: "primary",
  },
{
  id: '29',
  date: '2026-09-30',
  title: 'Deadline MVP',
  palette: 'primary',
},
{
  id: '30',
  date: '2026-09-30',
  title: 'Closure',
  palette: 1,
},
{
  id: '31',
  date: '2026-09-30',
  title: 'Design sync',
  palette: 2,
},
{
  id: '32',
  date: '2026-09-30',
  title: 'Code review',
  palette: 3,
},
{
  id: '33',
  date: '2026-09-30',
  title: 'Client feedback',
  palette: 4,
},
{
  id: '34',
  date: '2026-09-30',
  title: 'Team retrospective',
  palette: 5,
},
{
  id: '35',
  date: '2026-09-30',
  title: 'Primary event',
  palette: 6,
},
]