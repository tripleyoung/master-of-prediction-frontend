"use client";

import Search from "@ui/Search";
import Panel from "@ui/Panel";
import PanelItemTrends from "@ui/PanelItemTrends";
import PanelItem from "@ui/PanelItem";
import Footer from "@ui/Footer";
import BettingProducts from "@ui/BettingProducts";

function BettingPage() {
  return (
    <>
      <main className="col-span-5 w-full border-x border-slate-200">
        <BettingProducts />
      </main>
      <aside className="col-span-3 hidden xl:flex flex-col w-[350px]">
        <div className="sticky top-0">
          <Search />
          <Footer />
        </div>
      </aside>
    </>
  );
}

export default BettingPage;
