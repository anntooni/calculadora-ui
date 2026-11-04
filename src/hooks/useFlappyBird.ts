import { useEffect, useState } from "react";

const BIRD_X = 72;
const BIRD_RADIUS = 12;
const PIPE_WIDTH = 52;
const GAP_HEIGHT = 156;
const MIN_PIPE_SPACING = 180;
const MAX_PIPE_SPACING = 260;
const PIPE_SPAWN_TRIGGER = 160;
const BASE_PIPE_SPEED = 3.2;
const PIPE_SPEED_PER_TICK = 0.0009;
const MAX_PIPE_SPEED = 6.5;

type Pipe = {
  id: number;
  x: number;
  gapCenter: number;
  scored: boolean;
};

type GameState = {
  status: "ready" | "playing" | "over";
  birdY: number;
  velocity: number;
  pipes: Pipe[];
  score: number;
  elapsedTicks: number;
};

const initialState: GameState = {
  status: "ready",
  birdY: 0,
  velocity: 0,
  pipes: [],
  score: 0,
  elapsedTicks: 0,
};

function randomGapCenter(height: number) {
  const availableHeight = Math.max(90, height - GAP_HEIGHT - 40);
  return 20 + GAP_HEIGHT / 2 + Math.random() * availableHeight;
}

function createGameState(width: number, height: number): GameState {
  return {
    ...initialState,
    birdY: height * 0.46,
    pipes: [
      {
        id: 0,
        x: width + 24,
        gapCenter: height * 0.5,
        scored: false,
      },
    ],
  };
}

export function useFlappyBird(width: number, height: number) {
  const [game, setGame] = useState(initialState);

  useEffect(() => {
    if (width === 0 || height === 0) return;
    setGame(createGameState(width, height));
  }, [height, width]);

  useEffect(() => {
    if (game.status !== "playing" || width === 0 || height === 0) return;

    const interval = setInterval(() => {
      setGame((current) => {
        const velocity = current.velocity + 0.42;
        const birdY = current.birdY + velocity;
        const elapsedTicks = current.elapsedTicks + 1;
        const pipeSpeed = Math.min(
          BASE_PIPE_SPEED + elapsedTicks * PIPE_SPEED_PER_TICK,
          MAX_PIPE_SPEED,
        );
        let score = current.score;
        const pipes = current.pipes
          .map((pipe) => {
            const x = pipe.x - pipeSpeed;
            const scored = pipe.scored || x + PIPE_WIDTH < BIRD_X;
            if (!pipe.scored && scored) score += 1;
            return { ...pipe, x, scored };
          })
          .filter((pipe) => pipe.x > -PIPE_WIDTH);

        const lastPipe = pipes[pipes.length - 1];
        if (!lastPipe || lastPipe.x <= width - PIPE_SPAWN_TRIGGER) {
          const spacing =
            MIN_PIPE_SPACING +
            Math.random() * (MAX_PIPE_SPACING - MIN_PIPE_SPACING);
          pipes.push({
            id: lastPipe ? lastPipe.id + 1 : 0,
            x: lastPipe ? lastPipe.x + spacing : width + 24,
            gapCenter: randomGapCenter(height),
            scored: false,
          });
        }

        const hitEdge =
          birdY - BIRD_RADIUS < 0 || birdY + BIRD_RADIUS > height;
        const hitPipe = pipes.some((pipe) => {
          const crossedPipe =
            BIRD_X + BIRD_RADIUS > pipe.x &&
            BIRD_X - BIRD_RADIUS < pipe.x + PIPE_WIDTH;
          const outsideGap =
            birdY - BIRD_RADIUS < pipe.gapCenter - GAP_HEIGHT / 2 ||
            birdY + BIRD_RADIUS > pipe.gapCenter + GAP_HEIGHT / 2;
          return crossedPipe && outsideGap;
        });

        return {
          ...current,
          status: hitEdge || hitPipe ? "over" : "playing",
          birdY,
          velocity,
          pipes,
          score,
          elapsedTicks,
        };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [game.status, height, width]);

  const flap = () => {
    setGame((current) => {
      if (current.status === "over") {
        return {
          ...createGameState(width, height),
          status: "playing",
          velocity: -7,
        };
      }
      return {
        ...current,
        status: "playing",
        velocity: -7,
      };
    });
  };

  const restart = () => {
    setGame(createGameState(width, height));
  };

  return {
    game,
    flap,
    restart,
    birdX: BIRD_X,
    birdRadius: BIRD_RADIUS,
    pipeWidth: PIPE_WIDTH,
    gapHeight: GAP_HEIGHT,
  };
}