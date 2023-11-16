import { Calendar } from "@prisma/client";
import { BaseRepo } from "./base.repo";
import defineAbilityForUser from "../rules/user.rule";

export class CalendarRepo extends BaseRepo {
  async getCalendarById(calendarId: string): Promise<Calendar | null> {
    const abilities = defineAbilityForUser(this.context?.userId);

    const calendar = await this.prisma.calendar.findUnique({
      where: { id: calendarId },
    });

    if (!calendar || !abilities.can("read", calendar)) {
      return null;
    }

    return calendar;
  }
}
