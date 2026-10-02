export type People = {
  id: number;
  facebook: string;
  facebook_handle: string;
  instagram: string;
};

export type AddPersonToDBData = {
  value: string;
  addingInstagram: boolean;
};
