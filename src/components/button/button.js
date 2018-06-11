export default {
  props: {
    elevated: Boolean,
    primary: Boolean,
    accent: Boolean
  },
  data: () => ({
    showRippleEffect: false,
    rippleOffset: {
      left: 0,
      top: 0
    }
  }),
  methods: {
    click: function(e) {
      const offset = this.$el.getBoundingClientRect();
      this.rippleOffset.left = e.pageX - offset.left;
      this.rippleOffset.top = e.pageY - offset.top;

      this.showRippleEffect = true;
      setTimeout(() => {
        this.showRippleEffect = false;
      }, 400);

      this.$emit("click");
    }
  }
};
