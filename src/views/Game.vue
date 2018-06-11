<template>
    <section class="game">
        <bp-progress-circle class="bp-loader"
                            :radius="100"
                            :strokeWidth="5"
                            :value="0"
                            fromColor="#0f0"
                            toColor="#f00"
                            ref="progressCircle">
        </bp-progress-circle>
        <div class="chord">{{chord}}</div>
        <div class="difficulty">
            <bp-radio name="difficulty" val="easy" v-model="difficulty">Easy</bp-radio>
            <bp-radio name="difficulty" val="normal" v-model="difficulty">Normal</bp-radio>
            <bp-radio name="difficulty" val="hard" v-model="difficulty">Hard</bp-radio>
        </div>
        <bp-button accent elevated class="play-button" @click="play" v-if="!isGoing">Play</bp-button>
        <bp-button primary elevated class="play-button" @click="stop" v-if="isGoing">Stop</bp-button>
    </section>
</template>

<script>
import RandomizedArray from "../utils/randomized-array";
const chords = new RandomizedArray(["C", "D", "E", "F", "G", "A", "B"]);
const difficultyDuration = {
  easy: 10000,
  normal: 5000,
  hard: 2000
};

export default {
  data: () => ({
    chord: "?",
    isGoing: false,
    difficulty: "easy"
  }),
  computed: {
    duration() {
      return difficultyDuration[this.difficulty];
    }
  },
  methods: {
    play: function() {
      this.isGoing = true;

      this.chord = chords.next();

      const nextChord = function nextChord() {
        this.$refs.progressCircle.animate(100, this.duration);
        this.timeoutId = setTimeout(() => {
          this.chord = chords.next();

          this.$refs.progressCircle.set(0);
          nextChord.call(this);
        }, this.duration);
      };

      nextChord.call(this);
    },
    stop: function() {
      this.isGoing = false;
      this.chord = "?";
      this.$refs.progressCircle.animate(0, 100);

      clearTimeout(this.timeoutId);
    }
  }
};
</script>

<style lang="stylus" scoped>
    @import "../styles/_colors"

    .game
        min-height: 100%;

        display: grid
        grid-template-rows: 1fr 50px 50px
        grid-template-column: auto
        grid-template-areas:
            "playground"\
            "difficulty"\
            "button"


    .chord, .bp-loader
        grid-area playground
        place-self center center
        font-size 5em;
        color $primary-color

    .difficulty
        grid-area difficulty
        place-self center center

    .play-button
        grid-area button
        place-self center center
</style>
