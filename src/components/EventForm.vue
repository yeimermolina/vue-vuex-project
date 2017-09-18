<template lang="html">
    <div id="event-form" :class="{active: active}" :style="{top: top, left: left}">
      <h4>Add an event</h4>
      <p>{{date.format('dddd, MMM Do')}}</p>
      <div class="text">
        <input v-focus @keyup.enter="create" type="text" name="" value="" v-model="description" placeholder="Enter name of event">
      </div>
      <div class="buttons">
        <button type="button" name="button" @click="create">Create</button>
      </div>
      <button id='close-button' type="button" name="button" @click="close">&#10005</button>
    </div>
</template>

<script>
export default {
  data(){
    return {
      description: ''
    }
  },
  methods: {
    close(){
        this.$store.commit('eventFormActive', false);
    },
    create(){
      if(this.description.length > 0){
        
        this.$store.dispatch('addEvent', this.description).then(_ => {
          //Como se esta retornando una promesa en el action addEvent, se puede hacer el then
          this.description = '';
          this.$store.commit('eventFormActive', false);
        });
        
      }
      
    }
  },
  computed: {
    active(){
      return this.$store.state.eventFormActive;
    },
    top(){
      return `${this.$store.state.eventFormPosY}px`;
    },
    left(){
      return `${this.$store.state.eventFormPosX}px`;
    },
    date(){
      return this.$store.state.eventFormDate;
    }
  },
  directives:{
    focus: {
      update(el){
        console.log('update')
        el.focus();
      }
    }
  }
}
</script>

<style lang="css">
</style>
