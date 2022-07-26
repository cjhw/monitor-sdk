import tracker from '../utils/tracker'
import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'

export function longTask() {
  new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        let lastEvent = getLastEvent()
        requestIdleCallback(() => {
          tracker.send({
            kind: 'experience',
            type: 'longTask',
            eventType: lastEvent.type,
            startTime: entry.startTime, // 开始时间
            duration: entry.duration, // 持续时间
            selector: lastEvent
              ? getSelector(lastEvent.path || lastEvent.target)
              : '',
          })
        })
      }
    })
  }).observe({ entryTypes: ['longtask'] })
}
