export class Tag {
  private readonly id: number;
  private name: string;
  private color: string;

  constructor(id: number, name: string, color: string = "") {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  get idTag(): number {
    return this.id;
  }

  get tagName(): string {
    return this.name;
  }

  set tagName(name: string) {
    this.name = name;
  }

  get tagColor(): string {
    return this.color;
  }

  set tagColor(color: string) {
    this.color = color;
  }
}
