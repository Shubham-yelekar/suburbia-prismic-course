/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { constants } from "buffer";
import gsap from "gsap";

type SkateboardProps = {
  wheelTextureUrls: string[];
  wheelTextureUrl: string;
  deckTextureUrls: string[];
  deckTextureUrl: string;
  truckColor: string;
  boltColor: string;
  constantWheelSpin?: boolean;
};

type GLTFResult = GLTF & {
  nodes: {
    GripTape: THREE.Mesh;
    Wheel1: THREE.Mesh;
    Wheel2: THREE.Mesh;
    Deck: THREE.Mesh;
    Wheel4: THREE.Mesh;
    Bolts: THREE.Mesh;
    Wheel3: THREE.Mesh;
    Baseplates: THREE.Mesh;
    Truck1: THREE.Mesh;
    Truck2: THREE.Mesh;
  };
  materials: {};
};

export function Skateboard({
  wheelTextureUrl,
  wheelTextureUrls,
  deckTextureUrl,
  deckTextureUrls,
  truckColor,
  boltColor,
  constantWheelSpin = true,
}: SkateboardProps) {
  const { nodes } = useGLTF("/skateboard.gltf") as GLTFResult;

  // Wheel spin ========================================
  const wheelRefs = useRef<THREE.Object3D[]>([]);

  // Wheel Texture ========================================
  const wheelTextures = useTexture(wheelTextureUrls);
  wheelTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const wheelTextureIndex = wheelTextureUrls.findIndex(
    (url) => url === wheelTextureUrl
  );
  const wheelTexture = wheelTextures[wheelTextureIndex];
  // ========================================================

  // Deck Texture ========================================
  const deckTextures = useTexture(deckTextureUrls);
  deckTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  const deckTextureIndex = deckTextureUrls.findIndex(
    (url) => url === deckTextureUrl
  );
  const deckTexture = deckTextures[deckTextureIndex];
  // ========================================

  const gripTapDiffuse = useTexture("/skateboard/griptape-diffuse.webp");
  const gripTapRoughnes = useTexture("/skateboard/griptape-roughness.webp");

  const gripTapeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: gripTapDiffuse,
      bumpMap: gripTapRoughnes,
      roughnessMap: gripTapRoughnes,
      bumpScale: 1.5,
      roughness: 1,
      metalness: 0.2,
      color: "#555555",
    });

    if (gripTapDiffuse) {
      gripTapDiffuse.wrapS = THREE.RepeatWrapping;
      gripTapDiffuse.wrapT = THREE.RepeatWrapping;
      gripTapDiffuse.repeat.set(9, 9);
      gripTapDiffuse.needsUpdate = true;
      gripTapRoughnes.wrapS = THREE.RepeatWrapping;
      gripTapRoughnes.wrapT = THREE.RepeatWrapping;
      gripTapRoughnes.repeat.set(9, 9);
      gripTapRoughnes.needsUpdate = true;

      gripTapRoughnes.anisotropy = 8;
    }

    return material;
  }, [gripTapDiffuse, gripTapRoughnes]);

  const boltMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: boltColor,
        metalness: 0.5,
        roughness: 0.3,
      }),
    [boltColor]
  );

  const metalNormal = useTexture("/skateboard/metal-normal.avif");
  metalNormal.wrapS = THREE.RepeatWrapping;
  metalNormal.wrapT = THREE.RepeatWrapping;
  metalNormal.anisotropy = 8;
  metalNormal.repeat.set(8, 8);

  const truckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: truckColor,
        metalness: 0.5,
        roughness: 0.25,
        normalMap: metalNormal,
        normalScale: new THREE.Vector2(0.3, 0.3),
      }),
    [truckColor]
  );

  const deckMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: deckTexture,
        roughness: 0.21,
      }),
    [deckTexture]
  );

  wheelTexture.flipY = false;

  const wheelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: wheelTexture,
        roughness: 0.3,
      }),
    [wheelTexture]
  );

  // Add Wheel Refs
  const addToWheelRefs = (ref: THREE.Object3D | null) => {
    if (ref && !wheelRefs.current.includes(ref)) {
      wheelRefs.current.push(ref);
    }
  };

  useFrame(() => {
    if (!wheelRefs.current || !constantWheelSpin) return;
    for (const wheel of wheelRefs.current) {
      wheel.rotation.x += 0.2;
    }
  });

  useEffect(() => {
    if (!wheelRefs.current || constantWheelSpin) return;
    for (const wheel of wheelRefs.current) {
      gsap.to(wheel.rotation, {
        x: "-=30",
        duration: 2.5,
        ease: "circ.out",
      });
    }
  }, [constantWheelSpin, wheelTextureUrl]);

  return (
    <group dispose={null}>
      <group name="Scene">
        <mesh
          name="GripTape"
          castShadow
          receiveShadow
          geometry={nodes.GripTape.geometry}
          material={gripTapeMaterial}
          position={[0, 0.286, -0.002]}
        />
        <mesh
          name="Wheel1"
          castShadow
          receiveShadow
          geometry={nodes.Wheel1.geometry}
          material={wheelMaterial}
          position={[0.238, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Wheel2"
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={wheelMaterial}
          position={[-0.237, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Deck"
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={deckMaterial}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name="Wheel4"
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={wheelMaterial}
          position={[-0.238, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Bolts"
          castShadow
          receiveShadow
          geometry={nodes.Bolts.geometry}
          material={boltMaterial}
          position={[0, 0.198, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Wheel3"
          castShadow
          receiveShadow
          geometry={nodes.Wheel3.geometry}
          material={wheelMaterial}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Baseplates"
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={truckMaterial}
          position={[0, 0.211, 0]}
        />
        <mesh
          name="Truck1"
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={truckMaterial}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name="Truck2"
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={truckMaterial}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/skateboard.gltf");
