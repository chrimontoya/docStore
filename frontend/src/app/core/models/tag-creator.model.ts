export class TagCreatorRequest {
  ownerUserId: number;
  name: string;
  color: number;

  constructor(ownerUserId: number, name: string, color: number) {
    this.ownerUserId = ownerUserId;
    this.name = name;
    this.color = color;
  }
}
