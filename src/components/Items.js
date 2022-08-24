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
            <button
              class="toggleButton"
              data-index=${item.seq}
              style="color: ${item.active ? "red" : "gray"}"
            >
              ${item.active ? "활성" : "비활성"}
            </button>
            <button class="deleteButton" data-index=${item.seq}>삭제</button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  setEvent() {
    this.addEvent(".toggleButton", "click", ({ target }) => {
      this.$props.toggleItem(Number(target.dataset.index));
    });

    this.addEvent(".deleteButton", "click", ({ target }) => {
      // dataset 객체는 문자열 집합이므로 Number로 형변환
      this.$props.deleteItem(Number(target.dataset.index));
    });
  }
}
