import { monsters } from "@/lib/monster";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type MonsterProps =
  | {
      id: number;
      mode: "select";
      onSelected: (id: number) => void;
      onAttack?: undefined;
    }
  | {
      id: number;
      mode: "battle";
      onSelected?: undefined;
      onAttack: (id: number) => void;
    };

// モンスターのオブジェクト
export default function Monster({
  id,
  mode,
  onSelected,
  onAttack,
}: MonsterProps) {
  const [hp, setHp] = useState(100);

  const monster = useMemo(() => {
    return monsters.find((monster) => monster.id === id);
  }, [id]);

  if (!monster) {
    return null;
  }

  return (
    <div key={monster.id} className="p-4 border space-y-2 shadow-sm">
      <Image
        src={`/images/monster-${monster.id}.svg`}
        unoptimized
        width={80}
        height={80}
        alt=""
      />
      <h2>{monster.name}</h2>

      {mode == "battle" && (
        <div>
          <p>HP: {hp}</p>
          <div className="h-3 rounded-full overflow-hidden border">
            <div
              className={cn(
                "size-full transtion duration-500 origin-left",
                hp > 30 ? "bg-green-500" : "bg-red-500"
              )}
              style={{
                transform: `scaleX(${hp / 100})`,
              }}
            ></div>
          </div>
        </div>
      )}

      {mode == "battle" && (
        <Button
          onClick={() => {
            // setHp(hp - 10);
            setHp((oldHp) => Math.max(oldHp - 10, 0));
            onAttack(monster.id);
          }}
          disabled={hp <= 0}
        >
          セルフアタック
        </Button>
      )}

      {mode == "select" && (
        <Button onClick={() => onSelected(monster.id)} disabled={hp <= 0}>
          選ぶ
        </Button>
      )}
    </div>
  );
}
