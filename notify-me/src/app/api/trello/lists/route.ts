import { FilterUndefined } from "@/lib/utils";
import { TrelloBoard, TrelloList } from "@/types/Trello";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const token = params.get("token");

  const trelloErrorURL = NextResponse.json({}, { status: 500 });

  if (!token) return trelloErrorURL;

  const apiKey = process.env.NEXT_PUBLIC_TRELLO_CLIENT_API_KEY ?? "";

  const boardsResponse = await fetch(
    `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`
  );
  if (boardsResponse.status !== 200) {
    return trelloErrorURL;
  }

  const boards: Omit<TrelloBoard, "lists">[] = await boardsResponse.json();

  const listPromises = boards.map((board) => {
    return GetBoardLists(board, token, apiKey);
  });

  const lists = await Promise.all(listPromises);

  const filtered = lists.filter(FilterUndefined);

  return NextResponse.json(filtered);
};

async function GetBoardLists(
  board: Omit<TrelloBoard, "lists">,
  token: string,
  key: string
): Promise<TrelloBoard | undefined> {
  const listResponse = await fetch(
    `https://api.trello.com/1/boards/${board.id}/lists?key=${key}&token=${token}`
  );
  if (listResponse.status !== 200) {
    return undefined;
  }

  const lists: TrelloList[] = await listResponse.json();

  return {
    id: board.id,
    name: board.name,
    lists: lists,
  };
}
