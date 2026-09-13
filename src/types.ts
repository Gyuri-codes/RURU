export interface ChapterData {
  id: string;
  number: string;
  kanjiNumber: string;
  title: string;
  kanjiTitle: string;
  subtitle: string;
  quote: string;
  lore: string;
  timeCode: string;
  elevation: string;
  soundNote: string;
  scrollPosition: number; // 0 to 1
  frame: {
    frameNumber: string;
    title: string;
    time: string;
    category: string;
    description: string;
    palette: string[];
    specs: string;
  };
}

export interface CameraWaypoint {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  fogDensity: number;
  lanternIntensity: number;
}
