export type TrelloBoard = {
  id: string;
  name: string;
  lists: TrelloList[];
};

export type TrelloList = {
  id: string;
  name: string;
};
