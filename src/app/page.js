"use client";

import { useContext } from "react";
import { GlobalData } from "@/contexts/global-data";
import Link from 'next/link'
import Slider from "@/components/slider";
import Carousel from "@/components/carousel";
import BlockText from "@/components/block-text";
import "@/app/page.css";

export default function Home() {
  const { sponsors, banners } = useContext(GlobalData);
  return (
    <div className="container home-page">
      <Slider slides={banners} />
      <BlockText title="Do you want to burn your rug NFT`s">
        and get a chance to start again?
      </BlockText>
      <div className="content-center button-container">
        <Link href="/burn" className="btn btn-yellow">Burn here</Link>
      </div>
      <Carousel items={sponsors} />
    </div>
  );
}
