declare module 'ical.js' {
  export function parse(input: string): any
  
  export class Component {
    constructor(jcalData: any)
    getFirstProperty(name: string): Property | null
    getAllSubcomponents(name: string): Component[]
  }
  
  export class Event {
    constructor(component: Component)
    summary: string
    description: string
    location: string
    startDate: Time
    endDate: Time
  }
  
  export class Property {
    getFirstValue(): string
    getParameter(name: string): string | null
  }
  
  export class Time {
    toJSDate(): Date
  }
  
  const ICAL: {
    parse: typeof parse
    Component: typeof Component
    Event: typeof Event
    Property: typeof Property
    Time: typeof Time
  }
  
  export default ICAL
}

