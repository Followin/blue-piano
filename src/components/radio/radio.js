import random from "../../utils/random";
import uuid from "../../mixins/uuid";

export default {
  props: ['name', 'checked', 'val', 'value'],
  mixins: [uuid],
  data: function() {
    return {
      id: random.guid()
    };
  },
  computed: {
    isChecked() {
      return this.value === this.val || this.checked;
    }
  }
};
