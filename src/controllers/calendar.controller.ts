import { BaseController } from "./base.controller";

export class CalendarController extends BaseController {
  constructor() {
    super("/calendar");

    this.initialize([], []);
  }
}
