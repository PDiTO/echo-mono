export const composeId = (venue: string, instrumentId: string): string => {
  return `${venue.toUpperCase()}:${instrumentId}`;
};

export const splitId = (id: string): { venue: string; instrumentId: string } => {
  const [venue, instrumentId] = id.split(':');
  return { venue, instrumentId };
};
