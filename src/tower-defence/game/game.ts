import { createMob, moveMobs } from "./mobs.js"

createMob(80, 40, 50, 0, 100, 0, 1);
createMob(80, 40, 150, 500, 200, -1, 0);
createMob(80, 40, 70, 300, 0, 0, 1);
createMob(80, 40, 120, 300, 400, 0, -1); 
moveMobs();