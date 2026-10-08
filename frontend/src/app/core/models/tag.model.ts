export class Tag {
  private readonly id: number;
  private name: string;
  private colorId: number;

  constructor(id: number, name: string, color: number = 0) {
    this.id = id;
    this.name = name;
    this.colorId = color;
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

  get tagColor(): number {
    return this.colorId;
  }

  set tagColor(color: number) {
    this.colorId = color;
  }
}
