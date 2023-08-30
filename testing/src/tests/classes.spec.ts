import { Player } from './classes';

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player();
  });

  it('should have 3000 points of health if receive 1000 points of damage', () => {
    player.receiveDamage(1000);
    expect(player.health).toBe(3000);
  });

  it('should have 0 points of health if receive 5000 points of damage', () => {
    player.receiveDamage(5000);
    expect(player.health).toBe(0);
  });
});
