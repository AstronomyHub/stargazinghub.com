export type AstronomyEventName =
  | 'totalSolarEclipse'
  | 'perseidsPeak'
  | 'partialLunarEclipse'
  | 'geminidsPeak';

export interface AstronomyEvent {
  id: string;
  name: AstronomyEventName;
  startsAt: string;
  sourceLabel: 'NASA' | 'IMO';
  sourceUrl: string;
}

export const astronomyEventsReviewedAt = '2026-08-10';

export const astronomyEvents: AstronomyEvent[] = [
  {
    id: 'total-solar-eclipse-2026-08-12',
    name: 'totalSolarEclipse',
    startsAt: '2026-08-12T17:47:00Z',
    sourceLabel: 'NASA',
    sourceUrl: 'https://eclipse.gsfc.nasa.gov/SEsearch/SEdata.php?Ecl=20260812',
  },
  {
    id: 'perseids-2026',
    name: 'perseidsPeak',
    startsAt: '2026-08-13T01:56:00Z',
    sourceLabel: 'NASA',
    sourceUrl: 'https://eclipse.gsfc.nasa.gov/SKYCAL/SKYCAL.html?cal=2026',
  },
  {
    id: 'partial-lunar-eclipse-2026-08-28',
    name: 'partialLunarEclipse',
    startsAt: '2026-08-28T04:14:00Z',
    sourceLabel: 'NASA',
    sourceUrl: 'https://eclipse.gsfc.nasa.gov/LEdecade/LEdecade2021.html',
  },
  {
    id: 'geminids-2026',
    name: 'geminidsPeak',
    startsAt: '2026-12-14T14:00:00Z',
    sourceLabel: 'IMO',
    sourceUrl: 'https://www.imo.net/files/meteor-shower/cal2026.pdf',
  },
];
