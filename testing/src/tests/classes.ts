export class Player {
  public health: number = 4000;

  public receiveDamage(damage: number): void {
    if (damage >= this.health) this.health = 0;
    else this.health -= damage;
  }
}
