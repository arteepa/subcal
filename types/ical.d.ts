declare module 'ical.js' {
  export function parse(input: string): any[]

  export class Component {
    constructor(jCal: any[] | string, parent?: Component)
    getFirstProperty(name: string): Property | null
    getAllSubcomponents(name?: string): Component[]
    getFirstSubcomponent(name?: string): Component | null
  }

  export class Property {
    constructor(jCal: any[] | string, parent?: Component)
    getFirstValue(): any
    getParameter(name: string): string | null
  }

  export class Event {
    constructor(component?: Component | null, options?: object)
    summary: string
    description: string
    location: string
    startDate: Time
    endDate: Time
  }

  export class Time {
    constructor(data?: object)
    toJSDate(): Date
    static fromJSDate(date: Date, useUTC?: boolean): Time
  }
}
