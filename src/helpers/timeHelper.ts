export const toHoursMinutesSeconds = function toHoursMinutesSeconds(seconds: number): HoursMinutesSeconds {
    const totalMinutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
  
    return { h: hours, m: minutes, s: secs };
}
