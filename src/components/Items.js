import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    console.log("Items setup");
  }

  template() {
    console.log("Items template");
    return `
      <ul>
        ${this.$props.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <button id="append">추가</button>
    `;
  }

  setEvent() {
    this.addEvent("#append", "click", this.$props.addItem);
  }
}
