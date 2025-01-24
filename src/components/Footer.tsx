import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import React from "react";
import { asImageSrc } from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Logo } from "@/components/Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";

type Props = {};

export async function Footer({}: Props) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const boardTextureURLs = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));
  console.log(boardTextureURLs);
  return (
    <footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
      <div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
        {/* Image */}
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover w-[1200]"
        />
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0 overflow-hidden"
        />

        <Logo className="pointer-events-none relative h-20 mix-blend-exclusion md:h-28" />
      </div>
      <Bounded>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text}>
              <PrismicNextLink field={item.link} className="~text-lg/xl" />
            </li>
          ))}
        </ul>
      </Bounded>
    </footer>
  );
}
