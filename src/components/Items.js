import Component from "../core/Component.js";

export default class Items extends Component {
  setup() {
    console.log("Items setup");
  }

  template() {
    console.log("Items template");
    return `
      <ul>
        ${this.$props.items
          .map(
            (item, index) => `
          <li>
            ${item}
            <button class="deleteButton" data-index="${index}">삭제</button>
          </li>
        `
          )
          .join("")}
      </ul>
      <button class="appendButton">추가</button>
    `;
  }

  setEvent() {
    this.addEvent(".appendButton", "click", this.$props.addItem);
    this.addEvent(".deleteButton", "click", this.$props.deleteItem);
  }
}
