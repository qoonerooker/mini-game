"use client";

import Link from "next/link";
import { useMonster } from "../providers/monster";
import Monster from "@/components/monster";
import { redirect } from "next/dist/server/api-utils";

export default function Page() {
  const { myMonsterId } = useMonster();

  if (!myMonsterId) {
    redirect("/");
  }

  return (
    <div>
      <Monster id={myMonsterId} mode="battle" onAttack={() => {}} />
      <Link href="/">戻る</Link>
      <main>バトル</main>
    </div>
  );
}
