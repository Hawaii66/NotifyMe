"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrelloBoard } from "@/types/Trello";
import { LoaderCircle, Unplug } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const searchParams = useSearchParams();

  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [error, setError] = useState<string>();
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedList, setSelectedList] = useState("");
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

  const connect = async () => {
    setLoading(true);

    await fetch(
      `/api/callback/trello?list=${selectedList}&levels=${searchParams.get(
        "levels"
      )}&service=${searchParams.get("service")}&token=${token}`,
      { method: "POST" }
    );

    alert("The connection has been made, closing this window");

    window.close();
  };

  const getLists = async (token: string) => {
    const boardResponse = await fetch(`/api/trello/lists?token=${token}`);
    if (boardResponse.status !== 200) {
      setError("Could not load trello boards or lists");
      return;
    }

    const boards: TrelloBoard[] = await boardResponse.json();

    setBoards(boards);
  };

  useEffect(() => {
    const hash = window.location.hash;

    const token = new URLSearchParams(hash.substring(1)).get("token");
    if (!token) {
      alert("Authentication failed");
      return;
    }

    setToken(token);
    getLists(token ?? "");
  }, []);

  if (error === undefined && boards.length === 0) {
    return <p>Loading trello boards</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-full min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Connect NotifyMe to a Trello list</CardTitle>
          <CardDescription>
            Select a board and list below and click connect when you are done
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <Label>Select Trello board</Label>
            <Select
              value={selectedBoard}
              onValueChange={(a) => {
                setSelectedBoard(a);
                setSelectedList("");
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {boards.map((i) => (
                  <SelectItem key={i.id} value={i.id}>
                    {i.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Select List</Label>
            {selectedBoard === "" ? (
              <Select>
                <SelectTrigger disabled>
                  <SelectValue />
                </SelectTrigger>
              </Select>
            ) : (
              <Select value={selectedList} onValueChange={setSelectedList}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {boards
                    .find((i) => i.id === selectedBoard)!
                    .lists.map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div>
            <Button
              disabled={selectedList === "" || loading}
              className="flex flex-row justify-center items-center gap-4"
              onClick={connect}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <Unplug /> Connect
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
