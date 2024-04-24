"use client";

import Monster from "@/components/monster";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMonster } from "./providers/monster";
import { monsters } from "@/lib/monster";

export default function Home() {
  const { myMonsterId, setMyMonsterId } = useMonster();

  return (
    <main className="py-10 container">
      {myMonsterId && (
        <div>
          <h2>あなたのモンスターは</h2>

          {myMonsterId && (
            <Monster
              onSelected={(id: number) => {
                setMyMonsterId(id);
              }}
              mode="select"
              id={myMonsterId}
            ></Monster>
          )}

          <Button asChild>
            <Link href="/battle">戦闘開始</Link>
          </Button>
        </div>
      )}

      <h2 className="font-bolx text-2xl">モンスターを選んでね</h2>
      <div className="grid gap-4 grid-cols-3">
        {monsters.map((monster, i) => {
          return (
            // 作ったオブジェクトを読み込む
            <Monster
              mode="select"
              onSelected={(id) => {
                setMyMonsterId(id);
              }}
              key={monster.id}
              id={monster.id}
            />
            // <Monster mode="battle" onAttack={() => {}} key={monster.id} monster={monster}/>
          );
        })}
      </div>
    </main>
  );
}
