<template>
    <div class="progress-circle" :style="{width: `${radius * 2}px`, height: `${radius * 2}px` }"></div>
</template>

<script>
import ProgressBar from "progressbar.js";

export default {
  props: ["radius", "strokeWidth", "value", "fromColor", "toColor"],
  mounted: function() {
    this.circle = new ProgressBar.Circle(this.$el, {
      strokeWidth: this.strokeWidth,
      duration: 1400,
      from: { color: this.fromColor },
      to: { color: this.toColor },
      step: (state, bar) => {
        bar.path.setAttribute("stroke", state.color);
      }
    });

    this.circle.set(this.value / 100);
  },
  methods: {
    animate(value, duration) {
      this.circle.animate(value / 100, {
        duration
      });
    },
    set(value) {
      this.circle.set(value);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
