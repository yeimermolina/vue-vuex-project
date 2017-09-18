<template lang="html">
  <div>
    <div id="header">
      <div class="">
        <h1>Vue Calendar</h1>
      </div>
      <div class="">
        <current-month></current-month>
      </div>
    </div>
    <div id="day-bar">
        <div>Lun</div>
        <div>Mar</div>
        <div>Mie</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sab</div>
        <div>Dom</div>
    </div>
    <div id="calendar">
      <div class="calendar-week" v-for="week in weeks">
        <calendar-day v-for= "day in week" :day="day"></calendar-day>
      </div>
    </div>
    <event-form>
    
    </event-form>
  </div>
  
</template>

<script>

import CalendarDay from './CalendarDay.vue';
import CurrentMonth from './CurrentMonth.vue';
import EventForm from './EventForm.vue';

export default {
  computed: {
    month(){
      return this.$store.state.currentMonth;
    },
    year(){
      return this.$store.state.currentYear;
    },
    days(){
      //Generate all days in current month
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
      do {
        days.push(currentDay);
        //hay que crear otro objeto poque sino se hace una referencia y se estaria modificando el mismo objeto
        
        currentDay = this.$moment(currentDay).add(1, 'days')
      }while((currentDay.month() + 1) === this.month);
      
      
      //Add previoues days
      currentDay = this.$moment(days[0])
      const SUNDAY = 0;
      const MONDAY = 1
      
      if(currentDay.day()!== MONDAY){
        do{
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        }while(currentDay.day() !== MONDAY);
      }
      
      
      //ADD NEXT DAYS TO END OF ARRAY
      currentDay = this.$moment(days[days.length - 1])
      if(currentDay.day()!== SUNDAY){
      
        do{
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        }while(currentDay.day() !== SUNDAY);
      }
      return days;
    },
    weeks(){
      let weeks = [];
      let week = [];
      
      for(let day of this.days){
        week.push(day)
        if(week.length === 7){
          weeks.push(week);
          week = [];
        }
      }
      
      return weeks;
      
    }
  },
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  }
}
</script>

<style lang="css">
</style>
