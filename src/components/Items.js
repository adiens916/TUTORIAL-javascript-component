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
            (item) => `
          <li>
            ${item.contents}
            <button class="deleteButton" data-index=${item.seq}>삭제</button>
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

    this.addEvent(".deleteButton", "click", ({ target }) => {
      // dataset 객체는 문자열 집합이므로 Number로 형변환
      this.$props.deleteItem(Number(target.dataset.index));
    });
  }
}
