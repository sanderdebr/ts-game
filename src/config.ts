export const GAME_CONFIG: any = {
  SCREEN_MARGIN: 200,
  BACKGROUND_COLOR: "#FFF",
  FONT: "30px sans-serif",
  BUTTON_WIDTH: 250,
  BUTTON_HEIGHT: 65,
  LEVEL_WIDTH: 5000,
  PLAYER_SIZE: 80,
  MONSTER_SIZE: 80,
  COIN_SIZE: 20,
  PLAYER_SPEED: 75,
  PLAYER_JUMP_STRENGTH: 25,
  PLATFORM_HEIGHT: 80,
  GRAVITY: 1,
  FRICTION: 0.9,
};

export const LEVEL_BLUEPRINTS: any = [
  {
    level: 1,
    outline: {
      platforms: [
        { x: 300, y: 400, width: 400 },
        { x: 800, y: 300, width: 300 },
        { x: 1200, y: 400, width: 500 },
      ],
      monsters: [
        { x: 250, y: 300 },
        { x: 900, y: 200 },
        { x: 1400, y: 300 },
      ],
      coins: [
        { x: 400, y: 300 },
        { x: 900, y: 200 },
        { x: 1400, y: 300 },
      ],
    },
  },
];
