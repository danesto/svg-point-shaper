"use client";
import { MouseEvent, useState } from "react";
import TestImage from "../assets/test-image.jpg";
import styles from "./shaper.module.css";

type Point = {
  x: number;
  y: number;
};

type Shape = {
  points: Point[];
};

const Shaper = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [polygons, setPolygons] = useState<Shape[]>([]);

  const handleOnImageClick = (e: MouseEvent<HTMLImageElement>) => {
    const coordinateSystem = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - coordinateSystem.left;
    const y = e.clientY - coordinateSystem.top;

    const clickedPoint = { x, y };

    setPoints([...points, clickedPoint]);
  };

  const handleDrawPolygon = () => {
    setPolygons([...polygons, { points: points }]);
    setPoints([]);
  };

  return (
    <>
      <button onClick={handleDrawPolygon}>Click to save</button>
      <div
        className={styles["coordinate-system"]}
        onMouseDown={handleOnImageClick}
      >
        <svg viewBox="0 0 900 630">
          {!!polygons &&
            polygons.map((polygon) => (
              <polygon
                points={polygon?.points
                  ?.map((point) => `${point.x} ${point.y}`)
                  .toString()}
                fill="red"
              />
            ))}
        </svg>
        <svg viewBox="0 0 900 630">
          {!!points &&
            points.map((point) => (
              <circle
                key={point.x + point.y}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="red"
              />
            ))}
        </svg>
        <img src={TestImage} alt="test-image" />
      </div>
    </>
  );
};

export { Shaper };
