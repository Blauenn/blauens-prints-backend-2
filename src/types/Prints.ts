export type PrintLab = {
  id: number;
  name: string;
};

export type PrintJob = {
  id?: number;
  imageId?: number;
  personId: number;
  printLabId?: number;
  size: string;
  paperType: string;
  sentToLabAt: string | null;
  recievedFromLabAt: string | null;
  deliveredAt: string | null;
};
