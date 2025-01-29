"use client";
import { Skateboard } from "@/components/SkateBoard";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { MeshBasicMaterial } from "three";

type Props = {};

export default function InteracticeSkateboard({}: Props) {
  return (
    <div className="absolute inset-0 z-10 items-center justify-center">
      <Canvas
        className="min-[60rem] w-full"
        camera={{ position: [1.5, 1, 1.4], fov: 45 }}
      >
        <Suspense>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group>
      <OrbitControls />
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <Skateboard />
      <ContactShadows opacity={0.6} position={[0, -0.08, 0]} />
    </group>
  );
}
